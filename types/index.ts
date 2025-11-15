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

export interface BuilderProfile {
  address: string
  username: string
  bio: string
  achievements: number
  followers: number
  following: number
  reputation: number
  level: string
  joinedAt: number
}

export interface Notification {
  id: string
  type: 'like' | 'comment' | 'follow' | 'achievement' | 'tip'
  message: string
  timestamp: number
  read: boolean
  link?: string
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
  requirement: number
  progress: number
}

export interface Goal {
  id: string
  title: string
  completed: boolean
  deadline: string
  createdAt: number
}

