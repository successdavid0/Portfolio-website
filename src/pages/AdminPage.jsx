import { useState, useRef } from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import { resetPortfolioData } from '../lib/portfolioStore'
import { api, hasBackend } from '../lib/api'
import {
  FolderKanban, Cpu, BarChart3, LogOut, Plus, Trash2, Save,
  RefreshCw, Eye, Lock, ChevronRight, X, AlertCircle,
  CheckCircle2, KeyRound, ImagePlus, Loader2,
} from 'lucide-react'

const LOCAL_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'success2025'

const iconOptions     = ['Network','Code','Bot','Cloud','Shield','Zap','Server','Globe']
const categoryOptions = ['Network Engineering','Full-Stack','Bot Development','DevOps','Network Security','Network Tools']

// ─── Shared input styles ──────────────────────────────────────
const inp = "w-full px-3 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm outline-none focus:border-amber-500 transition-colors placeholder-zinc-500"
const lbl = "block text-xs text-zinc-400 mb-1.5 font-medium"

// ─── Password / Login Screen ──────────────────────────────────
const LoginScreen = ({ onAuth }) => {
  const [pw, setPw]       = useState('')
  const [err, setErr]     = useState('')
  const [shake, setShake] = useState(false)
  const [busy, setBusy]   = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setErr('')

    try {
      if (hasBackend()) {
        const { token } = await api.login(pw)
        onAuth(token)
      } else {
        if (pw === LOCAL_PASSWORD) { onAuth('local') }
        else throw new Error('Invalid password')
      }
    } catch {
      setErr('Incorrect password')
      setShake(true)
      setTimeout(() => setShake(false), 500)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] bg-amber-500/8 rounded-full blur-[120px]" />
      </div>

      <div className={`relative z-10 w-full max-w-sm ${shake ? 'animate-[shake_0.4s_ease]' : ''}`}>
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2.5 mb-4">
            <div className="w-10 h-10 border border-amber-500 flex items-center justify-center">
              <span className="font-bold text-amber-500 text-lg">S</span>
            </div>
            <span className="text-lg font-bold text-white tracking-wide">Admin Portal</span>
          </div>
          <p className="text-zinc-500 text-sm">
            {hasBackend() ? 'Connected to backend API' : 'Running in local mode'}
          </p>
        </div>

        <form onSubmit={submit} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              type="password"
              value={pw}
              onChange={e => setPw(e.target.value)}
              placeholder="Password"
              autoFocus
              className={`${inp} pl-10 ${err ? 'border-red-500' : ''}`}
            />
          </div>
          {err && <p className="text-red-400 text-xs text-center">{err}</p>}
          <button
            type="submit"
            disabled={busy}
            className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold transition-colors disabled:opacity-60"
          >
            {busy ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
        <p className="text-center text-zinc-700 text-xs mt-5">Success David Praise — Portfolio CMS</p>
      </div>
    </div>
  )
}

// ─── Toast ────────────────────────────────────────────────────
const Toast = ({ msg, type }) => {
  if (!msg) return null
  return (
    <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm mb-5 ${
      type === 'error'
        ? 'bg-red-500/10 border border-red-500/30 text-red-400'
        : 'bg-green-500/10 border border-green-500/30 text-green-400'
    }`}>
      {type === 'error'
        ? <AlertCircle className="h-4 w-4 flex-shrink-0" />
        : <CheckCircle2 className="h-4 w-4 flex-shrink-0" />}
      {msg}
    </div>
  )
}

const useToast = () => {
  const [toast, setToast] = useState({ msg: '', type: 'success' })
  const show = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast({ msg: '', type: 'success' }), 3000)
  }
  return { toast, show }
}

// ─── Image Uploader ───────────────────────────────────────────
const ImageUploader = ({ value, onChange, token }) => {
  const [uploading, setUploading] = useState(false)
  const [err, setErr]             = useState('')
  const inputRef = useRef(null)

  const handleFile = async (file) => {
    if (!file) return
    setErr('')
    if (!hasBackend()) {
      return setErr('Backend not connected — paste an image URL instead')
    }
    setUploading(true)
    try {
      const { url } = await api.uploadImage(token, file)
      onChange(url)
    } catch (e) {
      setErr(e.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const onDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  return (
    <div className="space-y-2">
      {/* Preview */}
      {value && (
        <div className="relative w-full h-36 rounded-lg overflow-hidden bg-zinc-800">
          <img src={value} alt="preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 p-1 bg-black/70 rounded-lg hover:bg-red-900/80 transition-colors"
          >
            <X className="h-3.5 w-3.5 text-white" />
          </button>
        </div>
      )}

      {/* Drop zone */}
      <div
        onDrop={onDrop}
        onDragOver={e => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        className="flex flex-col items-center gap-2 p-5 rounded-lg border border-dashed border-zinc-600 hover:border-amber-500 bg-zinc-800/40 cursor-pointer transition-colors"
      >
        {uploading
          ? <Loader2 className="h-6 w-6 text-amber-400 animate-spin" />
          : <ImagePlus className="h-6 w-6 text-zinc-400" />}
        <span className="text-xs text-zinc-400 text-center">
          {uploading ? 'Uploading…' : 'Click or drag & drop an image'}
        </span>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={e => handleFile(e.target.files?.[0])}
        />
      </div>

      {/* Manual URL input */}
      <div className="flex items-center gap-2">
        <div className="h-px flex-1 bg-zinc-800" />
        <span className="text-[10px] text-zinc-600">or paste URL</span>
        <div className="h-px flex-1 bg-zinc-800" />
      </div>
      <input
        className={inp}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="/projects/project 1.jpg  or  https://..."
      />

      {err && <p className="text-red-400 text-xs">{err}</p>}
    </div>
  )
}

// ─── Projects Editor ──────────────────────────────────────────
const ProjectsEditor = ({ token }) => {
  const { data, update } = usePortfolio()
  const { toast, show }  = useToast()
  const [editing, setEditing] = useState(null)
  const [adding, setAdding]   = useState(false)
  const [busy, setBusy]       = useState(false)

  const blank = { id: Date.now(), title: '', category: categoryOptions[0], description: '',
    image: '', tags: [], icon: 'Code', highlights: [], demoURL: '', githubUrl: '#' }
  const [form, setForm] = useState(blank)

  const normList = v => Array.isArray(v) ? v : v.split(',').map(s => s.trim()).filter(Boolean)
  const listStr  = v => Array.isArray(v) ? v.join(', ') : v

  const openEdit  = p => { setForm({ ...p }); setEditing(p.id); setAdding(false) }
  const openAdd   = ()  => { setForm({ ...blank, id: Date.now() }); setEditing(null); setAdding(true) }
  const closeForm = ()  => { setEditing(null); setAdding(false) }

  const saveForm = async () => {
    if (!form.title.trim() || !form.description.trim()) {
      return show('Title and description are required', 'error')
    }
    const trimmed = { ...form, tags: normList(form.tags), highlights: normList(form.highlights) }
    const next = adding
      ? [...data.projects, trimmed]
      : data.projects.map(p => p.id === editing ? trimmed : p)
    setBusy(true)
    try {
      await update('projects', next, token)
      show('Project saved')
      closeForm()
    } catch { show('Save failed — check API connection', 'error') }
    finally { setBusy(false) }
  }

  const deleteProject = async (id) => {
    if (!confirm('Delete this project?')) return
    const next = data.projects.filter(p => p.id !== id)
    try { await update('projects', next, token); show('Project deleted') }
    catch { show('Delete failed', 'error') }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Projects</h2>
          <p className="text-zinc-500 text-sm">{data.projects.length} projects</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition-colors">
          <Plus className="h-4 w-4" /> Add Project
        </button>
      </div>

      <Toast {...toast} />

      {/* Form */}
      {(editing || adding) && (
        <div className="mb-6 p-6 rounded-2xl bg-zinc-900 border border-zinc-700">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-white">{adding ? 'New Project' : 'Edit Project'}</h3>
            <button onClick={closeForm}><X className="h-5 w-5 text-zinc-400 hover:text-white" /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className={lbl}>Title *</label>
              <input className={inp} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Project title" />
            </div>
            <div>
              <label className={lbl}>Category</label>
              <select className={inp} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                {categoryOptions.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={lbl}>Icon</label>
              <select className={inp} value={form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))}>
                {iconOptions.map(i => <option key={i}>{i}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className={lbl}>Description *</label>
              <textarea className={`${inp} resize-none`} rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="What did you build and what was the impact?" />
            </div>
            <div className="md:col-span-2">
              <label className={lbl}>Project Image</label>
              <ImageUploader
                token={token}
                value={form.image}
                onChange={url => setForm(f => ({ ...f, image: url }))}
              />
            </div>
            <div>
              <label className={lbl}>Tags (comma-separated)</label>
              <input className={inp} value={listStr(form.tags)} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="React, Node.js, AWS" />
            </div>
            <div>
              <label className={lbl}>Highlights (comma-separated)</label>
              <input className={inp} value={listStr(form.highlights)} onChange={e => setForm(f => ({ ...f, highlights: e.target.value }))} placeholder="99% Uptime, 1000+ Users" />
            </div>
            <div>
              <label className={lbl}>Live Demo URL</label>
              <input className={inp} value={form.demoURL} onChange={e => setForm(f => ({ ...f, demoURL: e.target.value }))} placeholder="https://..." />
            </div>
            <div>
              <label className={lbl}>GitHub URL</label>
              <input className={inp} value={form.githubUrl} onChange={e => setForm(f => ({ ...f, githubUrl: e.target.value }))} placeholder="https://github.com/..." />
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <button onClick={saveForm} disabled={busy} className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition-colors disabled:opacity-60">
              <Save className="h-4 w-4" /> {busy ? 'Saving…' : 'Save Project'}
            </button>
            <button onClick={closeForm} className="px-6 py-2.5 rounded-xl border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 text-sm transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Project list */}
      <div className="space-y-2">
        {data.projects.map(p => (
          <div key={p.id} className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors group">
            <div className="w-14 h-14 rounded-lg overflow-hidden bg-zinc-800 flex-shrink-0">
              {p.image
                ? <img src={p.image} alt="" className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center text-zinc-600 text-[10px]">No img</div>}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-white truncate text-sm">{p.title}</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-medium">{p.category}</span>
                <span className="text-xs text-zinc-600 truncate">{Array.isArray(p.tags) ? p.tags.slice(0,3).join(' · ') : ''}</span>
              </div>
            </div>
            <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => openEdit(p)} className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors">
                <ChevronRight className="h-4 w-4" />
              </button>
              <button onClick={() => deleteProject(p.id)} className="p-2 rounded-lg bg-zinc-800 hover:bg-red-900/60 text-zinc-400 hover:text-red-400 transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Skills Editor ────────────────────────────────────────────
const SkillsEditor = ({ token }) => {
  const { data, update } = usePortfolio()
  const { toast, show }  = useToast()
  const [local, setLocal] = useState(data.skills)
  const [busy, setBusy]   = useState(false)

  const saveAll = async () => {
    setBusy(true)
    try { await update('skills', local, token); show('Skills updated') }
    catch { show('Save failed', 'error') }
    finally { setBusy(false) }
  }

  const groups = [...new Set(local.map(s => s.category))]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Skills</h2>
          <p className="text-zinc-500 text-sm">Adjust proficiency levels</p>
        </div>
        <button onClick={saveAll} disabled={busy} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition-colors disabled:opacity-60">
          <Save className="h-4 w-4" /> {busy ? 'Saving…' : 'Save All'}
        </button>
      </div>

      <Toast {...toast} />

      <div className="space-y-5">
        {groups.map(cat => (
          <div key={cat} className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
            <h3 className="text-amber-400 font-bold uppercase text-xs tracking-widest mb-4">{cat}</h3>
            <div className="space-y-4">
              {local.filter(s => s.category === cat).map(skill => (
                <div key={skill.name} className="flex items-center gap-4">
                  <span className="text-sm text-zinc-300 w-36 flex-shrink-0 truncate">{skill.name}</span>
                  <input
                    type="range" min="0" max="100" value={skill.level}
                    onChange={e => setLocal(ls => ls.map(s => s.name === skill.name ? { ...s, level: Number(e.target.value) } : s))}
                    className="flex-1 accent-amber-500"
                  />
                  <span className="text-amber-400 font-bold text-sm w-10 text-right">{skill.level}%</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Stats Editor ─────────────────────────────────────────────
const StatsEditor = ({ token }) => {
  const { data, update } = usePortfolio()
  const { toast, show }  = useToast()
  const [hero, setHero]   = useState(data.heroStats)
  const [about, setAbout] = useState(data.aboutStats)
  const [busy, setBusy]   = useState(false)

  const saveAll = async () => {
    setBusy(true)
    try {
      await update('heroStats',  hero,  token)
      await update('aboutStats', about, token)
      show('Stats saved')
    } catch { show('Save failed', 'error') }
    finally { setBusy(false) }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Stats & Numbers</h2>
          <p className="text-zinc-500 text-sm">Update the key numbers across your portfolio</p>
        </div>
        <button onClick={saveAll} disabled={busy} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition-colors disabled:opacity-60">
          <Save className="h-4 w-4" /> {busy ? 'Saving…' : 'Save'}
        </button>
      </div>

      <Toast {...toast} />

      <div className="space-y-5">
        <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
          <h3 className="text-amber-400 font-bold uppercase text-xs tracking-widest mb-4">Hero Section</h3>
          <div className="grid grid-cols-2 gap-4">
            {hero.map((s, i) => (
              <div key={i}>
                <label className={lbl}>{s.label}</label>
                <input className={inp} value={s.value} onChange={e => setHero(h => h.map((x, j) => j === i ? { ...x, value: e.target.value } : x))} placeholder="e.g. 27+" />
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
          <h3 className="text-amber-400 font-bold uppercase text-xs tracking-widest mb-4">About Section</h3>
          <div className="grid grid-cols-2 gap-4">
            {about.map((s, i) => (
              <div key={i}>
                <label className={lbl}>{s.label}</label>
                <input className={inp} value={s.value} onChange={e => setAbout(a => a.map((x, j) => j === i ? { ...x, value: e.target.value } : x))} placeholder="e.g. 99%" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Change Password ──────────────────────────────────────────
const ChangePassword = ({ token }) => {
  const { toast, show } = useToast()
  const [form, setForm] = useState({ current: '', next: '', confirm: '' })
  const [busy, setBusy] = useState(false)

  const save = async (e) => {
    e.preventDefault()
    if (form.next !== form.confirm) return show('Passwords do not match', 'error')
    if (form.next.length < 8) return show('Minimum 8 characters', 'error')
    setBusy(true)
    try {
      if (hasBackend()) {
        await api.changePassword(token, form.next)
        show('Password changed. You will need to log in again.')
      } else {
        show('Change password via your .env file (VITE_ADMIN_PASSWORD)', 'error')
      }
      setForm({ current: '', next: '', confirm: '' })
    } catch { show('Failed to change password', 'error') }
    finally { setBusy(false) }
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Change Password</h2>
        <p className="text-zinc-500 text-sm">Minimum 8 characters</p>
      </div>
      <Toast {...toast} />
      <form onSubmit={save} className="max-w-sm space-y-4 p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
        {[['New Password', 'next'], ['Confirm Password', 'confirm']].map(([label, key]) => (
          <div key={key}>
            <label className={lbl}>{label}</label>
            <input type="password" className={inp} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} required />
          </div>
        ))}
        <button type="submit" disabled={busy} className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition-colors disabled:opacity-60">
          {busy ? 'Saving…' : 'Update Password'}
        </button>
      </form>
    </div>
  )
}

// ─── Sidebar ──────────────────────────────────────────────────
const tabs = [
  { id: 'projects',  label: 'Projects',  icon: FolderKanban },
  { id: 'skills',    label: 'Skills',    icon: Cpu },
  { id: 'stats',     label: 'Stats',     icon: BarChart3 },
  { id: 'password',  label: 'Password',  icon: KeyRound },
]

// ─── Main ─────────────────────────────────────────────────────
export const AdminPage = () => {
  const [token, setToken] = useState(null)
  const [tab, setTab]     = useState('projects')

  const handleReset = () => {
    if (!confirm('Reset ALL local data to defaults?')) return
    resetPortfolioData()
    window.location.reload()
  }

  if (!token) return <LoginScreen onAuth={setToken} />

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 border-r border-zinc-800 flex flex-col">
        <div className="p-5 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 border border-amber-500 flex items-center justify-center flex-shrink-0">
              <span className="font-bold text-amber-500 text-sm">S</span>
            </div>
            <div>
              <div className="text-sm font-bold text-white">Portfolio CMS</div>
              <div className="text-[10px] text-zinc-500">{hasBackend() ? '● API connected' : '○ Local mode'}</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                tab === t.id
                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          ))}
        </nav>

        <div className="p-3 space-y-0.5 border-t border-zinc-800">
          <a href="/" target="_blank" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all">
            <Eye className="h-4 w-4" /> View Site
          </a>
          <button onClick={handleReset} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition-all">
            <RefreshCw className="h-4 w-4" /> Reset Data
          </button>
          <button onClick={() => setToken(null)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all">
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-8">
          {tab === 'projects' && <ProjectsEditor token={token} />}
          {tab === 'skills'   && <SkillsEditor   token={token} />}
          {tab === 'stats'    && <StatsEditor     token={token} />}
          {tab === 'password' && <ChangePassword  token={token} />}
        </div>
      </main>
    </div>
  )
}
