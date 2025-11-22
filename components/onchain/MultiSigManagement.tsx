'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function MultiSigManagement() {
  const { address, isConnected } = useAccount()
  const [signerAddresses, setSignerAddresses] = useState('')
  const [threshold, setThreshold] = useState(2)
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainMultiSig')) {
    return null
  }

  const handleSetupMultiSig = async () => {
    if (!isConnected || !address || !signerAddresses.trim()) return

    try {
      const signers = signerAddresses.split(',').map((s) => s.trim()).filter(Boolean)
      const content = `Multi-Sig Setup\nThreshold: ${threshold}/${signers.length}\nSigners: ${signers.join(', ')}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Multi-sig setup failed:', error)
    }
  }

  return (
    <AppCard title="🔐 Multi-Signature Setup" subtitle="Configure multi-sig for achievement management" accent="slate">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Signer Addresses (comma-separated)</label>
          <textarea
            value={signerAddresses}
            onChange={(e) => setSignerAddresses(e.target.value)}
            placeholder="0x..., 0x..., 0x..."
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Threshold</label>
          <input
            type="number"
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            min={1}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleSetupMultiSig}
          disabled={isPending || isConfirming || !isConnected || !signerAddresses.trim()}
          className="w-full rounded-lg bg-slate-600 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Setting up...' : 'Setup Multi-Sig'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Multi-sig configuration recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}


