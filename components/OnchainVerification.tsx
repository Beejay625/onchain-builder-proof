'use client'

import { useState } from 'react'
import { useReadContract } from 'wagmi'
import { BuilderProofABI } from '@/abi/BuilderProof'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xD96Da91A4DC052C860F4cA452efF924bd88CC437'

interface OnchainVerificationProps {
  achievementId: bigint
}

export default function OnchainVerification({ achievementId }: OnchainVerificationProps) {
  const [verificationData, setVerificationData] = useState<any>(null)

  const { data: post, isLoading } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [achievementId],
  })

  const verifyOnchain = () => {
    if (post) {
      setVerificationData({
        verified: true,
        blockNumber: 'latest',
        contractAddress: CONTRACT_ADDRESS,
        timestamp: Date.now(),
      })
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">✓ Onchain Verification</h3>
      
      <button
        onClick={verifyOnchain}
        disabled={isLoading}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 mb-4"
      >
        {isLoading ? 'Verifying...' : 'Verify Onchain'}
      </button>

      {verificationData && (
        <div className="p-4 bg-green-50 border-2 border-green-500 rounded-lg">
          <div className="text-2xl mb-2 text-green-600">✓</div>
          <div className="font-semibold text-green-700 mb-2">Verified on Blockchain</div>
          <div className="text-xs text-gray-600 space-y-1">
            <div>Contract: {verificationData.contractAddress.slice(0, 10)}...</div>
            <div>Block: {verificationData.blockNumber}</div>
          </div>
        </div>
      )}
    </div>
  )
}
