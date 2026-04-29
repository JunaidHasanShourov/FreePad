import React, { useState } from 'react'
import Footer from '../components/Footer'
import '../styles/Home.css'

export default function Home({
  projects,
  onCreateWriting,
  onCreateDrawing,
  onCreateFreeWriting,
  onOpenProject,
  onDeleteProject
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || project.type === filterType
    return matchesSearch && matchesType
  })

  const recentProjects = filteredProjects.slice(0, 6)
  const historicalProjects = filteredProjects.slice(6)

  return (
    <div className="home">
      {/* Header */}
      <header className="home-header">
        <div className="container flex-between">
          <div className="logo-section">
            <h1 className="logo">FreePad</h1>
            <p className="tagline">Free Writing & Drawing for Everyone</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="home-main">
        <div className="container">
          {/* Quick Actions */}
          <section className="quick-actions">
            <h2>Quick Start</h2>
            <div className="actions-grid">
              <button className="action-btn action-writing" onClick={onCreateWriting}>
                <span className="icon">✏️</span>
                <span>New Writing</span>
              </button>
              <button className="action-btn action-drawing" onClick={onCreateDrawing}>
                <span className="icon">🎨</span>
                <span>New Drawing</span>
              </button>
              <button className="action-btn action-free" onClick={onCreateFreeWriting}>
                <span className="icon">📝</span>
                <span>Free Writing</span>
              </button>
            </div>
          </section>

          {/* Search and Filter */}
          <section className="search-filter">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <div className="filter-buttons">
              <button
                className={`filter-btn ${filterType === 'all' ? 'active' : ''}`}
                onClick={() => setFilterType('all')}
              >
                All
              </button>
              <button
                className={`filter-btn ${filterType === 'writing' ? 'active' : ''}`}
                onClick={() => setFilterType('writing')}
              >
                Writing
              </button>
              <button
                className={`filter-btn ${filterType === 'drawing' ? 'active' : ''}`}
                onClick={() => setFilterType('drawing')}
              >
                Drawing
              </button>
              <button
                className={`filter-btn ${filterType === 'freewriting' ? 'active' : ''}`}
                onClick={() => setFilterType('freewriting')}
              >
                Free Writing
              </button>
            </div>
          </section>

          {/* Recent Projects */}
          {recentProjects.length > 0 && (
            <section className="projects-section">
              <h2>Recent Projects</h2>
              <div className="projects-grid">
                {recentProjects.map(project => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onOpen={() => onOpenProject(project.id)}
                    onDelete={() => onDeleteProject(project.id)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Historical Projects */}
          {historicalProjects.length > 0 && (
            <section className="projects-section">
              <h2>History</h2>
              <div className="projects-grid">
                {historicalProjects.map(project => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onOpen={() => onOpenProject(project.id)}
                    onDelete={() => onDeleteProject(project.id)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <h3>No projects found</h3>
              <p>Start creating your first project by clicking one of the quick start buttons above</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="home-footer">
        <p>FreePad © 2024 • Free for Everyone • MIT License</p>
      </footer>

      {/* Creator Footer */}
      <Footer />
    </div>
  )
}

function ProjectCard({ project, onOpen, onDelete }) {
  const typeIcon = {
    writing: '✏️',
    drawing: '🎨',
    freewriting: '📝'
  }

  const formattedDate = new Date(project.modifiedAt).toLocaleDateString()
  const preview = project.content.substring(0, 50) + (project.content.length > 50 ? '...' : '')

  return (
    <div className="project-card">
      <div className="card-header">
        <span className="type-icon">{typeIcon[project.type]}</span>
        <button className="delete-btn" onClick={onDelete} title="Delete">×</button>
      </div>
      <h3 onClick={onOpen}>{project.name}</h3>
      <p className="preview">{preview || 'Empty project'}</p>
      <div className="card-footer">
        <span className="date">{formattedDate}</span>
        <button className="btn-primary" onClick={onOpen}>Open</button>
      </div>
    </div>
  )
}
