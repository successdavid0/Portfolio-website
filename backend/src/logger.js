const isDev = process.env.NODE_ENV !== 'production'

const LEVELS = { debug: 0, info: 1, warn: 2, error: 3 }
const MIN_LEVEL = LEVELS[process.env.LOG_LEVEL] ?? (isDev ? LEVELS.debug : LEVELS.info)

const COLORS = {
  debug: '\x1b[36m', // cyan
  info:  '\x1b[32m', // green
  warn:  '\x1b[33m', // yellow
  error: '\x1b[31m', // red
  reset: '\x1b[0m',
}

function write(level, message, context = {}) {
  if (LEVELS[level] < MIN_LEVEL) return

  const entry = {
    ts:      new Date().toISOString(),
    level,
    message,
    ...context,
  }

  if (isDev) {
    const color = COLORS[level]
    const ctx   = Object.keys(context).length ? ' ' + JSON.stringify(context) : ''
    console[level === 'error' ? 'error' : 'log'](
      `${color}[${level.toUpperCase()}]${COLORS.reset} ${entry.ts}  ${message}${ctx}`
    )
  } else {
    // Render captures stdout — emit one JSON line per log entry
    console.log(JSON.stringify(entry))
  }
}

export const logger = {
  debug: (msg, ctx)  => write('debug', msg, ctx),
  info:  (msg, ctx)  => write('info',  msg, ctx),
  warn:  (msg, ctx)  => write('warn',  msg, ctx),
  error: (msg, ctx)  => write('error', msg, ctx),
}
