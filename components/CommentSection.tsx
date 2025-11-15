'use client'

import { useAccount, useWriteContract, useReadContract } from 'wagmi'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { truncateAddress } from '@/lib/utils'
import { useState } from 'react'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xD96Da91A4DC052C860F4cA452efF924bd88CC437'

interface CommentSectionProps {
  postId: bigint
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const { address } = useAccount()
  const [comment, setComment] = useState('')
  const [showComments, setShowComments] = useState(false)
  const { writeContract, isPending } = useWriteContract()
