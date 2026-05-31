import { Router }  from 'express'
import multer      from 'multer'
import crypto      from 'crypto'
import { requireAuth } from '../middleware/auth.js'

const router  = Router()
const upload  = multer({
  storage: multer.memoryStorage(),
  limits:  { fileSize: 10 * 1024 * 1024 }, // 10 MB max
  fileFilter: (_, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true)
    else cb(new Error('Only image files are allowed'))
  },
})

const cloudinaryConfigured = () =>
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY    &&
  process.env.CLOUDINARY_API_SECRET

// POST /api/upload  (admin only, image file in field "image")
router.post('/', requireAuth, upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No image file provided' })

  if (!cloudinaryConfigured()) {
    return res.status(503).json({
      error: 'Image hosting not configured. Add CLOUDINARY_* env vars.',
    })
  }

  try {
    const timestamp = Math.floor(Date.now() / 1000)
    const folder    = 'portfolio'

    // Generate Cloudinary signature
    const sigStr    = `folder=${folder}&timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`
    const signature = crypto.createHash('sha1').update(sigStr).digest('hex')

    // Build multipart body to send to Cloudinary REST API
    const form = new FormData()
    form.append('file',      new Blob([req.file.buffer], { type: req.file.mimetype }), req.file.originalname)
    form.append('api_key',   process.env.CLOUDINARY_API_KEY)
    form.append('timestamp', String(timestamp))
    form.append('signature', signature)
    form.append('folder',    folder)

    const cloudUrl = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`
    const response = await fetch(cloudUrl, { method: 'POST', body: form })
    const result   = await response.json()

    if (!response.ok) {
      throw new Error(result.error?.message || 'Cloudinary upload failed')
    }

    res.json({
      url:       result.secure_url,
      publicId:  result.public_id,
      width:     result.width,
      height:    result.height,
    })
  } catch (err) {
    console.error('Upload error:', err)
    res.status(500).json({ error: err.message || 'Upload failed' })
  }
})

export default router
