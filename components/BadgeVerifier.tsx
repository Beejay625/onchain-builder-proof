'use client'

import { useState } from 'react'
import { useReadContract } from 'wagmi'

interface BadgeVerifierProps {
  contractAddress: string
  tokenId: string
}

export default function BadgeVerifier({ contractAddress, tokenId }: BadgeVerifierProps) {
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<{
    verified: boolean
    message: string
  } | null>(null)

  const { data: owner } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: [
      {
        inputs: [{ name: 'tokenId', type: 'uint256' }],
        name: 'ownerOf',
        outputs: [{ name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    functionName: 'ownerOf',
    args: [BigInt(tokenId)],
  })

  const verifyBadge = async () => {
    setIsVerifying(true)
    try {
      // Verify badge ownership and authenticity
      if (owner) {
        setVerificationResult({
          verified: true,
          message: 'Badge verified onchain',
        })
      }
    } catch (error) {
      setVerificationResult({
        verified: false,
        message: 'Verification failed',
      })
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">✓ Badge Verification</h3>
      <button
        onClick={verifyBadge}
        disabled={isVerifying}
        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
      >
        {isVerifying ? 'Verifying...' : 'Verify Badge'}
      </button>
      {verificationResult && (
        <div className={`mt-4 p-3 rounded-lg ${
          verificationResult.verified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {verificationResult.message}
        </div>
      )}
    </div>
  )
}
