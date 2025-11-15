'use client'

interface Badge {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
  requirement: number
  progress: number
}

interface BadgeDisplayProps {
  userAchievements: number
}

export default function BadgeDisplay({ userAchievements }: BadgeDisplayProps) {
  const badges: Badge[] = [
    { id: '1', name: 'First Step', description: 'Mint your first achievement', icon: '🎯', unlocked: userAchievements >= 1, requirement: 1, progress: userAchievements },
    { id: '2', name: 'Getting Started', description: 'Mint 5 achievements', icon: '🚀', unlocked: userAchievements >= 5, requirement: 5, progress: userAchievements },
    { id: '3', name: 'Consistent Builder', description: 'Mint 10 achievements', icon: '⚡', unlocked: userAchievements >= 10, requirement: 10, progress: userAchievements },
    { id: '4', name: 'Dedicated Creator', description: 'Mint 25 achievements', icon: '🔥', unlocked: userAchievements >= 25, requirement: 25, progress: userAchievements },
    { id: '5', name: 'Master Builder', description: 'Mint 50 achievements', icon: '👑', unlocked: userAchievements >= 50, requirement: 50, progress: userAchievements },
    { id: '6', name: 'Legend', description: 'Mint 100 achievements', icon: '💎', unlocked: userAchievements >= 100, requirement: 100, progress: userAchievements },
  ]

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">🏅 Achievement Badges</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`p-4 rounded-lg border-2 transition ${
              badge.unlocked
                ? 'border-yellow-400 bg-yellow-50'
                : 'border-gray-200 bg-gray-50 opacity-60'
            }`}
          >
            <div className="text-4xl mb-2 text-center">{badge.icon}</div>
            <h3 className="font-bold text-center mb-1">{badge.name}</h3>
            <p className="text-xs text-gray-600 text-center mb-2">{badge.description}</p>
            {!badge.unlocked && (
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${Math.min((badge.progress / badge.requirement) * 100, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-center mt-1 text-gray-500">
                  {badge.progress}/{badge.requirement}
                </p>
              </div>
            )}
            {badge.unlocked && (
              <div className="text-center mt-2">
                <span className="text-xs font-semibold text-green-600">✓ Unlocked</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

