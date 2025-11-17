'use client'

export default function OnchainAchievementAchievementChangelog() {
  const changes = [
    { date: '2024-01-20', change: 'Added new onchain features' },
    { date: '2024-01-19', change: 'Improved UI components' },
  ]

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📋 Changelog</h2>
      <div className="space-y-2">
        {changes.map((c, i) => (
          <div key={i} className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm font-bold">{c.date}</p>
            <p className="text-sm text-gray-600">{c.change}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

