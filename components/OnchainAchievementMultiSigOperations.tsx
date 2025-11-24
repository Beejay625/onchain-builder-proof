'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementMultiSigOperationsProps {
  achievementId: bigint
}

export default function OnchainAchievementMultiSigOperations({ achievementId }: OnchainAchievementMultiSigOperationsProps) {
  const { address } = useAccount()
  const [multisigAddress, setMultisigAddress] = useState('0xmultisig')
  const [threshold, setThreshold] = useState('2')
  const [owners, setOwners] = useState('3')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordMultiSig = () => {
    if (!address) return
    if (!multisigAddress.trim()) return
    if (!threshold.trim() || isNaN(Number(threshold)) || Number(threshold) < 1) return
    if (!multisigAddress.startsWith('0x') || multisigAddress.length !== 42) return

    const payload = `MULTISIG_OPERATIONS|multisig:${multisigAddress}|threshold:${threshold}|owners:${owners}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-purple-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🔐 Multi-Sig Operations</h3>
      <p className="text-sm text-gray-600 mb-4">Record multi-signature wallet operations and configurations.</p>

      <div className="space-y-3 mb-4">
        <input value={multisigAddress} onChange={(e) => setMultisigAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500" placeholder="Multi-sig address" />
        <input type="number" value={threshold} onChange={(e) => setThreshold(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Threshold" min="1" />
        <input type="number" value={owners} onChange={(e) => setOwners(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Number of owners" min="1" />
      </div>

      <button
        onClick={recordMultiSig}
        disabled={isPending || isConfirming || !address || !multisigAddress.startsWith('0x')}
        className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record multi-sig operation'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-purple-700 bg-purple-50 border border-purple-200 rounded-lg p-3">
          ✓ Multi-sig operation recorded onchain.
        </div>
      )}
    </section>
  )
}
