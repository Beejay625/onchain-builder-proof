'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementBuilderCertificatesProps {
  achievementId: bigint
}

export default function OnchainAchievementBuilderCertificates({ achievementId }: OnchainAchievementBuilderCertificatesProps) {
  const { address } = useAccount()
  const [certificateName, setCertificateName] = useState('')
  const [issuerName, setIssuerName] = useState('')
  const [certificateUrl, setCertificateUrl] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const mintCertificate = async () => {
    if (!address || !certificateName.trim() || !issuerName.trim()) return
    
    const certData = `BUILDER_CERTIFICATE: ${certificateName} | issuer: ${issuerName}${certificateUrl ? ` | url: ${certificateUrl}` : ''}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, certData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🎓 Builder Certificates</h3>
      
      <input
        type="text"
        value={certificateName}
        onChange={(e) => setCertificateName(e.target.value)}
        placeholder="Certificate name"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <input
        type="text"
        value={issuerName}
        onChange={(e) => setIssuerName(e.target.value)}
        placeholder="Issuer name"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <input
        type="url"
        value={certificateUrl}
        onChange={(e) => setCertificateUrl(e.target.value)}
        placeholder="Certificate URL (optional)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={mintCertificate}
        disabled={isPending || isConfirming || !certificateName.trim() || !issuerName.trim()}
        className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Minting...' : 'Mint Certificate Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Certificate minted onchain
        </div>
      )}
    </div>
  )
}
