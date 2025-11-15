'use client'

import { useState } from 'react'

interface Project {
  id: string
  title: string
  description: string
  link: string
  tags: string[]
}

export default function PortfolioShowcase() {
  const [projects, setProjects] = useState<Project[]>([])
  const [showAddProject, setShowAddProject] = useState(false)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">💼 Portfolio</h2>
        <button
          onClick={() => setShowAddProject(!showAddProject)}
          className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
        >
          + Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.length === 0 ? (
          <div className="col-span-2 text-center text-gray-500 py-8">
            No projects yet. Showcase your work!
          </div>
        ) : (
          projects.map((project) => (
            <div
              key={project.id}
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition"
            >
              <h3 className="font-bold text-lg mb-2">{project.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                View Project →
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
