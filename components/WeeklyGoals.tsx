'use client'

import { useState } from 'react'

interface Goal {
  id: string
  title: string
  completed: boolean
  deadline: string
}

export default function WeeklyGoals() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [newGoalTitle, setNewGoalTitle] = useState('')
  const [showAddGoal, setShowAddGoal] = useState(false)

  const addGoal = () => {
    if (!newGoalTitle.trim()) return
    
    const newGoal: Goal = {
      id: Date.now().toString(),
      title: newGoalTitle,
      completed: false,
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    }
    
    setGoals([...goals, newGoal])
    setNewGoalTitle('')
    setShowAddGoal(false)
  }

  const toggleGoal = (id: string) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ))
  }

  const deleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id))
  }

  const completedCount = goals.filter(g => g.completed).length

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">🎯 Weekly Goals</h2>
        <button
          onClick={() => setShowAddGoal(!showAddGoal)}
          className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
        >
          + Add Goal
        </button>
      </div>

      {goals.length > 0 && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex justify-between text-sm mb-2">
            <span>Progress: {completedCount}/{goals.length}</span>
            <span>{goals.length > 0 ? Math.round((completedCount / goals.length) * 100) : 0}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${goals.length > 0 ? (completedCount / goals.length) * 100 : 0}%` }}
            />
          </div>
        </div>
      )}

      {showAddGoal && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <input
            type="text"
            value={newGoalTitle}
            onChange={(e) => setNewGoalTitle(e.target.value)}
            placeholder="Enter your goal..."
            className="w-full p-2 border border-gray-300 rounded-lg mb-2"
            onKeyPress={(e) => e.key === 'Enter' && addGoal()}
          />
          <div className="flex gap-2">
            <button
              onClick={addGoal}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
            >
              Add
            </button>
            <button
              onClick={() => setShowAddGoal(false)}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {goals.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No goals yet. Add your first goal!</p>
        ) : (
          goals.map(goal => (
            <div key={goal.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <input
                type="checkbox"
                checked={goal.completed}
                onChange={() => toggleGoal(goal.id)}
                className="w-5 h-5 cursor-pointer"
              />
              <span className={`flex-1 ${goal.completed ? 'line-through text-gray-500' : ''}`}>
                {goal.title}
              </span>
              <button
                onClick={() => deleteGoal(goal.id)}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

