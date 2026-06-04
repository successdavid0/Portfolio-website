import jwt from 'jsonwebtoken'
import { logger } from '../logger.js'

export const requireAuth = (req, res, next) => {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    logger.warn('Auth rejected: no token', { method: req.method, path: req.path, ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress })
    return res.status(401).json({ error: 'No token provided' })
  }

  const token = header.slice(7)
  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret')
    next()
  } catch (err) {
    logger.warn('Auth rejected: invalid/expired token', { method: req.method, path: req.path, reason: err.message })
    res.status(401).json({ error: 'Invalid or expired token' })
  }
}
