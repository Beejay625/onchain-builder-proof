'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementIPProtection() {
  const { address } = useAccount()
  const [content, setContent] = useState('')
  const [ipHash, setIpHash] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const protectIP = async () => {
    if (!address || !content || !ipHash) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`IP:${ipHash}:${content}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🛡️ IP Protection</h2>
      <div className="space-y-4">
        <textarea
          placeholder="IP content to protect"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="IP hash (SHA256)"
          value={ipHash}
          onChange={(e) => setIpHash(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={protectIP}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Protecting...' : 'Protect IP'}
        </button>
        {isSuccess && <p className="text-green-600">IP protected onchain!</p>}
      </div>
    </div>
  )
}

