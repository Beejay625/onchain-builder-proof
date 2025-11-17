'use client'

import { useState } from 'react'

export default function OnchainAchievementAchievementRestoreButton() {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleRestore = () => {
    if (!file) return
    // Restore logic here
    alert('Restore functionality coming soon')
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📥 Restore Button</h2>
      <div className="space-y-4">
        <input
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={handleRestore}
          disabled={!file}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          Restore Achievements
        </button>
      </div>
    </div>
  )
}

