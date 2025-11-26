'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementNFTMetadataProps {
  achievementId: bigint
}

export default function OnchainAchievementNFTMetadata({ achievementId }: OnchainAchievementNFTMetadataProps) {
  const { address } = useAccount()
  const [nftAddress, setNftAddress] = useState('0xnft')
  const [tokenId, setTokenId] = useState('1')
  const [data, setData] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const record = () => {
    if (!address) return
    if (!nftAddress.trim() || !nftAddress.startsWith('0x')) return
    const payload = `NFTMetadata|nft:${nftAddress}|tokenId:${tokenId}|data:${data}`
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">NFTMetadata</h3>
      <p className="text-sm text-gray-600 mb-4">Track NFTMetadata operations for NFT collections.</p>
      <div className="space-y-3 mb-4">
        <input value={nftAddress} onChange={(e) => setNftAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="NFT address" />
        <input type="number" value={tokenId} onChange={(e) => setTokenId(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Token ID" min="0" />
        <input value={data} onChange={(e) => setData(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Data" />
      </div>
      <button onClick={record} disabled={isPending || isConfirming || !address || !nftAddress.startsWith('0x')} className="w-full px-4 py-3 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 disabled:bg-gray-400">
        {isPending || isConfirming ? 'Recording...' : 'Record NFTMetadata'}
      </button>
      {isSuccess && <div className="mt-4 text-sm text-pink-700 bg-pink-50 border border-pink-200 rounded-lg p-3">✓ NFTMetadata recorded onchain.</div>}
    </section>
  )
}



