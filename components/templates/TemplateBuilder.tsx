'use client'

import { useEffect, useMemo, useState } from 'react'
import AppCard from '@/components/common/AppCard'
import EmptyState from '@/components/common/EmptyState'

interface TemplateField {
  id: string
  label: string
  placeholder: string
}

interface AchievementTemplate {
  id: string
  name: string
  description: string
  fields: TemplateField[]
  createdAt: number
}

const STORAGE_KEY = 'obp.templates'

const defaultFields: TemplateField[] = [
  { id: 'what', label: 'What did you build?', placeholder: 'Shipped a deployment pipeline…' },
  { id: 'impact', label: 'Impact', placeholder: 'Reduced minting time by 40%' },
  { id: 'proof', label: 'Proof links', placeholder: 'https://basescan.org/tx/…' },
]

export default function TemplateBuilder() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [fields, setFields] = useState<TemplateField[]>(defaultFields)
  const [templates, setTemplates] = useState<AchievementTemplate[]>([])
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setTemplates(JSON.parse(stored))
      }
    } catch (error) {
      console.warn('Unable to load templates', error)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(templates))
    } catch (error) {
      console.warn('Unable to persist templates', error)
    }
  }, [templates])

  const selectedTemplate = useMemo(
    () => templates.find((template) => template.id === selectedTemplateId) ?? null,
    [templates, selectedTemplateId]
  )

  const addField = () => {
    setFields((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        label: `Custom Field ${prev.length + 1}`,
        placeholder: 'Describe this field…',
      },
    ])
  }

  const updateField = (id: string, patch: Partial<TemplateField>) => {
    setFields((prev) => prev.map((field) => (field.id === id ? { ...field, ...patch } : field)))
  }

  const removeField = (id: string) => {
    setFields((prev) => prev.filter((field) => field.id !== id))
  }

  const resetForm = () => {
    setName('')
    setDescription('')
    setFields(defaultFields)
    setSelectedTemplateId(null)
  }

  const saveTemplate = () => {
    if (!name.trim()) {
      return
    }

    const template: AchievementTemplate = {
      id: selectedTemplateId ?? crypto.randomUUID(),
      name: name.trim(),
      description: description.trim(),
      fields,
      createdAt: Date.now(),
    }

    setTemplates((prev) => {
      const exists = prev.some((item) => item.id === template.id)
      if (exists) {
        return prev.map((item) => (item.id === template.id ? template : item))
      }
      return [...prev, template]
    })

    resetForm()
  }

  const loadTemplate = (template: AchievementTemplate) => {
    setSelectedTemplateId(template.id)
    setName(template.name)
    setDescription(template.description)
    setFields(template.fields)
  }

  const deleteTemplate = (templateId: string) => {
    setTemplates((prev) => prev.filter((template) => template.id !== templateId))
    if (selectedTemplateId === templateId) {
      resetForm()
    }
  }

  return (
    <AppCard
      title="Adaptive Template Builder"
      subtitle="Compose reusable achievement blueprints with dynamic fields."
      accent="purple"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Template name</label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-200 bg-white p-2.5 text-sm focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-100"
              placeholder="Weekly deployment log"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={2}
              className="mt-1 w-full rounded-lg border border-gray-200 bg-white p-2.5 text-sm focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-100"
              placeholder="Used for Base deployments with metrics + proof links."
            />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-700">Fields</p>
              <button
                type="button"
                onClick={addField}
                className="text-sm font-medium text-purple-600 hover:text-purple-700"
              >
                + Add field
              </button>
            </div>
            {fields.map((field) => (
              <div key={field.id} className="rounded-xl border border-gray-100 bg-gray-50 p-3">
                <div className="flex items-center gap-2">
                  <input
                    value={field.label}
                    onChange={(event) => updateField(field.id, { label: event.target.value })}
                    className="flex-1 rounded-lg border border-transparent bg-white px-3 py-1 text-sm font-medium text-gray-800 focus:border-purple-300 focus:outline-none focus:ring-1 focus:ring-purple-100"
                  />
                  <button
                    type="button"
                    onClick={() => removeField(field.id)}
                    className="text-xs font-semibold text-gray-400 hover:text-red-500"
                  >
                    Remove
                  </button>
                </div>
                <input
                  value={field.placeholder}
                  onChange={(event) => updateField(field.id, { placeholder: event.target.value })}
                  className="mt-2 w-full rounded-lg border border-transparent bg-white px-3 py-1 text-xs text-gray-500 focus:border-purple-200 focus:outline-none focus:ring-1 focus:ring-purple-100"
                />
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={saveTemplate}
              disabled={!name.trim()}
              className="rounded-xl bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {selectedTemplate ? 'Update template' : 'Save template'}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:border-gray-300"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-semibold text-gray-700">Template Library</p>
          {templates.length === 0 ? (
            <EmptyState
              title="No templates yet"
              description="Save your first template to kickstart weekly proofs."
              icon="📄"
              action={<span className="text-sm text-gray-500">Use the builder to the left →</span>}
              compact
            />
          ) : (
            <div className="space-y-3">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className={`rounded-2xl border p-4 ${
                    selectedTemplateId === template.id ? 'border-purple-300 bg-purple-50' : 'border-gray-100 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{template.name}</p>
                      <p className="text-xs text-gray-500">{template.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => loadTemplate(template)}
                        className="text-xs font-medium text-purple-600 hover:text-purple-700"
                      >
                        Load
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteTemplate(template.id)}
                        className="text-xs font-medium text-gray-400 hover:text-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">{template.fields.length} fields</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppCard>
  )
}


