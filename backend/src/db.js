import pg from 'pg'
import Database from 'better-sqlite3'
import bcrypt from 'bcryptjs'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { defaultData } from './defaultData.js'

const { Pool } = pg
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const usePostgres = Boolean(process.env.DATABASE_URL?.trim())

let _pool = null
let _db = null

const sqlitePath = process.env.DB_PATH
  ? path.resolve(process.env.DB_PATH)
  : process.env.RENDER
    ? '/tmp/portfolio.db'
    : path.join(__dirname, '../../data/portfolio.db')

function shouldUseSsl(connectionString) {
  if (!connectionString) return false
  try {
    const { hostname } = new URL(connectionString)
    return hostname !== 'localhost' && hostname !== '127.0.0.1' && hostname !== '::1'
  } catch {
    return false
  }
}

export const getPool = () => {
  if (!usePostgres) return null
  if (!_pool) {
    const connectionString = process.env.DATABASE_URL.trim()
    _pool = new Pool({
      connectionString,
      ssl: shouldUseSsl(connectionString) ? { rejectUnauthorized: false } : false,
    })
  }
  return _pool
}

export const getDb = () => {
  if (usePostgres) return null
  if (!_db) {
    fs.mkdirSync(path.dirname(sqlitePath), { recursive: true })
    _db = new Database(sqlitePath)
    _db.pragma('journal_mode = WAL')
    _db.pragma('foreign_keys = ON')
  }
  return _db
}

async function initPostgres() {
  const pool = getPool()

  await pool.query(`
    CREATE TABLE IF NOT EXISTS portfolio_data (
      section    TEXT PRIMARY KEY,
      data       JSONB        NOT NULL,
      updated_at TIMESTAMPTZ  DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS admin (
      id            INTEGER PRIMARY KEY DEFAULT 1,
      password_hash TEXT    NOT NULL,
      updated_at    TIMESTAMPTZ DEFAULT now(),
      CONSTRAINT single_row CHECK (id = 1)
    );
  `)

  for (const [section, data] of Object.entries(defaultData)) {
    await pool.query(`
      INSERT INTO portfolio_data (section, data)
      VALUES ($1, $2)
      ON CONFLICT (section) DO NOTHING
    `, [section, JSON.stringify(data)])
  }

  const { rowCount } = await pool.query('SELECT 1 FROM admin LIMIT 1')
  if (rowCount === 0) {
    const hash = bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'success2025', 12)
    await pool.query('INSERT INTO admin (id, password_hash) VALUES (1, $1)', [hash])
  }

  console.log('✓ Database ready (PostgreSQL)')
}

function initSqlite() {
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

  const insert = db.prepare(
    'INSERT OR IGNORE INTO portfolio_data (section, data) VALUES (?, ?)'
  )
  for (const [section, data] of Object.entries(defaultData)) {
    insert.run(section, JSON.stringify(data))
  }

  const hasAdmin = db.prepare('SELECT id FROM admin LIMIT 1').get()
  if (!hasAdmin) {
    const hash = bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'success2025', 12)
    db.prepare('INSERT INTO admin (id, password_hash) VALUES (1, ?)').run(hash)
  }

  if (process.env.RENDER && !process.env.DATABASE_URL) {
    console.warn(
      '⚠ DATABASE_URL is not set — using temporary SQLite storage at',
      sqlitePath,
      '\n  Link a Render PostgreSQL database and set DATABASE_URL for persistent data.'
    )
  } else {
    console.log(`✓ Database ready (SQLite at ${sqlitePath})`)
  }
}

export const initDb = async () => {
  if (usePostgres) {
    await initPostgres()
  } else {
    initSqlite()
  }
}

export const getAllSections = async () => {
  if (usePostgres) {
    const { rows } = await getPool().query('SELECT section, data FROM portfolio_data')
    return Object.fromEntries(rows.map(r => [r.section, r.data]))
  }

  const rows = getDb().prepare('SELECT section, data FROM portfolio_data').all()
  return Object.fromEntries(rows.map(r => [r.section, JSON.parse(r.data)]))
}

export const getSection = async (section) => {
  if (usePostgres) {
    const { rows } = await getPool().query(
      'SELECT data FROM portfolio_data WHERE section = $1', [section]
    )
    return rows[0]?.data ?? null
  }

  const row = getDb().prepare('SELECT data FROM portfolio_data WHERE section = ?').get(section)
  return row ? JSON.parse(row.data) : null
}

export const setSection = async (section, data) => {
  if (usePostgres) {
    await getPool().query(`
      INSERT INTO portfolio_data (section, data, updated_at)
      VALUES ($1, $2, now())
      ON CONFLICT (section)
      DO UPDATE SET data = EXCLUDED.data, updated_at = now()
    `, [section, JSON.stringify(data)])
    return
  }

  getDb().prepare(`
    INSERT INTO portfolio_data (section, data, updated_at)
    VALUES (?, ?, datetime('now'))
    ON CONFLICT (section) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at
  `).run(section, JSON.stringify(data))
}

export const getAdminHash = async () => {
  if (usePostgres) {
    const { rows } = await getPool().query('SELECT password_hash FROM admin WHERE id = 1')
    return rows[0]?.password_hash ?? null
  }

  const row = getDb().prepare('SELECT password_hash FROM admin WHERE id = 1').get()
  return row?.password_hash ?? null
}

export const setAdminPassword = async (plaintext) => {
  const hash = bcrypt.hashSync(plaintext, 12)

  if (usePostgres) {
    await getPool().query(
      'UPDATE admin SET password_hash = $1, updated_at = now() WHERE id = 1', [hash]
    )
    return
  }

  getDb().prepare(
    'UPDATE admin SET password_hash = ?, updated_at = datetime(\'now\') WHERE id = 1'
  ).run(hash)
}
