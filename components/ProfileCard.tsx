'use client'

import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { truncateAddress } from '@/lib/utils'
import { useState } from 'react'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xD96Da91A4DC052C860F4cA452efF924bd88CC437'

export default function ProfileCard() {
  const { address } = useAccount()
  const [isEditing, setIsEditing] = useState(false)

