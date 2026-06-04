import pg from 'pg'
import bcrypt from 'bcryptjs'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { defaultData } from './defaultData.js'
import { logger } from './logger.js'

const { Pool } = pg
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const usePostgres = Boolean(process.env.DATABASE_URL?.trim())

let _pool = null
let _db = null
let _SqliteDatabase = null

const sqlitePath = process.env.DB_PATH
  ? path.resolve(process.env.DB_PATH)
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

async function loadSqlite() {
  if (_SqliteDatabase) return _SqliteDatabase
  try {
    const mod = await import('better-sqlite3')
    _SqliteDatabase = mod.default
    return _SqliteDatabase
  } catch {
    throw new Error(
      'SQLite is unavailable. Install backend dev dependencies locally, or set DATABASE_URL to a PostgreSQL connection string on Render.'
    )
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
    throw new Error('SQLite database not initialised. Call initDb() first.')
  }
  return _db
}

function adminPasswordFromEnv() {
  return process.env.ADMIN_PASSWORD?.trim() || null
}

/** Hash stored in DB; syncs from ADMIN_PASSWORD on every boot when that env var is set. */
async function ensureAdminRow() {
  const envPassword = adminPasswordFromEnv()
  const password = envPassword || 'success2025'
  const hash = bcrypt.hashSync(password, 12)

  if (usePostgres) {
    const pool = getPool()
    const { rowCount } = await pool.query('SELECT 1 FROM admin WHERE id = 1')
    if (rowCount === 0) {
      await pool.query('INSERT INTO admin (id, password_hash) VALUES (1, $1)', [hash])
      if (!envPassword) {
        console.warn('⚠ ADMIN_PASSWORD not set — admin login uses default password (success2025)')
      }
      return
    }
    if (envPassword) {
      await pool.query(
        'UPDATE admin SET password_hash = $1, updated_at = now() WHERE id = 1',
        [hash]
      )
    }
    return
  }

  const hasAdmin = getDb().prepare('SELECT id FROM admin WHERE id = 1').get()
  if (!hasAdmin) {
    getDb().prepare('INSERT INTO admin (id, password_hash) VALUES (1, ?)').run(hash)
    if (!envPassword) {
      console.warn('⚠ ADMIN_PASSWORD not set — admin login uses default password (success2025)')
    }
    return
  }
  if (envPassword) {
    getDb().prepare(
      'UPDATE admin SET password_hash = ?, updated_at = datetime(\'now\') WHERE id = 1'
    ).run(hash)
  }
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

  await ensureAdminRow()

  logger.info('Database ready', { engine: 'PostgreSQL' })
}

async function initSqlite() {
  const SqliteDatabase = await loadSqlite()
  fs.mkdirSync(path.dirname(sqlitePath), { recursive: true })
  _db = new SqliteDatabase(sqlitePath)
  _db.pragma('journal_mode = WAL')
  _db.pragma('foreign_keys = ON')

  _db.exec(`
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

  const insert = _db.prepare(
    'INSERT OR IGNORE INTO portfolio_data (section, data) VALUES (?, ?)'
  )
  for (const [section, data] of Object.entries(defaultData)) {
    insert.run(section, JSON.stringify(data))
  }

  await ensureAdminRow()

  logger.info('Database ready', { engine: 'SQLite', path: sqlitePath })
}

export const initDb = async () => {
  if (process.env.NODE_ENV === 'production' && !usePostgres) {
    throw new Error(
      'DATABASE_URL is required in production. Create a Render PostgreSQL database and link it to this service.'
    )
  }

  if (usePostgres) {
    await initPostgres()
  } else {
    await initSqlite()
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
