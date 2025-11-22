'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementContractUpgradesProps {
  achievementId: bigint
}

export default function OnchainAchievementContractUpgrades({ achievementId }: OnchainAchievementContractUpgradesProps) {
  const { address } = useAccount()
  const [upgradeType, setUpgradeType] = useState('transparent proxy')
  const [newImplementation, setNewImplementation] = useState('0xnewimpl')
  const [upgradeTx, setUpgradeTx] = useState('0xupgrade')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordUpgrade = () => {
    if (!address || !upgradeType.trim()) return
    if (!newImplementation.trim() || !upgradeTx.trim()) return
    if (!newImplementation.startsWith('0x') || !upgradeTx.startsWith('0x')) return

    const payload = `CONTRACT_UPGRADE|type:${upgradeType}|impl:${newImplementation}|tx:${upgradeTx}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-indigo-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">⬆️ Contract Upgrades</h3>
      <p className="text-sm text-gray-600 mb-4">Record smart contract upgrade events with implementation tracking.</p>

      <div className="space-y-3 mb-4">
        <input value={upgradeType} onChange={(e) => setUpgradeType(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Upgrade type" />
        <input value={newImplementation} onChange={(e) => setNewImplementation(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="New implementation" />
        <input value={upgradeTx} onChange={(e) => setUpgradeTx(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Upgrade tx" />
      </div>

      <button
        onClick={recordUpgrade}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record contract upgrade'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg p-3">
          ✓ Contract upgrade recorded onchain.
        </div>
      )}
    </section>
  )
}
