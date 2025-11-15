'use client'

interface Template {
  id: string
  title: string
  content: string
  category: string
}

interface AchievementTemplatesProps {
  onSelectTemplate: (content: string) => void
}

export default function AchievementTemplates({ onSelectTemplate }: AchievementTemplatesProps) {
  const templates: Template[] = [
    { id: '1', title: 'Completed Feature', content: 'Completed implementing [feature name] with [tech stack]. Key achievements: [details]', category: 'Development' },
    { id: '2', title: 'Shipped Product', content: 'Launched [product name] to production. Deployed on [platform]. Users: [count]', category: 'Deployment' },
    { id: '3', title: 'Learning Milestone', content: 'Completed [course/tutorial name]. Learned about [key concepts]. Built [project]', category: 'Learning' },
    { id: '4', title: 'Design Completed', content: 'Finished design for [project]. Created [number] mockups using [tools]', category: 'Design' },
    { id: '5', title: 'Community Contribution', content: 'Contributed to [project name]. Added [feature/fix]. PR merged: [link]', category: 'Community' },
    { id: '6', title: 'Content Published', content: 'Published article/video about [topic]. Reached [audience size]. Link: [url]', category: 'Content' },
  ]

  return (
    <div className="mb-4">
      <details className="cursor-pointer">
        <summary className="text-sm font-medium text-blue-600 hover:text-blue-700 mb-2">
          💡 Use a template
        </summary>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => onSelectTemplate(template.content)}
              className="text-left p-3 bg-gray-50 hover:bg-blue-50 rounded border border-gray-200 hover:border-blue-300 transition"
            >
              <div className="font-semibold text-sm">{template.title}</div>
              <div className="text-xs text-gray-500 mt-1">{template.category}</div>
            </button>
          ))}
        </div>
      </details>
    </div>
  )
}
