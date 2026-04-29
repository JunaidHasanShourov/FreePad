import React, { useState, useEffect } from 'react'
import TopBar from '../components/TopBar'
import SettingsPopup from '../components/SettingsPopup'
import ExportPanel from '../components/ExportPanel'
import Footer from '../components/Footer'
import '../styles/Writing.css'

export default function Writing({ project, onUpdateProject, onGoHome }) {
  const [content, setContent] = useState(project?.content || '')
  const [fontSize, setFontSize] = useState(16)
  const [fontFamily, setFontFamily] = useState('Arial')
  const [textColor, setTextColor] = useState('#000000')
  const [backgroundColor, setBackgroundColor] = useState('#ffffff')
  const [showSettings, setShowSettings] = useState(false)
  const [showExport, setShowExport] = useState(false)
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)

  useEffect(() => {
    if (project) {
      setContent(project.content || '')
    }
  }, [project])

  useEffect(() => {
    if (project) {
      const timer = setTimeout(() => {
        onUpdateProject(project.id, { content })
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [content, project, onUpdateProject])

  const handleContentChange = (e) => {
    setContent(e.target.value)
  }

  const textareaStyle = {
    fontFamily: fontFamily,
    fontSize: fontSize + 'px',
    color: textColor,
    backgroundColor: backgroundColor,
    fontWeight: isBold ? 'bold' : 'normal',
    fontStyle: isItalic ? 'italic' : 'normal',
    textDecoration: isUnderline ? 'underline' : 'none',
  }

  const formatSettings = [
    { label: 'Font Family', key: 'fontFamily', value: fontFamily, type: 'select', options: ['Arial', 'Times New Roman', 'Georgia', 'Courier New', 'Verdana'] },
    { label: 'Font Size', key: 'fontSize', value: fontSize, type: 'range', min: 8, max: 48 },
    { label: 'Text Color', key: 'textColor', value: textColor, type: 'color' },
    { label: 'Background Color', key: 'backgroundColor', value: backgroundColor, type: 'color' },
  ]

  const formatActions = [
    { label: 'Bold', key: 'bold', active: isBold },
    { label: 'Italic', key: 'italic', active: isItalic },
    { label: 'Underline', key: 'underline', active: isUnderline },
  ]

  return (
    <div className="writing-page">
      {/* Top Bar */}
      <TopBar title={project?.name || 'Writing'} onHome={onGoHome} />

      {/* Main Container */}
      <div className="writing-container">
        {/* Left Sidebar - Empty for now */}
        <div className="sidebar sidebar-left"></div>

        {/* Main Editor */}
        <div className="editor-area">
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder="Start writing here..."
            style={textareaStyle}
            spellCheck="true"
          />
        </div>

        {/* Right Sidebar */}
        <div className="sidebar sidebar-right">
          <button
            className="export-btn"
            onClick={() => setShowExport(true)}
            title="Export"
          >
            📤 Export
          </button>

          <button
            className="settings-btn"
            onClick={() => setShowSettings(true)}
            title="Settings"
          >
            ⚙️ Settings
          </button>
        </div>
      </div>

      {/* Settings Popup */}
      {showSettings && (
        <SettingsPopup
          title="Writing Settings"
          onClose={() => setShowSettings(false)}
          settings={formatSettings}
          onFontFamilyChange={setFontFamily}
          onFontSizeChange={setFontSize}
          onColorChange={setTextColor}
          onBgChange={setBackgroundColor}
          type="writing"
        />
      )}

      {/* Export Panel */}
      {showExport && (
        <ExportPanel
          project={project}
          content={content}
          onClose={() => setShowExport(false)}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  )
}
