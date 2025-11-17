'use client'

export default function OnchainAchievementAchievementStatusPage() {
  const services = [
    { name: 'API', status: 'operational', uptime: '99.9%' },
    { name: 'Blockchain', status: 'operational', uptime: '100%' },
    { name: 'Database', status: 'operational', uptime: '99.8%' },
  ]

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📊 Status Page</h2>
      <div className="space-y-2">
        {services.map((s, i) => (
          <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="font-bold">{s.name}</span>
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${s.status === 'operational' ? 'bg-green-500' : 'bg-red-500'}`}></span>
              <span className="text-sm text-gray-600">{s.status}</span>
              <span className="text-sm text-gray-500">({s.uptime})</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

