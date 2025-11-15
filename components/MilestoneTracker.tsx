'use client'

interface Milestone {
  id: number
  count: number
  label: string
  icon: string
  unlocked: boolean
}

interface MilestoneTrackerProps {
  achievementCount: number
}

export default function MilestoneTracker({ achievementCount }: MilestoneTrackerProps) {
  const milestones: Milestone[] = [
    { id: 1, count: 1, label: 'First Achievement', icon: '🎯', unlocked: achievementCount >= 1 },
    { id: 2, count: 5, label: '5 Achievements', icon: '🚀', unlocked: achievementCount >= 5 },
    { id: 3, count: 10, label: '10 Achievements', icon: '⚡', unlocked: achievementCount >= 10 },
    { id: 4, count: 25, label: '25 Achievements', icon: '🔥', unlocked: achievementCount >= 25 },
    { id: 5, count: 50, label: '50 Achievements', icon: '👑', unlocked: achievementCount >= 50 },
    { id: 6, count: 100, label: '100 Achievements', icon: '💎', unlocked: achievementCount >= 100 },
  ]

  const nextMilestone = milestones.find(m => !m.unlocked)
  const progress = nextMilestone ? (achievementCount / nextMilestone.count) * 100 : 100

  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-bold mb-4">🎖️ Milestones</h3>
      
      {nextMilestone && (
        <div className="mb-6 p-4 bg-white rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">Next Milestone: {nextMilestone.label}</span>
            <span className="text-2xl">{nextMilestone.icon}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div
              className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 text-center">
            {achievementCount}/{nextMilestone.count} achievements
          </p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-3">
        {milestones.map((milestone) => (
          <div
            key={milestone.id}
            className={`p-3 rounded-lg text-center transition ${
              milestone.unlocked
                ? 'bg-gradient-to-br from-yellow-100 to-yellow-200 border-2 border-yellow-400'
                : 'bg-gray-100 opacity-50'
            }`}
          >
            <div className="text-3xl mb-1">{milestone.icon}</div>
            <div className="text-xs font-semibold">{milestone.count}</div>
            {milestone.unlocked && (
              <div className="text-xs text-green-600 font-bold mt-1">✓</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
