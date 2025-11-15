'use client'

import { useState } from 'react'

interface Challenge {
  id: string
  title: string
  description: string
  reward: string
  participants: number
  deadline: number
}

export default function AchievementChallenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([])

  const joinChallenge = (challengeId: string) => {
    // Join challenge
    console.log('Joining challenge:', challengeId)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">🎯 Challenges</h2>
      
      <div className="space-y-4">
        {challenges.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No active challenges</p>
        ) : (
          challenges.map((challenge) => (
            <div key={challenge.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition">
              <h3 className="font-bold text-lg mb-2">{challenge.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  {challenge.participants} participants • Reward: {challenge.reward}
                </div>
                <button
                  onClick={() => joinChallenge(challenge.id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                >
                  Join
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
