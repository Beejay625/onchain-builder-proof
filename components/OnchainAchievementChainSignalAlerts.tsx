'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementChainSignalAlertsProps {
  achievementId: bigint
}

export default function OnchainAchievementChainSignalAlerts({ achievementId }: OnchainAchievementChainSignalAlertsProps) {
  const { address } = useAccount()
  const [alertType, setAlertType] = useState('milestone')
  const [alertMessage, setAlertMessage] = useState('')
  const [alertSeverity, setAlertSeverity] = useState('info')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const createChainSignalAlert = async () => {
    if (!address || !alertMessage.trim()) return
    
    const alertData = `CHAIN_SIGNAL_ALERT:type:${alertType}:severity:${alertSeverity}:message:${alertMessage.trim()}:timestamp:${Math.floor(Date.now() / 1000)}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, alertData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📡 Chain Signal Alerts</h3>
      
      <select
        value={alertType}
        onChange={(e) => setAlertType(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      >
        <option value="milestone">Milestone</option>
        <option value="deadline">Deadline</option>
        <option value="risk">Risk</option>
        <option value="update">Update</option>
        <option value="achievement">Achievement</option>
      </select>
      
      <select
        value={alertSeverity}
        onChange={(e) => setAlertSeverity(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      >
        <option value="info">Info</option>
        <option value="warning">Warning</option>
        <option value="error">Error</option>
        <option value="critical">Critical</option>
      </select>
      
      <textarea
        value={alertMessage}
        onChange={(e) => setAlertMessage(e.target.value)}
        placeholder="Alert message"
        rows={3}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={createChainSignalAlert}
        disabled={isPending || isConfirming || !alertMessage.trim()}
        className="w-full px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Creating...' : 'Create Chain Signal Alert Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Chain signal alert created onchain
        </div>
      )}
    </div>
  )
}
