'use client'

import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { useState } from 'react'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xD96Da91A4DC052C860F4cA452efF924bd88CC437'

interface ReactionButtonProps {
  postId: bigint
  currentLikes: bigint
}

export default function ReactionButton({ postId, currentLikes }: ReactionButtonProps) {
  const [isLiking, setIsLiking] = useState(false)
  const { writeContract, data: hash } = useWriteContract()
  
  const { isSuccess } = useWaitForTransactionReceipt({ hash })

  const handleLike = async () => {
    setIsLiking(true)
    try {
      // Send like transaction to blockchain
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addReaction',
        args: [postId, 'like'],
      })
    } catch (error) {
      console.error('Blockchain reaction failed:', error)
      setIsLiking(false)
    }
  }

  return (
    <button
      onClick={handleLike}
      disabled={isLiking}
      className="flex items-center gap-2 px-3 py-1 bg-blue-50 hover:bg-blue-100 rounded-full text-sm transition disabled:opacity-50"
    >
      <span className="text-lg">{isSuccess ? '❤️' : '👍'}</span>
      <span className="font-semibold text-blue-600">{currentLikes.toString()}</span>
      {isLiking && <span className="text-xs text-gray-500">Sending...</span>}
    </button>
  )
}
