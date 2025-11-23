'use client'

import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'
import { useState } from 'react'

interface QRCodeGenerationProps {
  achievementId: bigint
}

export default function QRCodeGeneration({ achievementId }: QRCodeGenerationProps) {
  const [qrSize, setQrSize] = useState(200)
  const achievementUrl = typeof window !== 'undefined' ? `${window.location.origin}/achievement/${achievementId.toString()}` : ''
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(achievementUrl)}`

  if (!isFeatureEnabled('qrCodeGeneration')) {
    return null
  }

  return (
    <AppCard title="📱 QR Code Generation" subtitle="Generate QR codes for achievements" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">QR Code Size</label>
          <select
            value={qrSize}
            onChange={(e) => setQrSize(Number(e.target.value))}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value={200}>200x200</option>
            <option value={300}>300x300</option>
            <option value={400}>400x400</option>
            <option value={500}>500x500</option>
          </select>
        </div>
        {achievementUrl && (
          <div className="flex flex-col items-center space-y-2">
            <img
              src={qrCodeUrl}
              alt="Achievement QR Code"
              className="border border-gray-200 rounded-lg"
            />
            <a
              href={qrCodeUrl}
              download={`achievement-${achievementId}-qr.png`}
              className="text-sm text-blue-600 hover:underline"
            >
              Download QR Code
            </a>
          </div>
        )}
        <p className="text-xs text-gray-500">
          Share this QR code to let others easily access this achievement.
        </p>
      </div>
    </AppCard>
  )
}

