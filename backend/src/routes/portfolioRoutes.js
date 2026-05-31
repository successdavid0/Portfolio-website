import { Router } from 'express'
import { getAllSections, getSection, setSection } from '../db.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
const VALID  = ['projects', 'skills', 'heroStats', 'aboutStats']

// GET /api/portfolio — public
router.get('/', async (_, res) => {
  try {
    res.json(await getAllSections())
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// GET /api/portfolio/:section — public
router.get('/:section', async (req, res) => {
  const { section } = req.params
  if (!VALID.includes(section)) return res.status(400).json({ error: 'Unknown section' })
  try {
    const data = await getSection(section)
    if (!data) return res.status(404).json({ error: 'Not found' })
    res.json(data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// PUT /api/portfolio/:section — protected
router.put('/:section', requireAuth, async (req, res) => {
  const { section } = req.params
  if (!VALID.includes(section)) return res.status(400).json({ error: 'Unknown section' })
  if (!req.body) return res.status(400).json({ error: 'Invalid body' })
  try {
    await setSection(section, req.body)
    res.json({ message: `${section} updated` })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
