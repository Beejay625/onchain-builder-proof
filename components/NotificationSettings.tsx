'use client'

import { useState } from 'react'

interface NotificationPreference {
  type: string
  enabled: boolean
  description: string
}

export default function NotificationSettings() {
  const [preferences, setPreferences] = useState<NotificationPreference[]>([
    { type: 'likes', enabled: true, description: 'Notify when someone likes your achievement' },
    { type: 'comments', enabled: true, description: 'Notify when someone comments' },
    { type: 'follows', enabled: true, description: 'Notify when someone follows you' },
    { type: 'tips', enabled: true, description: 'Notify when you receive a tip' },
    { type: 'milestones', enabled: true, description: 'Notify when you reach a milestone' },
  ])

  const togglePreference = (type: string) => {
    setPreferences(preferences.map(p => 
      p.type === type ? { ...p, enabled: !p.enabled } : p
    ))
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">🔔 Notification Settings</h2>
      
      <div className="space-y-4">
        {preferences.map((pref) => (
          <div key={pref.type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <div className="font-semibold text-sm capitalize mb-1">{pref.type}</div>
              <div className="text-xs text-gray-600">{pref.description}</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={pref.enabled}
                onChange={() => togglePreference(pref.type)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}
