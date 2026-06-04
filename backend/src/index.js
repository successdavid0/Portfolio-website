import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { initDb } from './db.js'
import { logger } from './logger.js'
import authRoutes from './routes/authRoutes.js'
import portfolioRoutes from './routes/portfolioRoutes.js'
import contactRoutes from './routes/contactRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

const app  = express()
const PORT = process.env.PORT || 3001

// ── Middleware ────────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))
app.use(express.json({ limit: '1mb' }))

// Request logger
app.use((req, res, next) => {
  const start = Date.now()
  res.on('finish', () => {
    const ms = Date.now() - start
    const level = res.statusCode >= 500 ? 'error' : res.statusCode >= 400 ? 'warn' : 'info'
    logger[level](`${req.method} ${req.path}`, {
      status: res.statusCode,
      ms,
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
    })
  })
  next()
})

// ── Routes ────────────────────────────────────────────────────
app.get('/api/health', (_, res) => res.json({ status: 'ok', ts: new Date().toISOString() }))
app.use('/api/auth',      authRoutes)
app.use('/api/portfolio', portfolioRoutes)
app.use('/api/contact',   contactRoutes)
app.use('/api/upload',    uploadRoutes)

// 404
app.use((req, res) => {
  logger.warn('Route not found', { method: req.method, path: req.path })
  res.status(404).json({ error: 'Route not found' })
})

// Error handler
app.use((err, req, res, _next) => {
  logger.error('Unhandled error', { method: req.method, path: req.path, error: err.message, stack: err.stack })
  res.status(500).json({ error: 'Internal server error' })
})

// ── Start ─────────────────────────────────────────────────────
initDb()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Portfolio API started`, { port: PORT, env: process.env.NODE_ENV || 'development' })
    })
  })
  .catch(err => {
    logger.error('Failed to initialise database', { error: err.message, stack: err.stack })
    process.exit(1)
  })
