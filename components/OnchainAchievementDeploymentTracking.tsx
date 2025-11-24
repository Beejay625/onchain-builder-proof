'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementDeploymentTrackingProps {
  achievementId: bigint
}

export default function OnchainAchievementDeploymentTracking({ achievementId }: OnchainAchievementDeploymentTrackingProps) {
  const { address } = useAccount()
  const [contractAddress, setContractAddress] = useState('0xcontract')
  const [network, setNetwork] = useState('Base')
  const [deploymentTx, setDeploymentTx] = useState('0xtx')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordDeployment = () => {
    if (!address) return
    if (!contractAddress.trim()) return
    if (!contractAddress.startsWith('0x') || contractAddress.length !== 42) return

    const payload = `DEPLOYMENT_TRACKING|contract:${contractAddress}|network:${network}|tx:${deploymentTx}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-teal-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🚀 Deployment Tracking</h3>
      <p className="text-sm text-gray-600 mb-4">Record smart contract deployment information and network details.</p>

      <div className="space-y-3 mb-4">
        <input value={contractAddress} onChange={(e) => setContractAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-teal-500" placeholder="Contract address" />
        <input value={network} onChange={(e) => setNetwork(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Network" />
        <input value={deploymentTx} onChange={(e) => setDeploymentTx(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Deployment transaction" />
      </div>

      <button
        onClick={recordDeployment}
        disabled={isPending || isConfirming || !address || !contractAddress.startsWith('0x')}
        className="w-full px-4 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record deployment'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-teal-700 bg-teal-50 border border-teal-200 rounded-lg p-3">
          ✓ Deployment tracking recorded onchain.
        </div>
      )}
    </section>
  )
}
