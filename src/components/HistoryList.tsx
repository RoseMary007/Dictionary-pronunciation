import React from 'react'

type Props = {
  items: string[]
  onSelect: (word: string) => void
  onClear: () => void
}

const HistoryList: React.FC<Props> = ({ items, onSelect, onClear }) => {
  return (
    <div className="history">
      <h3>Recent Searches</h3>

      {items.length === 0 && <p>No history yet</p>}

      <ul>
        {items.map((w, i) => (
          <li key={i} onClick={() => onSelect(w)}>
            {w}
          </li>
        ))}
      </ul>

      {items.length > 0 && (
        <button onClick={onClear}>Clear History</button>
      )}
    </div>
  )
}

export default HistoryList
