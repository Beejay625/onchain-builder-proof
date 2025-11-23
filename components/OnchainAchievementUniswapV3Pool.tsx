'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementUniswapV3PoolProps {
  achievementId: bigint
}

export default function OnchainAchievementUniswapV3Pool({ achievementId }: OnchainAchievementUniswapV3PoolProps) {
  const { address } = useAccount()
  const [poolAddress, setPoolAddress] = useState('0xpool')
  const [token0, setToken0] = useState('0xtoken0')
  const [token1, setToken1] = useState('0xtoken1')
  const [fee, setFee] = useState('3000')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordPool = () => {
    if (!address) return
    if (!poolAddress.trim()) return
    if (!poolAddress.startsWith('0x') || poolAddress.length !== 42) return

    const payload = `UNISWAP_V3_POOL|pool:${poolAddress}|token0:${token0}|token1:${token1}|fee:${fee}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-green-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">💧 Uniswap V3 Pool</h3>
      <p className="text-sm text-gray-600 mb-4">Record Uniswap V3 liquidity pool configurations.</p>

      <div className="space-y-3 mb-4">
        <input value={poolAddress} onChange={(e) => setPoolAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500" placeholder="Pool address" />
        <input value={token0} onChange={(e) => setToken0(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Token 0 address" />
        <input value={token1} onChange={(e) => setToken1(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Token 1 address" />
        <input type="number" value={fee} onChange={(e) => setFee(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Fee tier" min="0" />
      </div>

      <button
        onClick={recordPool}
        disabled={isPending || isConfirming || !address || !poolAddress.startsWith('0x')}
        className="w-full px-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record Uniswap V3 pool'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg p-3">
          ✓ Uniswap V3 pool configuration recorded.
        </div>
      )}
    </section>
  )
}
