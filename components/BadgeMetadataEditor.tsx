'use client'

import { useState } from 'react'

interface Metadata {
  name: string
  description: string
  image: string
  attributes: { trait_type: string; value: string }[]
}

export default function BadgeMetadataEditor() {
  const [metadata, setMetadata] = useState<Metadata>({
    name: '',
    description: '',
    image: '',
    attributes: [],
  })

  const addAttribute = () => {
    setMetadata({
      ...metadata,
      attributes: [...metadata.attributes, { trait_type: '', value: '' }],
    })
  }

  const updateAttribute = (index: number, field: string, value: string) => {
    const newAttributes = [...metadata.attributes]
    newAttributes[index] = { ...newAttributes[index], [field]: value }
    setMetadata({ ...metadata, attributes: newAttributes })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">✏️ Edit Metadata</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            value={metadata.name}
            onChange={(e) => setMetadata({ ...metadata, name: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={metadata.description}
            onChange={(e) => setMetadata({ ...metadata, description: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Image URL</label>
          <input
            type="url"
            value={metadata.image}
            onChange={(e) => setMetadata({ ...metadata, image: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium">Attributes</label>
            <button
              onClick={addAttribute}
              className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
            >
              + Add
            </button>
          </div>
          {metadata.attributes.map((attr, index) => (
            <div key={index} className="grid grid-cols-2 gap-2 mb-2">
              <input
                type="text"
                value={attr.trait_type}
                onChange={(e) => updateAttribute(index, 'trait_type', e.target.value)}
                placeholder="Trait type"
                className="p-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                value={attr.value}
                onChange={(e) => updateAttribute(index, 'value', e.target.value)}
                placeholder="Value"
                className="p-2 border border-gray-300 rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
