'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT, BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainBuilderCertificates() {
  const { address } = useAccount()
  const [certificateName, setCertificateName] = useState('')
  const [issuer, setIssuer] = useState('')
  const [certificateUrl, setCertificateUrl] = useState('')
  
  const { data: hash, writeContract, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const mintCertificate = async () => {
    if (!address || !certificateName || !issuer) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`Certificate: ${certificateName} issued by ${issuer} - ${certificateUrl}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🎓 Builder Certificates</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Certificate name"
          value={certificateName}
          onChange={(e) => setCertificateName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Issuer name"
          value={issuer}
          onChange={(e) => setIssuer(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="url"
          placeholder="Certificate URL (optional)"
          value={certificateUrl}
          onChange={(e) => setCertificateUrl(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={mintCertificate}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Minting...' : 'Mint Certificate'}
        </button>
        {isSuccess && <p className="text-green-600">Certificate minted onchain!</p>}
      </div>
    </div>
  )
}

