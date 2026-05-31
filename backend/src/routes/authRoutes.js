import { Router } from 'express'
import bcrypt      from 'bcryptjs'
import jwt         from 'jsonwebtoken'
import { getAdminHash, setAdminPassword } from '../db.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { password } = req.body
  if (!password) return res.status(400).json({ error: 'Password required' })

  try {
    const hash = await getAdminHash()
    if (!hash || !bcrypt.compareSync(password, hash)) {
      return res.status(401).json({ error: 'Invalid password' })
    }

    const token = jwt.sign(
      { role: 'admin' },
      process.env.JWT_SECRET || 'dev_secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    )
    res.json({ token })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// POST /api/auth/change-password  (protected)
router.post('/change-password', requireAuth, async (req, res) => {
  const { newPassword } = req.body
  if (!newPassword || newPassword.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters' })
  }
  try {
    await setAdminPassword(newPassword)
    res.json({ message: 'Password updated' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
