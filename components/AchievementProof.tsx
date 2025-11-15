'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { truncateAddress } from '@/lib/utils'

interface AchievementProofProps {
  achievementId: string
  content: string
  timestamp: number
}

export default function AchievementProof({ achievementId, content, timestamp }: AchievementProofProps) {
  const { address } = useAccount()
  const [proof, setProof] = useState<string | null>(null)

  const generateProof = () => {
    const proofData = {
      achievementId,
      content,
      timestamp,
      author: address,
      contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      network: 'base',
      proofType: 'achievement',
    }

    const proofString = JSON.stringify(proofData, null, 2)
    setProof(proofString)
  }

  const downloadProof = () => {
    if (!proof) return

    const blob = new Blob([proof], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `achievement-proof-${achievementId}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔐 Achievement Proof</h3>
      <button
        onClick={generateProof}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-4"
      >
        Generate Proof
      </button>

      {proof && (
        <div className="mt-4">
          <div className="bg-gray-50 p-4 rounded-lg mb-3">
            <pre className="text-xs overflow-auto">{proof}</pre>
          </div>
          <button
            onClick={downloadProof}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Download Proof
          </button>
        </div>
      )}
    </div>
  )
}
