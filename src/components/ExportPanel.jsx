import React from 'react'
import '../styles/ExportPanel.css'

export default function ExportPanel({ project, content, canvas, onClose, isDrawing }) {
  const handleExportPDF = () => {
    if (isDrawing && canvas) {
      const link = document.createElement('a')
      link.href = canvas.toDataURL()
      link.download = `${project?.name || 'drawing'}.png`
      link.click()
    } else {
      const element = document.createElement('a')
      const file = new Blob([content], { type: 'text/plain' })
      element.href = URL.createObjectURL(file)
      element.download = `${project?.name || 'document'}.txt`
      element.click()
    }
  }

  const handleExportJSON = () => {
    const data = {
      project: project?.name,
      type: project?.type,
      content: isDrawing ? canvas?.toDataURL() : content,
      createdAt: project?.createdAt,
    }
    const element = document.createElement('a')
    const file = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    element.href = URL.createObjectURL(file)
    element.download = `${project?.name || 'project'}.json`
    element.click()
  }

  return (
    <div className="export-overlay" onClick={onClose}>
      <div className="export-panel" onClick={(e) => e.stopPropagation()}>
        <div className="export-header">
          <h2>Export Project</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="export-options">
          <button className="export-option" onClick={handleExportPDF}>
            📥 Download
          </button>
          <button className="export-option" onClick={handleExportJSON}>
            💾 Save as JSON
          </button>
        </div>
      </div>
    </div>
  )
}
