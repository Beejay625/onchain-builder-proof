'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainBuilderCertificatesProps {
  achievementId: bigint
}

export default function OnchainBuilderCertificates({ achievementId }: OnchainBuilderCertificatesProps) {
  const { address } = useAccount()
  const [courseName, setCourseName] = useState('')
  const [certificateId, setCertificateId] = useState('')
  const [issuerName, setIssuerName] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const mintCertificate = async () => {
    if (!address || !courseName.trim()) return
    
    const certData = `BUILDER_CERTIFICATE: ${courseName}${certificateId ? ` - ID: ${certificateId}` : ''}${issuerName ? ` - Issuer: ${issuerName}` : ''}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, certData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🎓 Onchain Builder Certificates</h3>
      
      <input
        type="text"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
        placeholder="Course name"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={certificateId}
          onChange={(e) => setCertificateId(e.target.value)}
          placeholder="Certificate ID (optional)"
          className="flex-1 p-3 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          value={issuerName}
          onChange={(e) => setIssuerName(e.target.value)}
          placeholder="Issuer name (optional)"
          className="flex-1 p-3 border border-gray-300 rounded-lg"
        />
      </div>
      
      <button
        onClick={mintCertificate}
        disabled={isPending || isConfirming || !courseName.trim()}
        className="w-full px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Minting...' : 'Mint Certificate'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Certificate minted onchain
        </div>
      )}
    </div>
  )
}
