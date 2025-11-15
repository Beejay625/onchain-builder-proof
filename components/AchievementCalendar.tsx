'use client'

import { useState } from 'react'

interface CalendarEvent {
  date: string
  achievementId: string
  title: string
}

export default function AchievementCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">📅 Calendar</h2>
      
      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-xs font-semibold text-gray-600 p-2">
            {day}
          </div>
        ))}
      </div>

      <div className="text-center text-gray-500 py-8">
        Calendar view coming soon
      </div>

      {selectedDate && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="text-sm font-semibold mb-2">Achievements on {selectedDate}</div>
          {events.filter(e => e.date === selectedDate).map((event) => (
            <div key={event.achievementId} className="text-xs text-gray-600">
              {event.title}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
