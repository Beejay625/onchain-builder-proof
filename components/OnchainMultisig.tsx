'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainMultisigProps {
  achievementId: bigint
}

export default function OnchainMultisig({ achievementId }: OnchainMultisigProps) {
  const { address } = useAccount()
  const [signerAddress, setSignerAddress] = useState('')
  const [requiredSignatures, setRequiredSignatures] = useState('2')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const setupMultisig = async () => {
    if (!address || !signerAddress.trim()) return
    
    const multisigData = `MULTISIG_SETUP: ${signerAddress} as signer, ${requiredSignatures} signatures required for achievement #${achievementId}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, multisigData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔐 Onchain Multi-signature</h3>
      
      <input
        type="text"
        value={signerAddress}
        onChange={(e) => setSignerAddress(e.target.value)}
        placeholder="Signer wallet address (0x...)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 font-mono text-sm"
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
        onClick={setupMultisig}
        disabled={isPending || isConfirming || !signerAddress.trim()}
        className="w-full px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Setting up...' : 'Setup Multi-signature'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Multi-signature setup recorded onchain
        </div>
      )}
    </div>
  )
}

