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
