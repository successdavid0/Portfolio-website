const BASE = import.meta.env.VITE_API_URL || ''

const req = async (path, options = {}) => {
  if (!BASE) throw new Error('VITE_API_URL not set')
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`)
  return data
}

export const api = {
  // Auth
  login:          (password)        => req('/api/auth/login', { method: 'POST', body: JSON.stringify({ password }) }),
  changePassword: (token, newPass)  => req('/api/auth/change-password', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ newPassword: newPass }),
  }),

  // Portfolio — public
  getAll:     ()          => req('/api/portfolio'),
  getSection: (section)   => req(`/api/portfolio/${section}`),

  // Portfolio — admin
  putSection: (token, section, data) => req(`/api/portfolio/${section}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  }),

  // Contact
  sendContact: (payload) => req('/api/contact', { method: 'POST', body: JSON.stringify(payload) }),

  // Upload image — returns { url, publicId, width, height }
  uploadImage: async (token, file) => {
    if (!BASE) throw new Error('VITE_API_URL not set')
    const form = new FormData()
    form.append('image', file)
    const res  = await fetch(`${BASE}/api/upload`, {
      method:  'POST',
      headers: { Authorization: `Bearer ${token}` },
      body:    form,
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`)
    return data
  },
}

export const hasBackend = () => Boolean(import.meta.env.VITE_API_URL)
