import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import Writing from './pages/Writing'
import Drawing from './pages/Drawing'
import './App.css'

export default function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [projects, setProjects] = useState([])
  const [currentProjectId, setCurrentProjectId] = useState(null)

  // Load projects from localStorage
  useEffect(() => {
    const savedProjects = localStorage.getItem('freepad-projects')
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects))
    }
  }, [])

  // Save projects to localStorage
  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem('freepad-projects', JSON.stringify(projects))
    }
  }, [projects])

  const createNewWritingProject = () => {
    const newProject = {
      id: Date.now().toString(),
      name: `Writing ${new Date().toLocaleDateString()}`,
      type: 'writing',
      content: '',
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
    }
    setProjects([newProject, ...projects])
    setCurrentProjectId(newProject.id)
    setCurrentPage('writing')
  }

  const createNewDrawingProject = () => {
    const newProject = {
      id: Date.now().toString(),
      name: `Drawing ${new Date().toLocaleDateString()}`,
      type: 'drawing',
      content: '',
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
    }
    setProjects([newProject, ...projects])
    setCurrentProjectId(newProject.id)
    setCurrentPage('drawing')
  }

  const createNewFreeWritingProject = () => {
    const newProject = {
      id: Date.now().toString(),
      name: `Free Writing ${new Date().toLocaleDateString()}`,
      type: 'freewriting',
      content: '',
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
    }
    setProjects([newProject, ...projects])
    setCurrentProjectId(newProject.id)
    setCurrentPage('writing')
  }

  const updateProject = (projectId, updates) => {
    setProjects(projects.map(p =>
      p.id === projectId
        ? { ...p, ...updates, modifiedAt: new Date().toISOString() }
        : p
    ))
  }

  const deleteProject = (projectId) => {
    setProjects(projects.filter(p => p.id !== projectId))
    if (currentProjectId === projectId) {
      setCurrentPage('home')
      setCurrentProjectId(null)
    }
  }

  const openProject = (projectId) => {
    const project = projects.find(p => p.id === projectId)
    if (project) {
      setCurrentProjectId(projectId)
      setCurrentPage(project.type === 'drawing' ? 'drawing' : 'writing')
    }
  }

  const handleGoHome = () => {
    setCurrentPage('home')
    setCurrentProjectId(null)
  }

  const currentProject = projects.find(p => p.id === currentProjectId)

  return (
    <div className="app">
      {/* Header with creator info */}
      <Header />

      {/* Page Content */}
      {currentPage === 'home' ? (
        <Home
          projects={projects}
          onCreateWriting={createNewWritingProject}
          onCreateDrawing={createNewDrawingProject}
          onCreateFreeWriting={createNewFreeWritingProject}
          onOpenProject={openProject}
          onDeleteProject={deleteProject}
        />
      ) : currentPage === 'writing' ? (
        <Writing
          project={currentProject}
          onUpdateProject={updateProject}
          onGoHome={handleGoHome}
        />
      ) : (
        <Drawing
          project={currentProject}
          onUpdateProject={updateProject}
          onGoHome={handleGoHome}
        />
      )}
    </div>
  )
}
