import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'
import bcrypt from 'bcryptjs'
import { defaultData } from './defaultData.js'
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const dbPath = process.env.DB_PATH
  ? path.resolve(process.env.DB_PATH)
  : path.join(__dirname, '../../data/portfolio.db')

// Ensure the data directory exists
fs.mkdirSync(path.dirname(dbPath), { recursive: true })

let _db = null

export const getDb = () => {
  if (!_db) {
    _db = new Database(dbPath)
    _db.pragma('journal_mode = WAL')
    _db.pragma('foreign_keys = ON')
  }
  return _db
}

export const initDb = () => {
  const db = getDb()

  db.exec(`
    CREATE TABLE IF NOT EXISTS portfolio_data (
      section     TEXT PRIMARY KEY,
      data        TEXT NOT NULL,
      updated_at  TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS admin (
      id            INTEGER PRIMARY KEY CHECK (id = 1),
      password_hash TEXT NOT NULL,
      updated_at    TEXT DEFAULT (datetime('now'))
    );
  `)

  // Seed portfolio sections with defaults if empty
  const insert = db.prepare(
    `INSERT OR IGNORE INTO portfolio_data (section, data) VALUES (?, ?)`
  )
  for (const [section, data] of Object.entries(defaultData)) {
    insert.run(section, JSON.stringify(data))
  }

  // Seed admin password if not set
  const hasAdmin = db.prepare('SELECT id FROM admin LIMIT 1').get()
  if (!hasAdmin) {
    const hash = bcrypt.hashSync(
      process.env.ADMIN_PASSWORD || 'success2025',
      12
    )
    db.prepare('INSERT INTO admin (id, password_hash) VALUES (1, ?)').run(hash)
  }

  console.log(`✓ Database ready at ${dbPath}`)
}

// ── helpers ──────────────────────────────────────────────────

export const getSection = (section) => {
  const db = getDb()
  const row = db.prepare('SELECT data FROM portfolio_data WHERE section = ?').get(section)
  return row ? JSON.parse(row.data) : null
}

export const getAllSections = () => {
  const db = getDb()
  const rows = db.prepare('SELECT section, data FROM portfolio_data').all()
  return Object.fromEntries(rows.map(r => [r.section, JSON.parse(r.data)]))
}

export const setSection = (section, data) => {
  const db = getDb()
  db.prepare(`
    INSERT INTO portfolio_data (section, data, updated_at)
    VALUES (?, ?, datetime('now'))
    ON CONFLICT (section) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at
  `).run(section, JSON.stringify(data))
}

export const getAdminHash = () => {
  const db = getDb()
  const row = db.prepare('SELECT password_hash FROM admin WHERE id = 1').get()
  return row?.password_hash ?? null
}

export const setAdminPassword = (plaintext) => {
  const db = getDb()
  const hash = bcrypt.hashSync(plaintext, 12)
  db.prepare(`UPDATE admin SET password_hash = ?, updated_at = datetime('now') WHERE id = 1`).run(hash)
}
