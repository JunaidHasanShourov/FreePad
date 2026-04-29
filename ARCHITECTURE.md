# FreePad - Development & Architecture Guide

## Overview

FreePad is a lightweight, client-side web application built with React and Vite. It provides a distraction-free environment for writing and drawing.

## Architecture

### Technology Stack

- **Frontend**: React 18 (UI components)
- **Build Tool**: Vite 4 (Fast build and dev server)
- **Styling**: CSS with CSS variables
- **Storage**: Browser LocalStorage API
- **Exports**: html2canvas, jsPDF, jszip

### Application Structure

```
FreePad
├── Pages (Full screen views)
│   ├── Home        (Dashboard with projects)
│   ├── Writing     (Text editor)
│   └── Drawing     (Canvas drawing)
├── Components (Reusable UI elements)
│   ├── TopBar      (Navigation)
│   ├── SettingsPopup
│   ├── ExportPanel
│   └── DrawingToolbar
└── Styles (CSS)
```

## Data Flow

### State Management

FreePad uses React's built-in state management:

1. **App.jsx** - Global state (projects, current page)
2. **Page components** - Page-specific state (content, formatting)
3. **LocalStorage** - Persistence layer

### Project Structure

Each project contains:
```javascript
{
  id: String,                    // Unique identifier
  name: String,                  // User-friendly name
  type: 'writing'|'drawing'|'freewriting',
  content: String,               // Text or canvas data
  createdAt: ISO String,        // Creation timestamp
  modifiedAt: ISO String,       // Last modification timestamp
}
```

## Feature Implementation

### Writing Editor
- Uses `<textarea>` for text input
- Styling applied via inline styles
- Auto-save every 500ms
- Multi-page support with page switching

### Drawing Canvas
- Uses HTML5 Canvas API
- Mouse tracking for smooth drawing
- Per-page canvas state management
- Supports pen and eraser tools

### Export System
- **PDF**: jsPDF library for document generation
- **PNG**: Canvas toDataURL() conversion
- **HTML**: Template generation with metadata
- **JSON**: Project metadata serialization
- **TXT**: Plain text extraction

## Performance Considerations

### Bundle Size
- React 18: ~40KB gzipped
- Vite: ~5KB runtime
- html2canvas: ~20KB
- jsPDF: ~30KB
- Total: ~120KB gzipped

### Optimization Techniques
1. **Lazy loading**: Code-splitting for pages
2. **CSS variables**: Reduced CSS size
3. **Minimal dependencies**: Only essential packages
4. **LocalStorage**: No network requests needed

### Rendering Performance
- Canvas drawing optimized with requestAnimationFrame
- Text rendering uses browser's native implementation
- Efficient re-renders with React hooks
- Debounced auto-save

## Development Workflow

### Setting Up Development Environment

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Code Style

#### React Components
- Use functional components with hooks
- One component per file
- Props validation through naming
- Clear event handler naming (onXxx)

Example:
```javascript
export default function MyComponent({ prop1, prop2, onAction }) {
  const [state, setState] = useState(null)
  
  const handleClick = () => {
    onAction()
  }
  
  return <div onClick={handleClick}>{state}</div>
}
```

#### CSS Organization
- One CSS file per component
- Use CSS variables for theming
- Mobile-first responsive design
- BEM-like class naming

```css
.component-name {
  /* Component styles */
}

.component-name.modifier {
  /* Variant styles */
}

.component-name-child {
  /* Child element styles */
}
```

#### File Organization
- Keep related files together
- Clear, descriptive names
- Logical folder structure
- One component per file

## Adding New Features

### 1. New Writing Format

In `Writing.jsx`:
```javascript
const [newFormat, setNewFormat] = useState(false)

// Add to textarea style
fontSize: fontSize,
fontWeight: newFormat ? 'bold' : 'normal',
```

### 2. New Drawing Tool

In `Drawing.jsx`:
```javascript
const [tool, setTool] = useState('newTool')

const handleMouseMove = (e) => {
  if (tool === 'newTool') {
    // Draw with new tool
  }
}
```

### 3. New Export Format

In `ExportPanel.jsx`:
```javascript
const handleExportNewFormat = () => {
  // Implementation
  const data = processData()
  downloadFile(data, 'format')
}
```

## Debugging

### Browser DevTools
- React DevTools extension
- LocalStorage inspection
- Network tab (should be empty)
- Console for errors

### Common Issues

**Drawing not appearing**
- Check canvas context
- Verify mouse event coordinates
- Ensure clearRect not called too often

**Text formatting not applying**
- Verify inline styles are correct
- Check CSS variable values
- Inspect computed styles in DevTools

**Export failing**
- Check console for errors
- Verify canvas state
- Ensure content is not null

## Testing

### Manual Testing Checklist
- [ ] Create writing project
- [ ] Add formatting
- [ ] Create drawing
- [ ] Switch pages
- [ ] Export all formats
- [ ] Reload page (verify save)
- [ ] Delete project
- [ ] Search projects

### Browser Testing
- Chrome/Edge (Chromium)
- Firefox
- Safari
- Mobile Safari
- Chrome Mobile

## Performance Profiling

Use React DevTools Profiler:
1. Open DevTools
2. Go to Profiler tab
3. Record interaction
4. Analyze flame graph
5. Identify bottlenecks

```javascript
// Add performance marks
performance.mark('feature-start')
// ... feature code
performance.mark('feature-end')
performance.measure('feature', 'feature-start', 'feature-end')
```

## Security Considerations

1. **XSS Prevention**
   - Use textContent instead of innerHTML
   - React auto-escapes by default
   - Sanitize user input for exports

2. **Data Privacy**
   - All data stays in browser
   - No external requests (except CDN)
   - Users control export/backup

3. **Performance**
   - Monitor bundle size growth
   - Regular dependency updates
   - Keep dev dependencies separate

## Future Improvements

### Short Term
- Undo/Redo functionality
- More drawing tools
- Text layers on drawings
- Project favorites

### Medium Term
- Dark mode
- Collaborative editing
- Cloud backup (optional)
- Mobile app

### Long Term
- Desktop app (Electron)
- Plugin system
- Template library
- Advanced formatting

## Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [MDN Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [HTML5 Specification](https://html.spec.whatwg.org/)

## Getting Help

- Check existing issues
- Read documentation thoroughly
- Test in isolation
- Share minimal reproduction
- Include browser/OS information
