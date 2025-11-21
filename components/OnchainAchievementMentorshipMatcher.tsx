'use client'

import { useState } from 'react'

export default function OnchainAchievementMentorshipMatcher() {
  const [skills, setSkills] = useState('solidity, governance')
  const [pairing, setPairing] = useState<string | null>(null)

  const mentors = [
    { name: '0xMentorA', focus: 'solidity' },
    { name: '0xMentorB', focus: 'design' },
    { name: '0xMentorC', focus: 'governance' },
  ]

  const findMentor = () => {
    const tokens = skills.split(',').map((s) => s.trim().toLowerCase())
    const match = mentors.find((mentor) => tokens.some((token) => mentor.focus.includes(token)))
    setPairing(match ? match.name : 'No mentor found')
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">🤝 Mentorship Matcher</h2>
      <textarea
        className="w-full border rounded-lg p-3 mb-4"
        rows={3}
        placeholder="Desired skills"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
      />
      <button
        onClick={findMentor}
        className="w-full bg-indigo-600 text-white rounded-lg py-2 hover:bg-indigo-700"
      >
        Find Mentor
      </button>
      {pairing && <p className="mt-4 text-gray-700">Suggested mentor: {pairing}</p>}
    </div>
  )
}
