'use client'

import { useEffect, useState } from 'react'
import AppCard from '@/components/common/AppCard'
import EmptyState from '@/components/common/EmptyState'

interface Milestone {
  id: string
  title: string
  targetDate: string
  description: string
  completed: boolean
}

const STORAGE_KEY = 'obp.milestones'

export default function MilestoneRoadmap() {
  const [milestones, setMilestones] = useState<Milestone[]>([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [targetDate, setTargetDate] = useState('')

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setMilestones(JSON.parse(stored))
      }
    } catch (error) {
      console.warn('Unable to load milestones', error)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(milestones))
    } catch (error) {
      console.warn('Unable to save milestones', error)
    }
  }, [milestones])

  const addMilestone = () => {
    if (!title.trim() || !targetDate) return
    setMilestones((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: title.trim(),
        description: description.trim(),
        targetDate,
        completed: false,
      },
    ])
    setTitle('')
    setDescription('')
    setTargetDate('')
  }

  const toggleMilestone = (id: string) => {
    setMilestones((prev) => prev.map((milestone) => (milestone.id === id ? { ...milestone, completed: !milestone.completed } : milestone)))
  }

  const sorted = [...milestones].sort((a, b) => a.targetDate.localeCompare(b.targetDate))

  return (
    <AppCard title="Milestone Roadmap" subtitle="Plot OKRs and mark completions as you mint proofs." accent="blue">
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Ship v2 dashboard"
            className="rounded-lg border border-gray-200 bg-white p-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
          <input
            type="date"
            value={targetDate}
            onChange={(event) => setTargetDate(event.target.value)}
            className="rounded-lg border border-gray-200 bg-white p-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
          <input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="DAO voting, streak coach, multi-wallet"
            className="rounded-lg border border-gray-200 bg-white p-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={addMilestone}
            disabled={!title.trim() || !targetDate}
            className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            Add milestone
          </button>
        </div>

        {sorted.length === 0 ? (
          <EmptyState
            icon="🗺️"
            title="No milestones yet"
            description="Align weekly achievements to roadmap checkpoints."
            compact
          />
        ) : (
          <div className="space-y-3">
            {sorted.map((milestone) => (
              <div
                key={milestone.id}
                className={`rounded-2xl border p-4 ${milestone.completed ? 'border-green-200 bg-green-50' : 'border-gray-100 bg-gray-50'}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className={`text-sm font-semibold ${milestone.completed ? 'text-green-800 line-through' : 'text-gray-900'}`}>
                      {milestone.title}
                    </p>
                    <p className="text-xs text-gray-500">{milestone.description || '—'}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleMilestone(milestone.id)}
                    className="rounded-full border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-700 hover:border-green-300"
                  >
                    {milestone.completed ? 'Mark pending' : 'Mark done'}
                  </button>
                </div>
                <p className="mt-2 text-xs text-gray-400">
                  Target {new Date(milestone.targetDate).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppCard>
  )
}





