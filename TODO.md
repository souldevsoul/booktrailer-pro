# TODO.md - BookTrailer Pro

Book Trailer Video Generation Platform - Task breakdown. **Time:** 18-24 hours

---

## PHASE 1: BRANDING & SETUP (2h)

### Colors
- [ ] Update Tailwind config: Indigo (#6366F1), Violet (#8B5CF6), Cyan (#06B6D4)
- [ ] Replace "VoiceCraft" → "BookTrailer Pro" across all pages
- [ ] Update favicon and meta tags
- [ ] Update app/layout.tsx with new branding

---

## PHASE 2: DATABASE MIGRATION (1.5h)

### Delete Voice Models
- [ ] Remove `Voice` model from schema.prisma
- [ ] Remove `VoiceGeneration` model
- [ ] Remove `VoiceTemplate` model
- [ ] Remove `Audio` model

### Add Book Models
- [ ] Add `Book` model with title, author, genre, synopsis, cover
- [ ] Add `BookTrailer` model with style, duration, video URL, music track
- [ ] Add `Scene` model for key scenes/quotes
- [ ] Add `SocialShare` model for platform tracking
- [ ] Run `npx prisma generate`
- [ ] Run `npx prisma db push`
- [ ] Verify in Prisma Studio

---

## PHASE 3: API ROUTES (4h)

### Book Management
- [ ] `POST /api/books/upload` - Create book with details and cover
  - Zod validation for title, author, genre, synopsis
  - Upload cover image to Vercel Blob
  - Return book ID
- [ ] `GET /api/books` - List all books for user
- [ ] `GET /api/books/[id]` - Get single book details
- [ ] `DELETE /api/books/[id]` - Delete book and trailers
- [ ] `PATCH /api/books/[id]` - Update book details

### Scene Management
- [ ] `POST /api/books/[id]/scenes` - Auto-generate scenes from synopsis
  - Use OpenAI to extract 5-8 key moments
  - Generate visual prompts for each scene
  - Store with order and duration
- [ ] `GET /api/scenes/[bookId]` - Get all scenes for book
- [ ] `PATCH /api/scenes/[id]` - Edit scene text or duration
- [ ] `DELETE /api/scenes/[id]` - Remove scene

### Trailer Generation
- [ ] `POST /api/trailers/generate` - Generate video trailer
  - Validate book has scenes and cover
  - Create BookTrailer record with status: 'processing'
  - Call Replicate (google/veo-3.1 or luma/ray)
  - Generate video from scenes with transitions
  - Add music track if selected
  - Upload video to Vercel Blob
  - Update status to 'completed'
  - Error handling: update status to 'failed'
- [ ] `GET /api/trailers/[id]/status` - Poll trailer generation status
- [ ] `GET /api/trailers/[id]/download` - Download trailer video
- [ ] `GET /api/trailers` - List all trailers for user

### Music & Social
- [ ] `GET /api/music/library` - Return available music tracks
- [ ] `POST /api/trailers/[id]/share` - Create social share record

---

## PHASE 4: COMPONENTS (4h)

### Core Components
- [ ] `components/book-uploader.tsx` - Upload book cover and details
  - Form: title, author, genre dropdown, synopsis textarea
  - Drag-drop cover image upload
  - Genre options: Thriller, Romance, Sci-Fi, Fantasy, Mystery, Literary
  - Validation and loading states
- [ ] `components/scene-builder.tsx` - Create/edit key scenes
  - Display AI-generated scenes
  - Edit scene text inline
  - Adjust duration slider (3-10 seconds)
  - Drag to reorder scenes
  - Add/remove scene buttons
- [ ] `components/style-selector.tsx` - Choose trailer style and genre
  - Style cards: Dramatic, Epic, Intimate, Suspenseful, Whimsical
  - Visual previews of each style
  - Duration selector: 30s, 60s, 90s
- [ ] `components/trailer-preview.tsx` - Video player with controls
  - Video.js or similar player
  - Download button
  - Share to social buttons
  - View count and analytics
- [ ] `components/music-picker.tsx` - Select background music
  - Grid of music tracks with preview players
  - Genre-matched music suggestions
  - Upload custom music option
- [ ] `components/export-options.tsx` - Choose format
  - Aspect ratio selector: 16:9 (YouTube), 9:16 (TikTok), 1:1 (Instagram)
  - Quality selector: SD, HD, 4K
  - Download format: MP4, MOV
- [ ] `components/social-share-panel.tsx` - Share to platforms
  - YouTube, Instagram, TikTok, Facebook buttons
  - Copy link button
  - Embed code generator

---

## PHASE 5: PAGES (3h)

### Homepage
- [ ] Update `app/page.tsx` - "Turn Your Book Into a Cinematic Trailer"
  - Hero with video background
  - Genre examples showcase
  - 3-step process: Upload → Customize → Share
  - Testimonials from authors
  - CTA: "Create Your First Trailer"

### Dashboard
- [ ] Update `app/dashboard/page.tsx` - Book & trailer library
  - Book grid with covers
  - Trailer gallery with thumbnails
  - Analytics: views, downloads, shares
  - Quick actions: New book, Generate trailer

### Trailer Studio
- [ ] Create `app/studio/page.tsx` - Multi-step trailer creation
  - Step 1: Upload book (book-uploader component)
  - Step 2: Generate/edit scenes (scene-builder)
  - Step 3: Choose style (style-selector)
  - Step 4: Select music (music-picker)
  - Step 5: Export options (export-options)
  - Step 6: Generate and preview (trailer-preview)

### Pricing
- [ ] Update `app/pricing/page.tsx`
  - Free: 1 trailer/mo, 30s max, SD quality, watermark
  - Author ($29/mo): 5 trailers/mo, 90s max, HD, no watermark
  - Publisher ($99/mo): Unlimited, 4K, custom music, API access

### Legal Pages
- [ ] Update `app/about/page.tsx` - For authors and publishers
- [ ] Update `app/contact/page.tsx` - Support and sales
- [ ] Update `app/terms/page.tsx` - Usage rights for trailers
- [ ] Update `app/privacy/page.tsx` - Data handling

---

## PHASE 6: IMAGES & ASSETS (2.5h)

### Logo & Branding
- [ ] Generate logo (film reel + book icon) using Recraft V3
  - Main SVG logo: indigo/violet gradient
  - Icon-only version: 512x512px
  - Horizontal light/dark versions
- [ ] Save to `public/images/logo/`

### Hero & Features
- [ ] Generate hero background video (book pages + cinematic scenes) using FLUX
- [ ] Generate 6 genre example trailers (30s each) as demos
  - Thriller example
  - Romance example
  - Sci-Fi example
  - Fantasy example
  - Mystery example
  - Literary example
- [ ] Generate feature icons (7 icons) using Recraft V3
  - Upload book icon
  - Auto-scene generation icon
  - Style selector icon
  - Music library icon
  - Export formats icon
  - Social share icon
  - Analytics icon

### UI Mockups
- [ ] Generate UI screenshots using FLUX
  - Book uploader interface
  - Scene builder interface
  - Style selector gallery
  - Trailer preview player
- [ ] Save to `public/images/mockups/`

### Testimonials
- [ ] Generate 3 author photos using FLUX Pro
  - Female author with book
  - Male author at desk
  - Young author with laptop
- [ ] Save to `public/images/testimonials/`

---

## PHASE 7: TESTING FLOWS (2h)

### Author Flow
- [ ] Test: Upload book with cover and synopsis
- [ ] Test: AI generates scenes from synopsis
- [ ] Test: Edit scene text and duration
- [ ] Test: Reorder scenes with drag-drop
- [ ] Test: Select trailer style (Dramatic, Epic, etc.)
- [ ] Test: Choose music track
- [ ] Test: Select export format (16:9, 9:16, 1:1)
- [ ] Test: Generate trailer (60s video)
- [ ] Test: Download trailer as MP4
- [ ] Test: Share trailer to YouTube

### Publisher Flow
- [ ] Test: Upload multiple books
- [ ] Test: Generate trailers for each book
- [ ] Test: View analytics (views, downloads, shares)
- [ ] Test: Bulk export trailers
- [ ] Test: Custom music upload

### Admin Dashboard (Optional)
- [ ] Create `app/admin/books/page.tsx` - View all books
- [ ] Create `app/admin/trailers/page.tsx` - View all trailers
- [ ] Create `app/admin/analytics/page.tsx` - Platform usage stats
- [ ] Add moderation tools for reported content

---

## PHASE 8: REPLICATE INTEGRATION (2h)

### Video Generation
- [ ] Test `google/veo-3.1` model for cinematic video
  - Generate sample trailer from scenes
  - Test transition effects between scenes
  - Test text overlay rendering
- [ ] Test `luma/ray` model as alternative
  - Compare quality with veo-3.1
  - Test generation speed
- [ ] Implement fallback logic if primary model fails

### Music Integration
- [ ] Source royalty-free music tracks (20-30 tracks)
  - Dramatic orchestral tracks
  - Epic cinematic scores
  - Romantic piano pieces
  - Suspenseful ambient tracks
  - Whimsical fantasy music
- [ ] Store music URLs in database or config
- [ ] Test audio mixing with video generation

---

## PHASE 9: POLISH & UX (1.5h)

### Loading States
- [ ] Add skeleton loaders for book grid
- [ ] Add progress bar for trailer generation (0-100%)
- [ ] Add upload progress for book cover
- [ ] Add "Generating scenes..." animation

### Empty States
- [ ] Design empty state for no books yet
  - CTA: "Upload Your First Book"
- [ ] Design empty state for no trailers yet
  - CTA: "Generate Your First Trailer"

### Error Handling
- [ ] Handle upload errors (file too large, invalid format)
- [ ] Handle Replicate API errors (timeout, quota exceeded)
- [ ] Handle scene generation errors (OpenAI API failure)
- [ ] Show user-friendly error messages with retry options

### Mobile Responsive
- [ ] Test all pages on mobile (375px width)
- [ ] Ensure trailer preview works on mobile
- [ ] Test book uploader on mobile
- [ ] Test scene builder drag-drop on touch devices

---

## PHASE 10: DEPLOYMENT & DOCS (1.5h)

### Environment Setup
- [ ] Add required env vars to `.env.example`:
  - `REPLICATE_API_TOKEN`
  - `OPENAI_API_KEY`
  - `BLOB_READ_WRITE_TOKEN`
  - `STRIPE_SECRET_KEY`
  - `DATABASE_URL`
- [ ] Document setup in README

### Deployment
- [ ] Deploy to Vercel
- [ ] Configure Vercel Blob storage
- [ ] Set up Vercel Postgres database
- [ ] Add environment variables in Vercel dashboard
- [ ] Test production build: `npm run build`

### Documentation
- [ ] Update README.md with BookTrailer Pro overview
- [ ] Document API routes with examples
- [ ] Add troubleshooting guide
- [ ] Document Replicate model usage and costs

---

## TOTAL ESTIMATED TIME: 18-24 hours

**Phases 1-3:** 7.5 hours (Setup, Database, API)
**Phases 4-6:** 9.5 hours (Components, Pages, Images)
**Phases 7-10:** 7 hours (Testing, Integration, Deployment)
