'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementCreate2Props {
  achievementId: bigint
}

export default function OnchainAchievementCreate2({ achievementId }: OnchainAchievementCreate2Props) {
  const { address } = useAccount()
  const [salt, setSalt] = useState('0xsalt')
  const [bytecode, setBytecode] = useState('0xbytecode')
  const [deployedAddress, setDeployedAddress] = useState('0xdeployed')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordCreate2 = () => {
    if (!address || !salt.trim()) return
    if (!salt.startsWith('0x') || !deployedAddress.startsWith('0x')) return

    const payload = `CREATE2|salt:${salt}|bytecode:${bytecode}|address:${deployedAddress}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-emerald-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🏗️ CREATE2</h3>
      <p className="text-sm text-gray-600 mb-4">Record CREATE2 deterministic contract deployments.</p>

      <div className="space-y-3 mb-4">
        <input value={salt} onChange={(e) => setSalt(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500" placeholder="Salt" />
        <input value={bytecode} onChange={(e) => setBytecode(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Bytecode hash" />
        <input value={deployedAddress} onChange={(e) => setDeployedAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500" placeholder="Deployed address" />
      </div>

      <button
        onClick={recordCreate2}
        disabled={isPending || isConfirming || !salt.startsWith('0x')}
        className="w-full px-4 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record CREATE2 deployment'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg p-3">
          ✓ CREATE2 deployment recorded onchain.
        </div>
      )}
    </section>
  )
}
