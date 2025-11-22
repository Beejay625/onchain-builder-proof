'use client'
import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
interface Props { achievementId: bigint }
export default function OnchainAchievementFeature19({ achievementId }: Props) {
  const { address } = useAccount()
  const [data, setData] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })
  const submit = () => {
    if (!address || !data.trim()) return
    writeContract({ address: BUILDER_PROOF_CONTRACT as `0x${string}`, abi: BuilderProofABI, functionName: 'addComment', args: [achievementId, `FEATURE19|data:${data}`] })
  }
  return <section className="bg-white border rounded-xl shadow p-6"><h3>Feature 19</h3><input value={data} onChange={(e) => setData(e.target.value)} className="w-full border rounded-lg p-2 mb-4" /><button onClick={submit} disabled={isPending || isConfirming} className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg">{isPending ? 'Submitting...' : 'Submit'}</button>{isSuccess && <div className="mt-4 text-green-700">✓ Recorded</div>}</section>
}
