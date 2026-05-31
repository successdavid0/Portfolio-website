import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { getPortfolioData, savePortfolioData } from '../lib/portfolioStore'
import { api, hasBackend } from '../lib/api'

const PortfolioContext = createContext(null)

export const PortfolioProvider = ({ children }) => {
  const [data, setData]       = useState(getPortfolioData)
  const [loading, setLoading] = useState(hasBackend())

  // On mount: if backend is configured, load fresh data from API
  useEffect(() => {
    if (!hasBackend()) return
    api.getAll()
      .then(remote => {
        setData(prev => ({ ...prev, ...remote }))
        savePortfolioData({ ...getPortfolioData(), ...remote })
      })
      .catch(err => console.warn('Could not reach API, using local data:', err.message))
      .finally(() => setLoading(false))
  }, [])

  // update — saves to API if available, always updates localStorage as fallback
  const update = useCallback(async (section, value, token = null) => {
    setData(prev => {
      const next = { ...prev, [section]: value }
      savePortfolioData(next)
      return next
    })

    if (hasBackend() && token) {
      try {
        await api.putSection(token, section, value)
      } catch (err) {
        console.error('API save failed:', err.message)
        throw err
      }
    }
  }, [])

  return (
    <PortfolioContext.Provider value={{ data, update, loading }}>
      {children}
    </PortfolioContext.Provider>
  )
}

export const usePortfolio = () => {
  const ctx = useContext(PortfolioContext)
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider')
  return ctx
}
