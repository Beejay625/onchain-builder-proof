'use client'

import { useState } from 'react'

interface Reminder {
  id: string
  title: string
  description: string
  scheduledTime: number
  recurring: boolean
}

export default function AchievementReminder() {
  const [reminders, setReminders] = useState<Reminder[]>([])

  const deleteReminder = (id: string) => {
    setReminders(reminders.filter(r => r.id !== id))
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">⏰ Reminders</h2>
      
      <div className="space-y-3">
        {reminders.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No reminders set</p>
        ) : (
          reminders.map((reminder) => (
            <div key={reminder.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="font-semibold text-sm mb-1">{reminder.title}</div>
                <div className="text-xs text-gray-600">{reminder.description}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(reminder.scheduledTime).toLocaleString()}
                  {reminder.recurring && ' (Recurring)'}
                </div>
              </div>
              <button
                onClick={() => deleteReminder(reminder.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
