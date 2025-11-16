'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementMultiSig() {
  const { address } = useAccount()
  const [signerAddress, setSignerAddress] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const addSigner = async () => {
    if (!address || !signerAddress) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`MULTISIG: Add signer ${signerAddress}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔐 Achievement Multi-Sig</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Signer address"
          value={signerAddress}
          onChange={(e) => setSignerAddress(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={addSigner}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Adding...' : 'Add Signer'}
        </button>
        {isSuccess && <p className="text-green-600">Signer added onchain!</p>}
      </div>
    </div>
  )
}
