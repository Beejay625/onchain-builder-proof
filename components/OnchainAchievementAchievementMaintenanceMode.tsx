'use client'

export default function OnchainAchievementAchievementMaintenanceMode() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-yellow-500">
      <h2 className="text-2xl font-bold mb-4">🔧 Maintenance Mode</h2>
      <p className="text-gray-600 mb-4">
        We're currently performing maintenance. Please check back soon.
      </p>
      <div className="text-sm text-gray-500">
        <p>Expected completion: 2 hours</p>
      </div>
    </div>
  )
}

