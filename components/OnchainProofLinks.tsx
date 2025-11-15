'use client'

import { useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainProofLinksProps {
  achievementId: bigint
}

export default function OnchainProofLinks({ achievementId }: OnchainProofLinksProps) {
  const { data: post } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [achievementId],
  })

  if (!post) return null

  const baseScanUrl = `https://basescan.org/address/${BUILDER_PROOF_CONTRACT}`
  const etherscanUrl = `https://etherscan.io/address/${BUILDER_PROOF_CONTRACT}`

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔗 Onchain Proof Links</h3>
      
      <div className="space-y-3">
        <a
          href={baseScanUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition"
        >
          <div className="font-semibold text-blue-700">View on BaseScan</div>
          <div className="text-xs text-blue-600 mt-1">Verify onchain record</div>
        </a>
        
        <a
          href={etherscanUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-3 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition"
        >
          <div className="font-semibold text-purple-700">View on Etherscan</div>
          <div className="text-xs text-purple-600 mt-1">Cross-chain verification</div>
        </a>
      </div>
    </div>
  )
}

