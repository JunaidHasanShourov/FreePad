import React from 'react'
import '../styles/TopBar.css'

export default function TopBar({ title, onHome }) {
  return (
    <div className="top-bar">
      <button className="home-btn" onClick={onHome}>🏠 Home</button>
      <h2 className="project-title">{title}</h2>
      <div className="spacer"></div>
    </div>
  )
}
