import { Router } from 'express'
import { getAllSections, getSection, setSection } from '../db.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

const VALID_SECTIONS = ['projects', 'skills', 'heroStats', 'aboutStats']

// GET /api/portfolio — public, returns all sections
router.get('/', (_, res) => {
  res.json(getAllSections())
})

// GET /api/portfolio/:section — public
router.get('/:section', (req, res) => {
  const { section } = req.params
  if (!VALID_SECTIONS.includes(section)) {
    return res.status(400).json({ error: 'Unknown section' })
  }
  const data = getSection(section)
  if (!data) return res.status(404).json({ error: 'Section not found' })
  res.json(data)
})

// PUT /api/portfolio/:section — protected
router.put('/:section', requireAuth, (req, res) => {
  const { section } = req.params
  if (!VALID_SECTIONS.includes(section)) {
    return res.status(400).json({ error: 'Unknown section' })
  }
  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({ error: 'Invalid body' })
  }
  setSection(section, req.body)
  res.json({ message: `${section} updated` })
})

export default router
