'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementStorageSlotProps {
  achievementId: bigint
}

export default function OnchainAchievementStorageSlot({ achievementId }: OnchainAchievementStorageSlotProps) {
  const { address } = useAccount()
  const [slot, setSlot] = useState('0')
  const [value, setValue] = useState('0xvalue')
  const [purpose, setPurpose] = useState('upgradeable storage')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordSlot = () => {
    if (!address || !slot.trim()) return

    const payload = `STORAGE_SLOT|slot:${slot}|value:${value}|purpose:${purpose}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-slate-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">💾 Storage Slot</h3>
      <p className="text-sm text-gray-600 mb-4">Document storage slot layouts for upgradeable contracts.</p>

      <div className="space-y-3 mb-4">
        <input type="number" value={slot} onChange={(e) => setSlot(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Storage slot" />
        <input value={value} onChange={(e) => setValue(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Value" />
        <input value={purpose} onChange={(e) => setPurpose(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Purpose" />
      </div>

      <button
        onClick={recordSlot}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record storage slot'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg p-3">
          ✓ Storage slot documented onchain.
        </div>
      )}
    </section>
  )
}
