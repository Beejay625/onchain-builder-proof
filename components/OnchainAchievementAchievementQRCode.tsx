'use client'

export default function OnchainAchievementAchievementQRCode() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📱 QR Code</h2>
      <div className="flex justify-center items-center p-4 bg-gray-50 rounded-lg">
        <div className="w-32 h-32 bg-gray-300 rounded"></div>
      </div>
      <p className="text-center text-sm text-gray-500 mt-2">
        Scan to view achievement
      </p>
    </div>
  )
}

