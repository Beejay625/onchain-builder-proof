'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementTokenBoundAccountProps {
  achievementId: bigint
}

export default function OnchainAchievementTokenBoundAccount({ achievementId }: OnchainAchievementTokenBoundAccountProps) {
  const { address } = useAccount()
  const [nftAddress, setNftAddress] = useState('0xnft')
  const [tokenId, setTokenId] = useState('1')
  const [tbaAddress, setTbaAddress] = useState('0xtba')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordTBA = () => {
    if (!address) return
    if (!nftAddress.trim() || !nftAddress.startsWith('0x')) return

    const payload = `TOKEN_BOUND_ACCOUNT|nft:${nftAddress}|tokenId:${tokenId}|tba:${tbaAddress}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-blue-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🎫 Token Bound Account</h3>
      <p className="text-sm text-gray-600 mb-4">Record ERC-6551 token bound account implementations.</p>

      <div className="space-y-3 mb-4">
        <input value={nftAddress} onChange={(e) => setNftAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500" placeholder="NFT address" />
        <input type="number" value={tokenId} onChange={(e) => setTokenId(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Token ID" min="0" />
        <input value={tbaAddress} onChange={(e) => setTbaAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="TBA address" />
      </div>

      <button
        onClick={recordTBA}
        disabled={isPending || isConfirming || !address || !nftAddress.startsWith('0x')}
        className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record token bound account'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded-lg p-3">
          ✓ Token bound account recorded onchain.
        </div>
      )}
    </section>
  )
}
