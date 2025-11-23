'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementNFTMetadataStandardProps {
  achievementId: bigint
}

export default function OnchainAchievementNFTMetadataStandard({ achievementId }: OnchainAchievementNFTMetadataStandardProps) {
  const { address } = useAccount()
  const [nftAddress, setNftAddress] = useState('0xnft')
  const [tokenId, setTokenId] = useState('1')
  const [metadataURI, setMetadataURI] = useState('ipfs://')
  const [standard, setStandard] = useState('ERC721')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordMetadata = () => {
    if (!address) return
    if (!nftAddress.trim()) return
    if (!nftAddress.startsWith('0x') || nftAddress.length !== 42) return

    const payload = `NFT_METADATA_STANDARD|nft:${nftAddress}|tokenId:${tokenId}|uri:${metadataURI}|standard:${standard}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-purple-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">📝 NFT Metadata Standard</h3>
      <p className="text-sm text-gray-600 mb-4">Record NFT metadata URI and standard compliance.</p>

      <div className="space-y-3 mb-4">
        <input value={nftAddress} onChange={(e) => setNftAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500" placeholder="NFT address" />
        <input type="number" value={tokenId} onChange={(e) => setTokenId(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Token ID" min="0" />
        <input value={metadataURI} onChange={(e) => setMetadataURI(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Metadata URI" />
        <input value={standard} onChange={(e) => setStandard(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Standard" />
      </div>

      <button
        onClick={recordMetadata}
        disabled={isPending || isConfirming || !address || !nftAddress.startsWith('0x')}
        className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record NFT metadata'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-purple-700 bg-purple-50 border border-purple-200 rounded-lg p-3">
          ✓ NFT metadata recorded onchain.
        </div>
      )}
    </section>
  )
}
