import React, { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import WordResult from './components/WordResult'
import HistoryList from './components/HistoryList'
import { DictionaryResponse } from './types/Dictionary'

const HISTORY_KEY = 'dictionary_history_v1'

const App: React.FC = () => {
  const [word, setWord] = useState<string | null>(null)
  const [data, setData] = useState<DictionaryResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [history, setHistory] = useState<string[]>([])

  // Load saved history
  useEffect(() => {
    const saved = localStorage.getItem(HISTORY_KEY)
    if (saved) setHistory(JSON.parse(saved))
  }, [])

  // Fetch definition when word changes
  useEffect(() => {
    if (!word) return

    const fetchWord = async () => {
      setLoading(true)
      setError(null)
      setData(null)

      try {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)

        if (!res.ok) {
          const body = await res.json().catch(() => ({}))
          const msg = body?.title || 'Word not found'
          throw new Error(msg)
        }

        const json: DictionaryResponse[] = await res.json()
        setData(json[0])

        // Update search history (max 10 items)
        setHistory(prev => {
          const filtered = prev.filter(w => w !== word)
          const next = [word, ...filtered].slice(0, 10)
          localStorage.setItem(HISTORY_KEY, JSON.stringify(next))
          return next
        })
      } catch (err: any) {
        setError(err.message || 'Failed to fetch')
      } finally {
        setLoading(false)
      }
    }

    fetchWord()
  }, [word])

  const handleSearch = (w: string) => setWord(w)
  const handleSelectHistory = (w: string) => setWord(w)

  const clearHistory = () => {
    localStorage.removeItem(HISTORY_KEY)
    setHistory([])
  }

  return (
    <div className="app-container">
      <header>
        <h1>Dictionary + Pronunciation</h1>
      </header>

      <SearchBar onSearch={handleSearch} />

      {/* Loading State */}
      {loading && <p>Loading...</p>}

      {/* Error State */}
      {error && <p className="error">{error}</p>}

      {/* Dictionary Result */}
      {data && <WordResult data={data} />}

      {/* Search History */}
      <HistoryList
        items={history}
        onSelect={handleSelectHistory}
        onClear={clearHistory}
      />
    </div>
  )
}

export default App
