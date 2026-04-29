import React, { useState, useRef, useEffect } from 'react'
import TopBar from '../components/TopBar'
import Footer from '../components/Footer'
import '../styles/Drawing.css'

export default function Drawing({ project, onUpdateProject, onGoHome }) {
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [tool, setTool] = useState('pen')
  const [color, setColor] = useState('#000000')
  const [size, setSize] = useState(3)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
  }, [])

  const handleMouseDown = (e) => {
    setIsDrawing(true)
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ctx = canvas.getContext('2d')
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const handleMouseMove = (e) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ctx = canvas.getContext('2d')

    if (tool === 'eraser') {
      ctx.clearRect(x - size / 2, y - size / 2, size, size)
    } else {
      ctx.strokeStyle = color
      ctx.lineWidth = size
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.lineTo(x, y)
      ctx.stroke()
    }
  }

  const handleMouseUp = () => {
    setIsDrawing(false)
    const canvas = canvasRef.current
    if (canvas && project) {
      onUpdateProject(project.id, { content: canvas.toDataURL() })
    }
  }

  const handleClear = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
  }

  return (
    <div className="drawing-page">
      {/* Top Bar */}
      <TopBar title={project?.name || 'Drawing'} onHome={onGoHome} />

      {/* Main Container */}
      <div className="drawing-container">
        {/* Left Sidebar */}
        <div className="sidebar sidebar-left">
          <div className="tools-panel">
            <h3>Tools</h3>
            <button
              className={`tool-btn ${tool === 'pen' ? 'active' : ''}`}
              onClick={() => setTool('pen')}
              title="Pen"
            >
              🖊️ Pen
            </button>
            <button
              className={`tool-btn ${tool === 'eraser' ? 'active' : ''}`}
              onClick={() => setTool('eraser')}
              title="Eraser"
            >
              🧹 Eraser
            </button>
            <button className="tool-btn clear-btn" onClick={handleClear}>
              🗑️ Clear
            </button>
          </div>

          <div className="color-panel">
            <label>Color</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="color-input"
            />
          </div>

          <div className="size-panel">
            <label>Size: {size}px</label>
            <input
              type="range"
              min="1"
              max="50"
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value))}
              className="size-slider"
            />
          </div>
        </div>

        {/* Canvas Area */}
        <div className="canvas-wrapper">
          <canvas
            ref={canvasRef}
            className="drawing-canvas"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
        </div>

        {/* Right Sidebar */}
        <div className="sidebar sidebar-right">
          <button className="export-btn">📤 Export</button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
