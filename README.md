# Jon Spirit - Music Artist Website

A modern, responsive website for music artist Jon Spirit with admin-protected content management.

## 🚀 Features

- **Coming Soon Page** - Public landing page
- **Main Website** - Protected content (admin access only)
- **Admin Dashboard** - Content management system
- **Spotify Integration** - Live music data
- **Event Management** - Add/edit upcoming shows
- **Responsive Design** - Mobile-first approach

## 🛠 Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: TailwindCSS
- **Authentication**: JWT with HTTP-only cookies
- **Database**: JSON file-based (can be upgraded to database)
- **Deployment**: Vercel/Netlify ready

## 📁 Project Structure

```
my-app/
├── app/                    # Next.js app directory
│   ├── coming-soon/       # Public coming-soon page
│   ├── studio-portal-2024/ # Admin dashboard
│   ├── api/               # API routes
│   └── page.tsx           # Main website (protected)
├── components/            # Reusable UI components
├── lib/                   # Utility functions
├── data/                  # Site content (JSON)
└── public/                # Static assets
```

## 🔐 Environment Variables

Required for production:

```bash
ADMIN_PASSWORD=your-secure-admin-password
JWT_SECRET=your-super-secure-jwt-secret-key

# Optional: Spotify API
SPOTIFY_CLIENT_ID=your-spotify-client-id
SPOTIFY_CLIENT_SECRET=your-spotify-client-secret
```

## 🚀 Quick Start

1. **Install dependencies**:
   ```bash
   cd my-app
   npm install
   ```

2. **Set environment variables**:
   Create `.env.local` file with required variables

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Access the app**:
   - Coming-soon: `http://localhost:3000/coming-soon`
   - Admin login: `http://localhost:3000/studio-portal-2024/login`
   - Main website: `http://localhost:3000/` (requires login)

## 🎯 Production Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Netlify
1. Push to GitHub
2. Connect repository to Netlify
3. Set environment variables in Netlify dashboard
4. Build command: `npm run build`
5. Publish directory: `.next`

## 🔒 Security Features

- JWT authentication with 24-hour expiration
- HTTP-only cookies for secure token storage
- Rate limiting on login attempts
- Middleware protection on all routes
- Automatic redirects for unauthorized users

## 📱 Admin Access

1. Visit 'your url'
2. Enter admin password
3. Access dashboard to manage content
4. Click "View Website" to see main site

## 🎵 Content Management

Admins can manage:
- Hero section content
- About section
- Events/shows
- Social media links
- Sponsor information

## 📄 License

Private project for Jon Spirit. 
