'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementSoulboundTokenProofProps {
  achievementId: bigint
}

export default function OnchainAchievementSoulboundTokenProof({ achievementId }: OnchainAchievementSoulboundTokenProofProps) {
  const { address } = useAccount()
  const [tokenId, setTokenId] = useState('42')
  const [contractAddress, setContractAddress] = useState('0xsbt')
  const [isTransferable, setIsTransferable] = useState('false')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordSBT = () => {
    if (!address || !tokenId.trim()) return

    const payload = `SOULBOUND_TOKEN|id:${tokenId}|contract:${contractAddress}|transferable:${isTransferable}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-pink-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">💎 Soulbound Token Proof</h3>
      <p className="text-sm text-gray-600 mb-4">Record non-transferable achievement tokens tied to builder identity.</p>

      <div className="space-y-3 mb-4">
        <input value={tokenId} onChange={(e) => setTokenId(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Token ID" />
        <input value={contractAddress} onChange={(e) => setContractAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Contract address" />
        <input value={isTransferable} onChange={(e) => setIsTransferable(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Transferable" />
      </div>

      <button
        onClick={recordSBT}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record soulbound token'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-pink-700 bg-pink-50 border border-pink-200 rounded-lg p-3">
          ✓ Soulbound token proof stored.
        </div>
      )}
    </section>
  )
}
