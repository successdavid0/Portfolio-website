import pg      from 'pg'
import bcrypt   from 'bcryptjs'
import { defaultData } from './defaultData.js'

const { Pool } = pg

// Render provides DATABASE_URL automatically when you link a PostgreSQL database
let _pool = null

export const getPool = () => {
  if (!_pool) {
    _pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL?.includes('render.com')
        ? { rejectUnauthorized: false }
        : false,
    })
  }
  return _pool
}

export const initDb = async () => {
  const pool = getPool()

  // Create tables
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

  // Seed default portfolio sections
  for (const [section, data] of Object.entries(defaultData)) {
    await pool.query(`
      INSERT INTO portfolio_data (section, data)
      VALUES ($1, $2)
      ON CONFLICT (section) DO NOTHING
    `, [section, JSON.stringify(data)])
  }

  // Seed admin password if not set
  const { rowCount } = await pool.query('SELECT 1 FROM admin LIMIT 1')
  if (rowCount === 0) {
    const hash = bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'success2025', 12)
    await pool.query('INSERT INTO admin (id, password_hash) VALUES (1, $1)', [hash])
  }

  console.log('✓ Database ready (PostgreSQL)')
}

// ── Helpers ───────────────────────────────────────────────────

export const getAllSections = async () => {
  const { rows } = await getPool().query('SELECT section, data FROM portfolio_data')
  return Object.fromEntries(rows.map(r => [r.section, r.data]))
}

export const getSection = async (section) => {
  const { rows } = await getPool().query(
    'SELECT data FROM portfolio_data WHERE section = $1', [section]
  )
  return rows[0]?.data ?? null
}

export const setSection = async (section, data) => {
  await getPool().query(`
    INSERT INTO portfolio_data (section, data, updated_at)
    VALUES ($1, $2, now())
    ON CONFLICT (section)
    DO UPDATE SET data = EXCLUDED.data, updated_at = now()
  `, [section, JSON.stringify(data)])
}

export const getAdminHash = async () => {
  const { rows } = await getPool().query('SELECT password_hash FROM admin WHERE id = 1')
  return rows[0]?.password_hash ?? null
}

export const setAdminPassword = async (plaintext) => {
  const hash = bcrypt.hashSync(plaintext, 12)
  await getPool().query(
    `UPDATE admin SET password_hash = $1, updated_at = now() WHERE id = 1`, [hash]
  )
}
