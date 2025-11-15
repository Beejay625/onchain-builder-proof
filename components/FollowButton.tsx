'use client'

import { useState } from 'react'

interface FollowButtonProps {
  targetAddress: string
  currentUserAddress?: string
}

export default function FollowButton({ targetAddress, currentUserAddress }: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleFollow = async () => {
    setIsLoading(true)
    try {
      // Toggle follow state
      setIsFollowing(!isFollowing)
    } catch (error) {
      console.error('Follow error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!currentUserAddress || targetAddress === currentUserAddress) {
    return null
  }

  return (
    <button
      onClick={handleFollow}
      disabled={isLoading}
      className={`px-4 py-2 rounded-lg font-medium transition ${
        isFollowing
          ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          : 'bg-blue-600 text-white hover:bg-blue-700'
      } disabled:opacity-50`}
    >
      {isLoading ? '...' : isFollowing ? 'Following' : 'Follow'}
    </button>
  )
}
