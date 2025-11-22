'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementMultiSigThresholdsProps {
  achievementId: bigint
}

export default function OnchainAchievementMultiSigThresholds({ achievementId }: OnchainAchievementMultiSigThresholdsProps) {
  const { address } = useAccount()
  const [signerCount, setSignerCount] = useState('5')
  const [threshold, setThreshold] = useState('3')
  const [multisigAddress, setMultisigAddress] = useState('0xmultisig')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordThreshold = () => {
    if (!address || !multisigAddress.trim()) return

    const payload = `MULTISIG_THRESHOLD|signers:${signerCount}|threshold:${threshold}|address:${multisigAddress}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-violet-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🔐 Multi-Sig Thresholds</h3>
      <p className="text-sm text-gray-600 mb-4">Publish multi-signature wallet configurations for governance actions.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <input value={signerCount} onChange={(e) => setSignerCount(e.target.value)} className="border border-gray-300 rounded-lg p-2" placeholder="Signer count" />
        <input value={threshold} onChange={(e) => setThreshold(e.target.value)} className="border border-gray-300 rounded-lg p-2" placeholder="Threshold" />
        <input value={multisigAddress} onChange={(e) => setMultisigAddress(e.target.value)} className="border border-gray-300 rounded-lg p-2" placeholder="Multi-sig address" />
      </div>

      <button
        onClick={recordThreshold}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-violet-600 text-white rounded-lg font-semibold hover:bg-violet-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording threshold...' : 'Record multi-sig threshold'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-violet-700 bg-violet-50 border border-violet-200 rounded-lg p-3">
          ✓ Multi-sig configuration stored onchain.
        </div>
      )}
    </section>
  )
}
