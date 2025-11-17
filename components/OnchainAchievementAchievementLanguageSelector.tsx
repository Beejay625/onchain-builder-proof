'use client'

import { useState } from 'react'

export default function OnchainAchievementAchievementLanguageSelector() {
  const [language, setLanguage] = useState('en')

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🌐 Language Selector</h2>
      <div className="space-y-4">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>
        <p className="text-sm text-gray-500">
          Select your language
        </p>
      </div>
    </div>
  )
}

