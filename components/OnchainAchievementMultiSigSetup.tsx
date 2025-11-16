'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementMultiSigSetup() {
  const { address } = useAccount()
  const [signers, setSigners] = useState('')
  const [threshold, setThreshold] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const setupMultiSig = async () => {
    if (!address || !signers || !threshold) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(0), `MULTISIG: ${threshold}/${signers.split(',').length} setup`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔐 Multi-Sig Setup</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Signer addresses (comma-separated)"
          value={signers}
          onChange={(e) => setSigners(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="number"
          placeholder="Threshold"
          value={threshold}
          onChange={(e) => setThreshold(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={setupMultiSig}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Setting up...' : 'Setup Multi-Sig'}
        </button>
        {isSuccess && <p className="text-green-600">Multi-sig setup recorded!</p>}
      </div>
    </div>
  )
}

