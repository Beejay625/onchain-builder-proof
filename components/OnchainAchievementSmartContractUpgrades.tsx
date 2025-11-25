'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementSmartContractUpgradesProps {
  achievementId: bigint
}

export default function OnchainAchievementSmartContractUpgrades({ achievementId }: OnchainAchievementSmartContractUpgradesProps) {
  const { address } = useAccount()
  const [proxyAddress, setProxyAddress] = useState('0xproxy')
  const [oldImplementation, setOldImplementation] = useState('0xold')
  const [newImplementation, setNewImplementation] = useState('0xnew')
  const [upgradeTx, setUpgradeTx] = useState('0xtx')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordUpgrade = () => {
    if (!address) return
    if (!proxyAddress.trim()) return
    if (!newImplementation.trim() || !newImplementation.startsWith('0x')) return
    if (!proxyAddress.startsWith('0x') || proxyAddress.length !== 42) return

    const payload = `SMART_CONTRACT_UPGRADES|proxy:${proxyAddress}|oldImpl:${oldImplementation}|newImpl:${newImplementation}|tx:${upgradeTx}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-blue-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">⬆️ Smart Contract Upgrades</h3>
      <p className="text-sm text-gray-600 mb-4">Record smart contract upgrade operations and implementation changes.</p>

      <div className="space-y-3 mb-4">
        <input value={proxyAddress} onChange={(e) => setProxyAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500" placeholder="Proxy address" />
        <input value={oldImplementation} onChange={(e) => setOldImplementation(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Old implementation" />
        <input value={newImplementation} onChange={(e) => setNewImplementation(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="New implementation" />
        <input value={upgradeTx} onChange={(e) => setUpgradeTx(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Upgrade transaction" />
      </div>

      <button
        onClick={recordUpgrade}
        disabled={isPending || isConfirming || !address || !proxyAddress.startsWith('0x')}
        className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record contract upgrade'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded-lg p-3">
          ✓ Smart contract upgrade recorded onchain.
        </div>
      )}
    </section>
  )
}
