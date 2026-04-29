# Security Policy

## Reporting Security Issues

If you discover a security vulnerability in FreePad, please email security@freepad.app instead of using the issue tracker.

**Please do not publicly disclose the vulnerability until it has been addressed.**

### What to Include
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if available)

## Security Considerations

### Data Privacy
- All data is processed locally in your browser
- No data is transmitted to external servers
- Projects are stored only in browser LocalStorage
- Users have full control over exports and backups

### Code Security
- No external scripts or tracking
- No analytics or telemetry
- Open source for transparency
- Regular dependency updates

### Browser Security
- Uses standard HTML5 APIs
- No dangerous APIs like eval()
- Content Security Policy recommendations

### Updates
- Security updates are released promptly
- Check CHANGELOG for security fixes
- Update to latest version regularly

## Best Practices

### For Users
1. Keep browser updated
2. Export important projects regularly
3. Be cautious with imported/untrusted files
4. Use strong passwords for backups

### For Developers
1. Validate all inputs
2. Use safe DOM methods
3. Keep dependencies updated
4. Test security-sensitive features
5. Report issues responsibly

## Supported Versions

| Version | Status |
|---------|--------|
| 1.0.x   | Supported |
| < 1.0   | Unsupported |

## Response Timeline

- **Initial Response**: 24-48 hours
- **Assessment**: 1 week
- **Fix & Release**: Within 2 weeks (or ASAP for critical issues)

Thank you for helping keep FreePad safe! 🔒
