'use client'

import { useState } from 'react'

interface CertificateProps {
  achievementId: string
  achievementTitle: string
  builderName: string
  timestamp: number
}

export default function OnchainCertificate({
  achievementId,
  achievementTitle,
  builderName,
  timestamp
}: CertificateProps) {
  const [showCertificate, setShowCertificate] = useState(false)

  const downloadCertificate = () => {
    const canvas = document.createElement('canvas')
    canvas.width = 1200
    canvas.height = 800
    const ctx = canvas.getContext('2d')

    if (!ctx) return

    // Draw certificate background
    ctx.fillStyle = '#f8f9fa'
    ctx.fillRect(0, 0, 1200, 800)

    // Draw border
    ctx.strokeStyle = '#2563eb'
    ctx.lineWidth = 10
    ctx.strokeRect(50, 50, 1100, 700)

    // Draw title
    ctx.fillStyle = '#1e40af'
    ctx.font = 'bold 48px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('Certificate of Achievement', 600, 150)

    // Draw achievement
    ctx.fillStyle = '#000'
    ctx.font = '32px Arial'
    ctx.fillText(achievementTitle, 600, 300)

    // Draw builder name
    ctx.font = '24px Arial'
    ctx.fillText(`Awarded to: ${builderName}`, 600, 400)

    // Draw date
    ctx.font = '20px Arial'
    ctx.fillText(new Date(timestamp * 1000).toLocaleDateString(), 600, 500)

    // Draw ID
    ctx.font = '16px Arial'
    ctx.fillText(`ID: ${achievementId}`, 600, 600)

    // Download
    canvas.toBlob((blob) => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `certificate-${achievementId}.png`
      a.click()
      URL.revokeObjectURL(url)
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📜 Onchain Certificate</h3>
      <button
        onClick={() => setShowCertificate(true)}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-4"
      >
        View Certificate
      </button>
      {showCertificate && (
        <div className="mt-4">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-4 border-blue-600 rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Certificate of Achievement</h2>
            <p className="text-xl mb-6">{achievementTitle}</p>
            <p className="text-lg mb-4">Awarded to: {builderName}</p>
            <p className="text-sm text-gray-600">{new Date(timestamp * 1000).toLocaleDateString()}</p>
          </div>
          <button
            onClick={downloadCertificate}
            className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Download Certificate
          </button>
        </div>
      )}
    </div>
  )
}
