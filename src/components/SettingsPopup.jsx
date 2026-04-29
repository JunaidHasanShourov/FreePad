import React from 'react'
import '../styles/SettingsPopup.css'

export default function SettingsPopup({
  title,
  onClose,
  settings,
  onFontFamilyChange,
  onFontSizeChange,
  onColorChange,
  onBgChange,
  type
}) {
  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-popup" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <h2>{title}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="settings-content">
          {settings.map((setting) => (
            <div key={setting.key} className="setting-group">
              <label>{setting.label}</label>
              {setting.type === 'select' && (
                <select
                  value={setting.value}
                  onChange={(e) => {
                    if (setting.key === 'fontFamily') onFontFamilyChange(e.target.value)
                  }}
                >
                  {setting.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}
              {setting.type === 'range' && (
                <input
                  type="range"
                  min={setting.min}
                  max={setting.max}
                  value={setting.value}
                  onChange={(e) => {
                    if (setting.key === 'fontSize') onFontSizeChange(parseInt(e.target.value))
                  }}
                />
              )}
              {setting.type === 'color' && (
                <input
                  type="color"
                  value={setting.value}
                  onChange={(e) => {
                    if (setting.key === 'textColor') onColorChange(e.target.value)
                    if (setting.key === 'backgroundColor') onBgChange(e.target.value)
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
