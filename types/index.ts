/**
 * Type definitions for the application
 */

export interface Post {
  id: bigint
  author: `0x${string}`
  content: string
  timestamp: bigint
  likes: bigint
  comments: bigint
}

export interface Comment {
  id: bigint
  postId: bigint
  author: `0x${string}`
  content: string
  timestamp: bigint
}

export interface Reaction {
  id: bigint
  postId: bigint
  user: `0x${string}`
  reactionType: string
  timestamp: bigint
}

export interface Profile {
  user: `0x${string}`
  name: string
  bio: string
  avatar: string
  reputation: bigint
  verified: boolean
}

export interface Achievement {
  id: string
  content: string
  timestamp: number
  likes: number
  comments: number
  author: string
}

