'use client'

import { useState } from 'react'
import { keccak256, toUtf8Bytes } from 'ethers'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'

import AppCard from '@/components/common/AppCard'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function InvoiceHashVault() {
  const { address, isConnected } = useAccount()
  const [invoiceRef, setInvoiceRef] = useState('')
  const [amount, setAmount] = useState('1250')
  const [hash, setHash] = useState<string | null>(null)
  const { writeContract, data: txHash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash: txHash })

  if (!isFeatureEnabled('invoiceHashVault')) {
    return null
  }

  const handleHash = () => {
    if (!invoiceRef.trim()) return
    const digest = keccak256(toUtf8Bytes(`${invoiceRef}:${amount}`))
    setHash(digest)
  }

  const handleAnchor = async () => {
    if (!isConnected || !address || !hash) return

    try {
      const content = `Invoice Hash Vault
Reference: ${invoiceRef}
Amount: ${amount}
Hash: ${hash}`

      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Invoice hash anchoring failed:', error)
    }
  }

  return (
    <AppCard
      title="🧾 Invoice Hash Vault"
      subtitle="Anchor off-chain invoice proofs to the BuilderProof ledger."
      accent="slate"
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Invoice Reference</label>
          <input
            type="text"
            value={invoiceRef}
            onChange={(e) => setInvoiceRef(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Amount (USD)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          type="button"
          onClick={handleHash}
          className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Generate Hash
        </button>
        {hash && (
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs font-mono text-slate-700">
            {hash}
          </div>
        )}
        <button
          onClick={handleAnchor}
          disabled={isPending || isConfirming || !isConnected || !hash}
          className="w-full rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-900 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Anchoring...' : 'Anchor Hash'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800">
            ✅ Invoice hash recorded
          </div>
        )}
      </div>
    </AppCard>
  )
}

