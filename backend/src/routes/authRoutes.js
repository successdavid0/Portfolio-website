import { Router } from 'express'
import bcrypt      from 'bcryptjs'
import jwt         from 'jsonwebtoken'
import { getAdminHash, setAdminPassword } from '../db.js'
import { requireAuth } from '../middleware/auth.js'
import { logger } from '../logger.js'

const router = Router()

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { password } = req.body
  if (!password) return res.status(400).json({ error: 'Password required' })

  try {
    const hash = await getAdminHash()
    if (!hash || !bcrypt.compareSync(password, hash)) {
      logger.warn('Failed login attempt', { ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress })
      return res.status(401).json({ error: 'Invalid password' })
    }

    const token = jwt.sign(
      { role: 'admin' },
      process.env.JWT_SECRET || 'dev_secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    )
    logger.info('Admin login successful', { ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress })
    res.json({ token })
  } catch (err) {
    logger.error('Login error', { error: err.message })
    res.status(500).json({ error: 'Server error' })
  }
})

// POST /api/auth/reset  — force-syncs DB hash to ADMIN_PASSWORD env var (no auth required)
// Remove this route once access is restored.
router.post('/reset', async (req, res) => {
  const secret = process.env.RESET_SECRET
  if (!secret) {
    logger.warn('Reset attempted but RESET_SECRET not set')
    return res.status(403).json({ error: 'RESET_SECRET env var not set' })
  }
  if (req.body.secret !== secret) {
    logger.warn('Reset attempted with wrong secret', { ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress })
    return res.status(403).json({ error: 'Forbidden' })
  }

  const password = process.env.ADMIN_PASSWORD
  if (!password) return res.status(400).json({ error: 'ADMIN_PASSWORD env var not set' })

  try {
    await setAdminPassword(password)
    logger.info('Admin password force-reset via /reset endpoint')
    res.json({ message: 'Admin password reset to ADMIN_PASSWORD value' })
  } catch (err) {
    logger.error('Reset error', { error: err.message })
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
    logger.info('Admin password changed')
    res.json({ message: 'Password updated' })
  } catch (err) {
    logger.error('Change-password error', { error: err.message })
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
