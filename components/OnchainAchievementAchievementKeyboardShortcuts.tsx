'use client'

export default function OnchainAchievementAchievementKeyboardShortcuts() {
  const shortcuts = [
    { key: 'Ctrl+K', action: 'Search' },
    { key: 'Ctrl+N', action: 'New Achievement' },
    { key: 'Esc', action: 'Close Modal' },
  ]

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">⌨️ Keyboard Shortcuts</h2>
      <div className="space-y-2">
        {shortcuts.map((s, i) => (
          <div key={i} className="flex justify-between p-2 bg-gray-50 rounded">
            <span className="font-mono text-sm">{s.key}</span>
            <span className="text-sm text-gray-600">{s.action}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

