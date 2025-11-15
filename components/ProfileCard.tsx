'use client'

import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { truncateAddress } from '@/lib/utils'
import { useState } from 'react'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xD96Da91A4DC052C860F4cA452efF924bd88CC437'

export default function ProfileCard() {
  const { address } = useAccount()
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [avatar, setAvatar] = useState('')

  // Fetch user profile from blockchain
  const { data: profile } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getProfile',
    args: address ? [address] : undefined,
  })

  const { writeContract, isPending } = useWriteContract()

  const handleSaveProfile = async () => {
    if (!name.trim()) return
    
    // Write profile to blockchain
    writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'updateProfile',
      args: [name, bio, avatar],
    })
  }

