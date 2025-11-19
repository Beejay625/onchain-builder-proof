'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementMultiSigProps {
  achievementId: bigint
}

export default function OnchainAchievementMultiSig({ achievementId }: OnchainAchievementMultiSigProps) {
  const { address } = useAccount()
  const [signerAddresses, setSignerAddresses] = useState('')
  const [requiredSignatures, setRequiredSignatures] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const setupMultiSig = async () => {
    if (!address || !signerAddresses.trim() || !requiredSignatures.trim()) return
    
    const multiSigData = `MULTISIG: signers: ${signerAddresses} | required: ${requiredSignatures}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, multiSigData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔐 Multi-Signature Setup</h3>
      
      <textarea
        value={signerAddresses}
        onChange={(e) => setSignerAddresses(e.target.value)}
        placeholder="Signer addresses (one per line)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 font-mono text-sm"
        rows={4}
      />
      
      <input
        type="number"
        value={requiredSignatures}
        onChange={(e) => setRequiredSignatures(e.target.value)}
        placeholder="Required signatures"
        min="1"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={setupMultiSig}
        disabled={isPending || isConfirming || !signerAddresses.trim() || !requiredSignatures.trim()}
        className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Setting up...' : 'Setup Multi-Sig Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Multi-signature setup recorded onchain
        </div>
      )}
    </div>
  )
}
