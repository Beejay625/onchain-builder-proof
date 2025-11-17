'use client'

import { useState } from 'react'

export default function OnchainAchievementAchievementThemeSwitcher() {
  const [theme, setTheme] = useState('light')

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🎨 Theme Switcher</h2>
      <div className="space-y-4">
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="auto">Auto</option>
        </select>
        <p className="text-sm text-gray-500">
          Choose your preferred theme
        </p>
      </div>
    </div>
  )
}

