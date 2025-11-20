'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'

export default function OnchainAchievementDataRoom() {
  const { isConnected } = useAccount()
  const [documents, setDocuments] = useState<string[]>([])
  const [uri, setUri] = useState('')

  const addDocument = () => {
    if (!uri.trim()) return
    setDocuments((prev) => [uri.trim(), ...prev])
    setUri('')
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📂 Onchain Data Room</h2>
      <p className="text-gray-600 mb-4">
        Curate proofs, dashboards, and external references alongside achievements.
      </p>
      <div className="flex gap-2 mb-4">
        <input
          disabled={!isConnected}
          className="flex-1 border rounded-lg p-2"
          placeholder="Enter IPFS / Arweave / HTTPS URI"
          value={uri}
          onChange={(e) => setUri(e.target.value)}
        />
        <button
          onClick={addDocument}
          disabled={!isConnected || !uri.trim()}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          Add
        </button>
      </div>
      <div className="space-y-3">
        {documents.map((doc, idx) => (
          <a
            key={idx}
            href={doc}
            target="_blank"
            rel="noreferrer"
            className="block border rounded-lg p-3 text-indigo-600 break-all"
          >
            {doc}
          </a>
        ))}
        {documents.length === 0 && (
          <p className="text-sm text-gray-500">No references added yet.</p>
        )}
      </div>
    </div>
  )
}
