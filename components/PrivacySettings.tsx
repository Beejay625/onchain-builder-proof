'use client'

import { useState } from 'react'

interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'friends'
  achievementVisibility: 'public' | 'private'
  showWalletAddress: boolean
  allowComments: boolean
}

export default function PrivacySettings() {
  const [settings, setSettings] = useState<PrivacySettings>({
    profileVisibility: 'public',
    achievementVisibility: 'public',
    showWalletAddress: true,
    allowComments: true,
  })

  const updateSetting = (key: keyof PrivacySettings, value: any) => {
    setSettings({ ...settings, [key]: value })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">🔒 Privacy Settings</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Profile Visibility</label>
          <select
            value={settings.profileVisibility}
            onChange={(e) => updateSetting('profileVisibility', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="friends">Friends Only</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Achievement Visibility</label>
          <select
            value={settings.achievementVisibility}
            onChange={(e) => updateSetting('achievementVisibility', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.showWalletAddress}
              onChange={(e) => updateSetting('showWalletAddress', e.target.checked)}
            />
            <span className="text-sm">Show Wallet Address</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.allowComments}
              onChange={(e) => updateSetting('allowComments', e.target.checked)}
            />
            <span className="text-sm">Allow Comments</span>
          </label>
        </div>
      </div>
    </div>
  )
}
