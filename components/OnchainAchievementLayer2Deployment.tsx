'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementLayer2DeploymentProps {
  achievementId: bigint
}

export default function OnchainAchievementLayer2Deployment({ achievementId }: OnchainAchievementLayer2DeploymentProps) {
  const { address } = useAccount()
  const [layer2, setLayer2] = useState('Optimism')
  const [contractAddress, setContractAddress] = useState('0xcontract')
  const [deploymentTx, setDeploymentTx] = useState('0xtx')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordDeployment = () => {
    if (!address) return
    if (!layer2.trim() || !contractAddress.trim()) return
    if (!contractAddress.startsWith('0x') || contractAddress.length !== 42) return

    const payload = `LAYER2_DEPLOYMENT|layer2:${layer2}|contract:${contractAddress}|tx:${deploymentTx}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-orange-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">⚡ Layer 2 Deployment</h3>
      <p className="text-sm text-gray-600 mb-4">Record smart contract deployments on Layer 2 networks.</p>

      <div className="space-y-3 mb-4">
        <input value={layer2} onChange={(e) => setLayer2(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-orange-500" placeholder="Layer 2 network" />
        <input value={contractAddress} onChange={(e) => setContractAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Contract address" />
        <input value={deploymentTx} onChange={(e) => setDeploymentTx(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Deployment transaction" />
      </div>

      <button
        onClick={recordDeployment}
        disabled={isPending || isConfirming || !address || !contractAddress.startsWith('0x')}
        className="w-full px-4 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record Layer 2 deployment'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-orange-700 bg-orange-50 border border-orange-200 rounded-lg p-3">
          ✓ Layer 2 deployment recorded onchain.
        </div>
      )}
    </section>
  )
}
