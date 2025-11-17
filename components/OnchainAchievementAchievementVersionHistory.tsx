'use client'

export default function OnchainAchievementAchievementVersionHistory() {
  const versions = [
    { version: '1.0.0', date: '2024-01-01', changes: 'Initial release' },
    { version: '1.1.0', date: '2024-01-15', changes: 'Added new features' },
  ]

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📜 Version History</h2>
      <div className="space-y-2">
        {versions.map((v, i) => (
          <div key={i} className="p-3 bg-gray-50 rounded-lg">
            <p className="font-bold">{v.version}</p>
            <p className="text-sm text-gray-600">{v.date}</p>
            <p className="text-sm text-gray-500">{v.changes}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

