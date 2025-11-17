'use client'

import { useState } from 'react'

export default function OnchainAchievementAchievementAccessibilitySettings() {
  const [fontSize, setFontSize] = useState('medium')
  const [highContrast, setHighContrast] = useState(false)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">♿ Accessibility Settings</h2>
      <div className="space-y-4">
        <label className="flex items-center justify-between">
          <span>Font Size</span>
          <select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="ml-4 px-2 py-1 border rounded"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </label>
        <label className="flex items-center justify-between">
          <span>High Contrast</span>
          <input
            type="checkbox"
            checked={highContrast}
            onChange={(e) => setHighContrast(e.target.checked)}
            className="ml-4"
          />
        </label>
      </div>
    </div>
  )
}

