# Riyank Mukhopadhyay - Portfolio Website

A modern, high-performance portfolio website featuring Apple-style scroll animations, RAG-based content, and cutting-edge web technologies.

## 🚀 Features

### Design & UX
- **Apple-inspired immersive scroll experience** with parallax effects
- **Frame-by-frame scroll animations** using canvas for 60fps performance
- **Glass morphism & neumorphism** UI elements
- **Dark/Light theme** with system preference detection
- **Fully responsive** mobile-first design
- **WCAG AA compliant** accessibility

### Technical Highlights
- ⚡ **Next.js 14** with static export for GitHub Pages
- 🎨 **Tailwind CSS** for utility-first styling
- 🎬 **Framer Motion** for smooth, physics-based animations
- 📊 **IntersectionObserver** for on-scroll triggers
- 🖼️ **Canvas-based frame animations** for optimal performance
- 📱 **Progressive enhancement** with reduced-motion support

### Performance
- **< 250KB gzipped** JavaScript bundle
- **Lazy loading** for images and heavy sections
- **WebP/AVIF** image formats with fallbacks
- **Code splitting** for optimal load times
- **Static site generation** for instant page loads

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata & SEO
│   │   ├── page.tsx             # Home page
│   │   └── globals.css          # Global styles & CSS variables
│   ├── components/
│   │   ├── Hero.tsx             # Hero section with scroll animations
│   │   ├── ScrollFrame.tsx      # Frame-by-frame animation controller
│   │   ├── StickyPanel.tsx      # Sticky storytelling panels
│   │   ├── ProjectOverlay.tsx   # Project detail modal
│   │   ├── Icon.tsx             # SVG icon components
│   │   ├── Navigation.tsx       # Responsive navigation
│   │   ├── ThemeProvider.tsx    # Dark/light theme context
│   │   ├── Footer.tsx           # Footer component
│   │   ├── sections/
│   │   │   ├── About.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── Projects.tsx
│   │   │   └── Contact.tsx
│   │   └── __tests__/           # Component tests
│   └── data/
│       └── resume.json          # Single source of truth for content
├── public/
│   ├── frames/                  # Scroll animation frames (generated)
│   └── resume.pdf               # Generated PDF resume
├── scripts/
│   ├── generate-resume-pdf.js   # PDF generation script
│   └── preload-frames.js        # Frame generation utility
├── package.json
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- Git

### Quick Start

```bash
# Clone the repository
git clone https://github.com/Riyank7/Riyank7.github.io.git
cd Riyank7.github.io

# Install dependencies
npm install

# Generate placeholder frames (optional for development)
npm run preload-frames

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Analytics through Google Tag Manager

The live portfolio is https://riyank7.github.io and its web container is `GTM-58F4DV37` in the personal Google account.

The GitHub Actions repository variable `NEXT_PUBLIC_GTM_ID` supplies the container ID at build time. For local testing, copy `.env.example` to `.env.local` and set that value. Rebuild after changing it. GA4 is configured as a Google tag inside GTM; do not add a second direct Analytics snippet.

The privacy banner blocks GTM until visitors opt in. “Analytics only” grants analytics storage while denying advertising storage, advertising user data and ad personalization. “Allow analytics and demographics” grants those additional permissions for Google Signals. “Reject optional” keeps Google tags blocked. Choices expire after 180 days and can be changed using Privacy settings. There is no unconditional noscript iframe because it would bypass this consent gate. The privacy notice is at `/privacy/`.

For age, gender and interests, enable Google Signals in the portfolio GA4 property under Admin → Data collection and modification → Data collection. Reports contain aggregated information for eligible consenting users; low traffic may be withheld by Google’s privacy thresholds. Location and language reporting are also available. Never send contact form content or personal identifiers to Analytics.

Verify production using GTM Preview / Tag Assistant, then check GA4 Realtime and Reports → User attributes → Demographic details. Before consent or after rejecting, no Google measurement script should load. After opting in, the Google tag should fire once. In Tag Assistant, verify the four consent flags for both opt-in options. Other GTM tags added later must respect these choices as well.

## 📝 Customizing Content

### Update Your Resume Data

All content comes from a single JSON file: `data/resume.json`

```json
{
  "name": "Your Name",
  "title": "Your Title",
  "tagline": "Your tagline",
  "email": "your@email.com",
  "github": "yourusername",
  "linkedin": "yourprofile",
  "skills": [...],
  "experience": [...],
  "projects": [...],
  "education": [...]
}
```

The entire site auto-generates from this data:
- **Hero section**: name, title, tagline
- **Skills section**: skills array with categories
- **Experience section**: experience timeline
- **Projects section**: project cards and overlays
- **Contact section**: social links

### Adding Projects

```json
{
  "id": "unique-id",
  "title": "Project Title",
  "subtitle": "Organization",
  "description": "Short description",
  "challenge": "Problem statement",
  "solution": "How you solved it",
  "tech": ["Python", "AWS", "Docker"],
  "highlights": [
    "Achievement 1",
    "Achievement 2"
  ],
  "start": "Month Year",
  "end": "Month Year",
  "live": "https://...",
  "repo": "https://github.com/..."
}
```

## 🎬 Frame Animation Setup

### Option 1: Use Placeholder Frames (Development)

```bash
npm run preload-frames
```

This generates 60 gradient frames for testing.

### Option 2: Extract Frames from Video (Production)

If you have a video file (e.g., `hero-animation.mp4`):

```bash
# Install FFmpeg (if not already installed)
# macOS: brew install ffmpeg
# Ubuntu: sudo apt install ffmpeg

# Extract 60 frames at 1920x1080
ffmpeg -i hero-animation.mp4 \
  -vf "fps=30,scale=1920:1080" \
  -q:v 2 \
  public/frames/frame-%04d.webp
```

### Option 3: Design Custom Frames

Create 60 design frames in Figma/Sketch and export as WebP:
- Resolution: 1920×1080 (or your preferred aspect ratio)
- Format: WebP (85% quality) or AVIF
- Naming: `frame-0001.webp`, `frame-0002.webp`, ..., `frame-0060.webp`
- Location: `public/frames/`

## 🔨 Build & Deploy

### Build for Production

```bash
# Create optimized static build
npm run build

# Test production build locally
npm start
```

Output will be in the `out/` directory.

### Deploy to GitHub Pages

```bash
# Build the site
npm run build

# The out/ folder contains your static site
# Push to gh-pages branch

git add out
git commit -m "Deploy to GitHub Pages"
git subtree push --prefix out origin gh-pages
```

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

#### Vercel Environment Variables (Optional)

For contact form functionality, add these in Vercel dashboard:
- `FORMSPREE_ENDPOINT` - Your Formspree form endpoint
- Or integrate with Vercel serverless functions

### Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy

# Production deploy
netlify deploy --prod
```

## 📄 Generate Resume PDF

```bash
# Start development server
npm run dev

# In another terminal, generate PDF
npm run generate-pdf
```

The PDF will be saved to `public/resume.pdf`.

**For production PDF generation:**
1. Build and serve the site: `npm run build && npm start`
2. Update script URL to production: Edit `scripts/generate-resume-pdf.js`
3. Run: `npm run generate-pdf`

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test

# Run tests with coverage
npm run test:ci
```

### Test Coverage

- `ProjectCard.test.tsx` - Tests project rendering and interactions
- `ScrollFrame.test.tsx` - Tests scroll animation math and performance

## ♿ Accessibility

### WCAG AA Compliance
- ✅ Semantic HTML5 elements
- ✅ ARIA attributes for interactive components
- ✅ Keyboard navigation support
- ✅ Focus management for modals
- ✅ Color contrast ratios > 4.5:1
- ✅ Reduced motion support via `prefers-reduced-motion`

### Accessibility Testing

```bash
# Run Lighthouse audit
npx lighthouse http://localhost:3000 --view

# Check for common issues
npx axe http://localhost:3000
```

## 🎨 Theming

### Color Customization

Edit CSS variables in `src/app/globals.css`:

```css
:root {
  --color-accent: #6366f1;        /* Primary accent */
  --color-accent-light: #818cf8;
  --color-accent-dark: #4f46e5;
}
```

### Font Customization

Update font in `src/app/layout.tsx`:

```tsx
import { YourFont } from 'next/font/google'

const yourFont = YourFont({ subsets: ['latin'] })
```

## 🐛 Troubleshooting

### Frames not loading
- Check `public/frames/` directory exists
- Run `npm run preload-frames`
- Verify frame naming: `frame-0001.webp` to `frame-0060.webp`

### PDF generation fails
- Ensure dev server is running: `npm run dev`
- Check Puppeteer installation: `npm ls puppeteer`
- Try headful mode for debugging (edit script)

### Build errors
```bash
# Clear cache and rebuild
rm -rf .next out node_modules
npm install
npm run build
```

### Theme not persisting
- Check browser localStorage permissions
- Clear localStorage: `localStorage.clear()`

## 📊 Performance Optimization

### Lighthouse Scores (Target)
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

### Bundle Size Optimization

```bash
# Analyze bundle
npm run build
# Check .next/build-manifest.json

# To reduce bundle:
# 1. Code split heavy sections
# 2. Lazy load components
# 3. Use dynamic imports
# 4. Optimize images
```

### Image Optimization

```bash
# Install sharp for Next.js optimization
npm install sharp

# Images in public/ are automatically optimized
# For custom optimization:
npx @squoosh/cli --webp public/image.png
```

## 🔧 Advanced Customization

### Add New Sections

1. Create component in `src/components/sections/YourSection.tsx`
2. Import in `src/app/page.tsx`
3. Add to navigation in `src/components/Navigation.tsx`
4. Update resume.json schema if needed

### Custom Scroll Animations

Example using `StickyPanel`:

```tsx
import StickyPanel from '@/components/StickyPanel'

<StickyPanel height="150vh">
  <YourContent />
</StickyPanel>
```

### Add Contact Form Backend

Replace mailto in `Contact.tsx` with:

```tsx
const handleSubmit = async (e) => {
  e.preventDefault()
  const res = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(formData),
  })
  // Handle response
}
```

Create `pages/api/contact.ts` for serverless function.

## 📚 Technologies Used

| Category | Technologies |
|----------|-------------|
| Framework | Next.js 14, React 18 |
| Styling | Tailwind CSS, CSS Variables |
| Animation | Framer Motion |
| Language | TypeScript |
| Testing | Jest, React Testing Library |
| Build | Webpack (via Next.js) |
| Deployment | Vercel, Netlify, GitHub Pages |
| PDF Generation | Puppeteer |
| Image Processing | Sharp |

## 📖 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Framer Motion API](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## 🤝 Contributing

While this is a personal portfolio, feel free to:
- Report issues
- Suggest improvements
- Fork for your own use

## 📧 Contact

**Riyank Mukhopadhyay**
- Email: rmukhop3@asu.edu
- GitHub: [@Riyank7](https://github.com/Riyank7)
- LinkedIn: [riyankmukhopadhyay](https://linkedin.com/in/riyankmukhopadhyay)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using Next.js, Tailwind CSS, and Framer Motion
