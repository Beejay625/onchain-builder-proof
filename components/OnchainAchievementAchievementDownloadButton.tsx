'use client'

export default function OnchainAchievementAchievementDownloadButton() {
  const handleDownload = () => {
    const data = JSON.stringify({ achievement: 'data' })
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'achievement.json'
    a.click()
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">💾 Download Button</h2>
      <button
        onClick={handleDownload}
        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        Download Achievement
      </button>
    </div>
  )
}

