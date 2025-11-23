'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementSecurityAuditProps {
  achievementId: bigint
}

export default function OnchainAchievementSecurityAudit({ achievementId }: OnchainAchievementSecurityAuditProps) {
  const { address } = useAccount()
  const [auditor, setAuditor] = useState('Trail of Bits')
  const [contractAddress, setContractAddress] = useState('0xcontract')
  const [reportHash, setReportHash] = useState('0xhash')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordAudit = () => {
    if (!address) return
    if (!auditor.trim() || !contractAddress.trim()) return
    if (!contractAddress.startsWith('0x') || contractAddress.length !== 42) return

    const payload = `SECURITY_AUDIT|auditor:${auditor}|contract:${contractAddress}|report:${reportHash}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-red-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🔒 Security Audit</h3>
      <p className="text-sm text-gray-600 mb-4">Record smart contract security audit results and reports.</p>

      <div className="space-y-3 mb-4">
        <input value={auditor} onChange={(e) => setAuditor(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-red-500" placeholder="Auditor name" />
        <input value={contractAddress} onChange={(e) => setContractAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Contract address" />
        <input value={reportHash} onChange={(e) => setReportHash(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Report hash" />
      </div>

      <button
        onClick={recordAudit}
        disabled={isPending || isConfirming || !address || !contractAddress.startsWith('0x')}
        className="w-full px-4 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record security audit'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
          ✓ Security audit recorded onchain.
        </div>
      )}
    </section>
  )
}
