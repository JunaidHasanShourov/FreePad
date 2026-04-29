import React from 'react'
import '../styles/Header.css'

export default function Header() {
  const socialLinks = [
    { icon: '🐙', url: 'https://github.com/JunaidHasanShourov', title: 'GitHub' },
    { icon: '📱', url: 'https://instagram.com/JunaidHasanShourov', title: 'Instagram' },
    { icon: '👍', url: 'https://facebook.com/JunaidHasanShourov', title: 'Facebook' },
    { icon: '🐦', url: 'https://x.com/JHShourov', title: 'X (Twitter)' },
    { icon: '📺', url: 'https://youtube.com/@JunaidHasanShourov', title: 'YouTube' },
    { icon: '🎵', url: 'https://tiktok.com/@JunaidHasanShourov', title: 'TikTok' },
  ]

  return (
    <header className="app-header">
      <div className="header-container">
        {/* Left Section - Branding */}
        <div className="header-brand">
          <h1 className="brand-name">FreePad</h1>
        </div>

        {/* Center Section - Creator Info */}
        <div className="header-creator">
          <div className="creator-badge">
            <span className="creator-label">Created by</span>
            <span className="creator-name">Junaid Hasan Shourov</span>
            <span className="creator-org">Tech With Shourov</span>
          </div>
        </div>

        {/* Right Section - Social Links */}
        <div className="header-social">
          <div className="social-icons-bar">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-link"
                title={link.title}
                aria-label={`Visit ${link.title}`}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
