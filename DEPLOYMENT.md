# FreePad Deployment Guide

## Quick Start

FreePad is a static web application that can be deployed to any hosting service.

## Deployment Options

### 1. Vercel (Recommended)

**Benefits**: Free tier, automatic deployments, CDN, serverless functions

```bash
npm install -g vercel
vercel
```

**Configuration** (vercel.json):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

### 2. Netlify

**Benefits**: Free tier, CI/CD, automatic deployments

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

**Or connect GitHub directly**:
1. Go to netlify.com
2. Click "New site from Git"
3. Connect your repository
4. Set build command to `npm run build`
5. Set publish directory to `dist`

### 3. GitHub Pages

Perfect for free hosting on your GitHub account.

```bash
# In vite.config.js, update base:
# base: '/freepad/' (replace 'freepad' with your repo name)

npm run build
```

Then enable GitHub Pages in repository settings and select `gh-pages` branch.

### 4. Self-Hosted

#### Docker

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "3000"]
```

Build and run:
```bash
docker build -t freepad .
docker run -p 3000:3000 freepad
```

#### Traditional Server (Nginx)

```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /var/www/freepad;
    index index.html;

    location / {
        try_files $uri /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### 5. Firebase Hosting

```bash
npm install -g firebase-tools
firebase init hosting
npm run build
firebase deploy
```

## Environment Variables

FreePad doesn't require environment variables, but you can add optional configuration:

```env
# Optional: API endpoint for future features
VITE_API_URL=https://api.example.com
VITE_APP_ENV=production
```

## Performance Optimization

### Pre-deployment checklist

1. **Build optimization**
   ```bash
   npm run build
   # Check bundle size
   npm install -g serve
   serve -s dist -l 3000
   ```

2. **Test performance**
   - Use Lighthouse in Chrome DevTools
   - Target: 90+ score

3. **SEO Optimization**
   ```html
   <!-- Update index.html meta tags -->
   <meta name="description" content="FreePad - Free Writing & Drawing Web App">
   <meta name="keywords" content="writing, drawing, free, web app">
   <meta property="og:title" content="FreePad">
   <meta property="og:description" content="Free Writing & Drawing for Everyone">
   ```

4. **Security Headers** (Netlify/Vercel netlify.toml or vercel.json)
   ```toml
   [[headers]]
   for = "/*"
   [headers.values]
   X-Content-Type-Options = "nosniff"
   X-Frame-Options = "DENY"
   X-XSS-Protection = "1; mode=block"
   ```

## Monitoring

### Analytics
- Add Google Analytics or similar
- Track user engagement
- Monitor errors

### Error Tracking
- Sentry for error monitoring
- Rollbar for exception tracking

## Scaling

FreePad is a static site, so:
- Can handle unlimited concurrent users
- CDN distribution reduces latency
- Costs don't increase with traffic
- Excellent scalability without changes

## Backup & Updates

1. **Regular backups**
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

2. **Release process**
   - Create GitHub release
   - Tag commits with versions
   - Document changes in CHANGELOG.md

3. **Update process**
   - Pull latest code
   - Run `npm run build`
   - Deploy to hosting

## Troubleshooting

### Build fails
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Page not found errors
Ensure your hosting supports SPA routing (rewrite all routes to index.html)

### Slow performance
- Check bundle size
- Enable gzip compression
- Use CDN
- Optimize images
- Cache static assets

## DNS & Domain

1. Purchase domain (Namecheap, GoDaddy, etc.)
2. Point to hosting provider's nameservers
3. Wait for propagation (5-48 hours)
4. Set up SSL certificate (automatic on most platforms)

## Continuous Integration/Deployment

### GitHub Actions Example

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/
```

## Support

For deployment issues:
- Check hosting provider documentation
- Review build logs
- Test locally with `npm run preview`
- Open GitHub issue for help
