'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementContractFactoryDeploymentsProps {
  achievementId: bigint
}

export default function OnchainAchievementContractFactoryDeployments({ achievementId }: OnchainAchievementContractFactoryDeploymentsProps) {
  const { address } = useAccount()
  const [factoryAddress, setFactoryAddress] = useState('0xfactory')
  const [deployedAddress, setDeployedAddress] = useState('0xdeployed')
  const [salt, setSalt] = useState('0xsalt')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordDeployment = () => {
    if (!address) return
    if (!factoryAddress.trim()) return
    if (!factoryAddress.startsWith('0x') || factoryAddress.length !== 42) return

    const payload = `CONTRACT_FACTORY_DEPLOYMENTS|factory:${factoryAddress}|deployed:${deployedAddress}|salt:${salt}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-blue-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🏭 Contract Factory Deployments</h3>
      <p className="text-sm text-gray-600 mb-4">Record contract factory deployment operations using CREATE2.</p>

      <div className="space-y-3 mb-4">
        <input value={factoryAddress} onChange={(e) => setFactoryAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500" placeholder="Factory address" />
        <input value={deployedAddress} onChange={(e) => setDeployedAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Deployed contract address" />
        <input value={salt} onChange={(e) => setSalt(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Salt" />
      </div>

      <button
        onClick={recordDeployment}
        disabled={isPending || isConfirming || !address || !factoryAddress.startsWith('0x')}
        className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record factory deployment'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded-lg p-3">
          ✓ Factory deployment recorded onchain.
        </div>
      )}
    </section>
  )
}
