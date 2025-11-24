'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function TokenRegistry() {
  const { address, isConnected } = useAccount()
  const [symbol, setSymbol] = useState('')
  const [contract, setContract] = useState('')
  const [decimals, setDecimals] = useState('18')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('tokenRegistry')) {
    return null
  }

  const handleRegister = async () => {
    if (!isConnected || !address || !symbol.trim() || !contract.trim()) return
    try {
      const content = `Token Registry
Symbol: ${symbol}
Address: ${contract}
Decimals: ${decimals}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Token registry log failed:', error)
    }
  }

  return (
    <AppCard title="🪙 Token Registry" subtitle="Maintain curated ERC asset metadata for BuilderProof" accent="purple">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Symbol</label>
            <input
              type="text"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Decimals</label>
            <input
              type="number"
              min={0}
              max={36}
              value={decimals}
              onChange={(e) => setDecimals(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Contract Address</label>
          <input
            type="text"
            value={contract}
            onChange={(e) => setContract(e.target.value)}
            placeholder="0x..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <button
          onClick={handleRegister}
          disabled={isPending || isConfirming || !isConnected || !symbol.trim() || !contract.trim()}
          className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Register Token'}
        </button>
        {isConfirmed && <div className="rounded-lg bg-green-50 p-3 text-sm text-green-800">✅ Token registered</div>}
      </div>
    </AppCard>
  )
}

