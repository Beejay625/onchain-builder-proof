'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementProxyAdminProps {
  achievementId: bigint
}

export default function OnchainAchievementProxyAdmin({ achievementId }: OnchainAchievementProxyAdminProps) {
  const { address } = useAccount()
  const [adminAddress, setAdminAddress] = useState('0xadmin')
  const [proxyAddress, setProxyAddress] = useState('0xproxy')
  const [ownershipTx, setOwnershipTx] = useState('0xtx')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordAdmin = () => {
    if (!address || !adminAddress.trim()) return

    const payload = `PROXY_ADMIN|admin:${adminAddress}|proxy:${proxyAddress}|tx:${ownershipTx}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-purple-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🔐 Proxy Admin</h3>
      <p className="text-sm text-gray-600 mb-4">Track proxy admin ownership changes for upgradeable contracts.</p>

      <div className="space-y-3 mb-4">
        <input value={adminAddress} onChange={(e) => setAdminAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Admin address" />
        <input value={proxyAddress} onChange={(e) => setProxyAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Proxy address" />
        <input value={ownershipTx} onChange={(e) => setOwnershipTx(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Ownership tx" />
      </div>

      <button
        onClick={recordAdmin}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record proxy admin'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-purple-700 bg-purple-50 border border-purple-200 rounded-lg p-3">
          ✓ Proxy admin recorded onchain.
        </div>
      )}
    </section>
  )
}
