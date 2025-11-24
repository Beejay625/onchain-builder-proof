'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface SmartContractVerificationProps {
  contractAddress?: `0x${string}`
}

export default function SmartContractVerification({ contractAddress }: SmartContractVerificationProps) {
  const { address, isConnected } = useAccount()
  const [explorerLink, setExplorerLink] = useState('')
  const [verifier, setVerifier] = useState('BaseScan')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('smartContractVerification')) {
    return null
  }

  const handleRecord = async () => {
    if (!isConnected || !address || !explorerLink.trim()) return
    try {
      const content = `Smart Contract Verification
Contract: ${contractAddress ?? 'n/a'}
Verifier: ${verifier}
Proof: ${explorerLink}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Verification log failed:', error)
    }
  }

  return (
    <AppCard title="✅ Smart Contract Verification" subtitle="Capture verifier metadata for BuilderProof deployments" accent="green">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Explorer / Proof Link</label>
          <input
            type="url"
            value={explorerLink}
            onChange={(e) => setExplorerLink(e.target.value)}
            placeholder="https://basescan.org/address/..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Verifier</label>
          <input
            type="text"
            value={verifier}
            onChange={(e) => setVerifier(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleRecord}
          disabled={isPending || isConfirming || !isConnected || !explorerLink.trim()}
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Verification'}
        </button>
        {isConfirmed && <div className="rounded-lg bg-green-50 p-3 text-sm text-green-800">✅ Verification recorded</div>}
      </div>
    </AppCard>
  )
}

