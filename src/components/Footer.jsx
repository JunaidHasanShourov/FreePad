import React from 'react'
import '../styles/Footer.css'

export default function Footer() {
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/JunaidHasanShourov', icon: '🐙' },
    { name: 'Instagram', url: 'https://instagram.com/JunaidHasanShourov', icon: '📱' },
    { name: 'Facebook', url: 'https://facebook.com/JunaidHasanShourov', icon: '👍' },
    { name: 'X', url: 'https://x.com/JHShourov', icon: '🐦' },
    { name: 'YouTube', url: 'https://youtube.com/@JunaidHasanShourov', icon: '📺' },
    { name: 'TikTok', url: 'https://tiktok.com/@JunaidHasanShourov', icon: '🎵' },
  ]

  return (
    <footer className="app-footer">
      <div className="footer-container">
        {/* Creator Info */}
        <div className="footer-section creator-info">
          <h3>Created by</h3>
          <p className="creator-name">Junaid Hasan Shourov</p>
          <p className="creator-org">Tech With Shourov</p>
        </div>

        {/* Social Media Links */}
        <div className="footer-section social-media">
          <h3>Follow</h3>
          <div className="social-links">
            {socialLinks.map(link => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                title={link.name}
                aria-label={`Follow on ${link.name}`}
              >
                <span className="social-icon">{link.icon}</span>
                <span className="social-name">{link.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-section copyright">
          <p>FreePad © 2024 • Free for Everyone</p>
          <p>MIT License • Made with ❤️</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>Empowering creativity through free tools | Tech With Shourov</p>
      </div>
    </footer>
  )
}
