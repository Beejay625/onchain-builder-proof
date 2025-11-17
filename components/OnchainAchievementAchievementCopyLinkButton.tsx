'use client'

import { useState } from 'react'

export default function OnchainAchievementAchievementCopyLinkButton() {
  const [copied, setCopied] = useState(false)

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔗 Copy Link Button</h2>
      <button
        onClick={copyLink}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        {copied ? 'Link Copied!' : 'Copy Link'}
      </button>
    </div>
  )
}

