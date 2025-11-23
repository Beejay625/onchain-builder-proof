'use client'

import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'
import { useState } from 'react'

interface EmbedCodeProps {
  achievementId: bigint
}

export default function EmbedCode({ achievementId }: EmbedCodeProps) {
  const [embedSize, setEmbedSize] = useState<'small' | 'medium' | 'large'>('medium')
  const achievementUrl = typeof window !== 'undefined' ? `${window.location.origin}/achievement/${achievementId.toString()}` : ''
  
  const embedCode = `<iframe src="${achievementUrl}" width="${embedSize === 'small' ? '400' : embedSize === 'medium' ? '600' : '800'}" height="600" frameborder="0"></iframe>`

  if (!isFeatureEnabled('embedCode')) {
    return null
  }

  const handleCopy = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(embedCode)
    }
  }

  return (
    <AppCard title="📄 Embed Code" subtitle="Generate embed codes for achievements" accent="green">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Embed Size</label>
          <select
            value={embedSize}
            onChange={(e) => setEmbedSize(e.target.value as 'small' | 'medium' | 'large')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="small">Small (400px)</option>
            <option value="medium">Medium (600px)</option>
            <option value="large">Large (800px)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Embed Code</label>
          <textarea
            value={embedCode}
            readOnly
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono bg-gray-50"
          />
        </div>
        <button
          onClick={handleCopy}
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
        >
          Copy Embed Code
        </button>
        <p className="text-xs text-gray-500">
          Use this code to embed the achievement on your website or blog.
        </p>
      </div>
    </AppCard>
  )
}

