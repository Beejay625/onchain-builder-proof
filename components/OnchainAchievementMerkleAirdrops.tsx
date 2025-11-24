'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementMerkleAirdropsProps {
  achievementId: bigint
}

export default function OnchainAchievementMerkleAirdrops({ achievementId }: OnchainAchievementMerkleAirdropsProps) {
  const { address } = useAccount()
  const [merkleRoot, setMerkleRoot] = useState('0xroot')
  const [tokenAddress, setTokenAddress] = useState('0xtoken')
  const [totalAmount, setTotalAmount] = useState('1000000')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordAirdrop = () => {
    if (!address) return
    if (!merkleRoot.trim()) return
    if (!tokenAddress.trim() || !tokenAddress.startsWith('0x')) return
    if (!merkleRoot.startsWith('0x') || merkleRoot.length !== 66) return

    const payload = `MERKLE_AIRDROPS|root:${merkleRoot}|token:${tokenAddress}|amount:${totalAmount}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-green-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🌳 Merkle Airdrops</h3>
      <p className="text-sm text-gray-600 mb-4">Record Merkle tree-based airdrop distributions.</p>

      <div className="space-y-3 mb-4">
        <input value={merkleRoot} onChange={(e) => setMerkleRoot(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500" placeholder="Merkle root" />
        <input value={tokenAddress} onChange={(e) => setTokenAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Token address" />
        <input value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Total amount" />
      </div>

      <button
        onClick={recordAirdrop}
        disabled={isPending || isConfirming || !address || !merkleRoot.startsWith('0x')}
        className="w-full px-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record Merkle airdrop'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg p-3">
          ✓ Merkle airdrop recorded onchain.
        </div>
      )}
    </section>
  )
}
