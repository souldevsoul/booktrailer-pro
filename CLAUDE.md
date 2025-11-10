# CLAUDE.md - BookTrailer Pro

**AI Book Trailer Video Generation Platform**

Transform VoiceCraft into BookTrailer Pro - create cinematic video book trailers from book content.

---

## ⚠️ CRITICAL LESSONS FROM CLIPMASTER (READ FIRST!)

**When adapting VoiceCraft, we learned these 7 critical lessons from ClipMaster:**

### 1. **DESIGN SYSTEM MUST BE COMPLETELY DIFFERENT**
❌ **Don't just change colors** - Transform the entire visual style!
- VoiceCraft uses: Brutalist style (black borders, sharp corners, yellow accents)
- Your project needs: A COMPLETELY UNIQUE visual identity
- **Action**: Don't keep border-4 border-black, brutalist-shadow, or sharp corners
- **Action**: Choose: Modern (soft shadows, rounded), Minimalist (clean lines), Futuristic (neon, glow), or Elegant (serif, subtle)

### 2. **COMPONENT STYLING OVERHAUL REQUIRED**
❌ **Don't just update page content** - UI components need complete redesign!
- **Required file updates:**
  - `components/ui/button.tsx` - Match your brand style (gradients, shadows, corners)
  - `components/ui/card.tsx` - Unique card design (shadows, borders, backgrounds)
  - `components/marketing/layout/header.tsx` - Custom header style
  - `components/marketing/layout/footer.tsx` - Redesigned footer
  - `components/marketing/NewsletterPopup.tsx` - Branded modal
  - `app/globals.css` - New utility classes for your design system

### 3. **BRANDING CONSISTENCY**
❌ **Don't mix uppercase/lowercase** - Pick one and be consistent!
- VoiceCraft: UPPERCASE branding
- ClipMaster: lowercase "clipmaster"
- **Your choice**: Decide early and update EVERYWHERE
- **Action**: Update Header component default logoText
- **Action**: Update all footer text, legal docs, meta tags

### 4. **VISUAL ELEMENTS - COMPLETE REPLACEMENT**
❌ **Don't reuse VoiceCraft images** - Generate ALL brand-specific images!
- **Delete**: All microphone images, waveforms, voice graphics
- **Generate**: Images specific to your product (see IMAGES_SCRIPT.md)
- **Action**: Remove old images from /public/images/
- **Action**: Update ALL Image components with new paths
- **Action**: Generate hero images, feature icons, mockups, testimonials

### 5. **TYPOGRAPHY & SPACING DIFFERENTIATION**
❌ **Don't keep VoiceCraft font styles** - Create unique hierarchy!
- VoiceCraft: UPPERCASE BOLD everywhere, font-black, tight spacing
- **Your project**: Choose different weights, sizes, spacing
- **Action**: Update font-bold → font-semibold OR font-medium
- **Action**: Remove/add uppercase transforms based on your brand
- **Action**: Use gradient text or other effects for emphasis

### 6. **ANIMATION & INTERACTIONS**
❌ **Don't keep same animation styles** - Create unique motion design!
- VoiceCraft: Hard scale (scale-[1.02]), sharp transitions
- **Your project**: Choose your motion style
- **Action**: Smooth float animations OR sharp snappy OR subtle fade
- **Action**: Custom hover effects (glow, lift, rotate, etc.)
- **Action**: Add unique loading/transition animations

### 7. **LAYOUT PATTERNS - REDESIGN FLOW**
❌ **Don't copy exact VoiceCraft sections** - Redesign page structure!
- **Action**: Add unique sections relevant to your product
- **Action**: Change grid patterns (2-col vs 3-col vs 4-col)
- **Action**: Add decorative elements (orbs, patterns, illustrations)
- **Action**: Reorder sections for your user journey

---

## 🎯 PROJECT OVERVIEW

**Core Functionality:**
- Upload book covers, synopsis, key scenes, and quotes
- AI generates cinematic book trailers
- Multiple genres (Thriller, Romance, Sci-Fi, Fantasy, Mystery, Literary Fiction)
- Multiple video styles (Dramatic, Epic, Intimate, Suspenseful, Whimsical)
- Music library integration
- Text overlay customization
- Multiple export formats (16:9, 9:16, 1:1)
- Publish directly to social media

**Replicate Models:** `google/veo-3.1`, `luma/ray`, `minimax/video-01`

**Tech Stack:** Next.js 16.0.1 · Prisma + PostgreSQL · Vercel Blob · Replicate API · Stripe

---

## 🎨 BRAND COLORS

```css
/* NEW (BookTrailer Pro) */
--primary: #6366F1;    /* Indigo 500 - Literary, creative */
--secondary: #8B5CF6;  /* Violet 500 - Cinematic, dramatic */
--accent: #06B6D4;     /* Cyan 500 - Modern, engaging */
```

---

## 🗄 DATABASE SCHEMA

### DELETE: Voice models
### ADD:
```prisma
model Book {
  id String @id @default(cuid())
  userId String
  title String
  author String
  genre String  // "thriller", "romance", "scifi", "fantasy", "mystery", "literary"
  synopsis String @db.Text
  coverUrl String
  targetAudience String?  // "young-adult", "adult", "children"
  publishDate DateTime?
  trailers BookTrailer[]
  scenes Scene[]
  createdAt DateTime @default(now())
}

model BookTrailer {
  id String @id @default(cuid())
  bookId String
  book Book @relation(fields: [bookId], references: [id], onDelete: Cascade)
  userId String
  style String  // "dramatic", "epic", "intimate", "suspenseful", "whimsical"
  duration Int @default(60)  // seconds
  videoUrl String?
  thumbnailUrl String?
  musicTrack String?  // reference to music library
  status String @default("processing")  // "processing", "completed", "failed"
  replicateId String?
  downloads Int @default(0)
  views Int @default(0)
  socialShares SocialShare[]
  createdAt DateTime @default(now())
}

model Scene {
  id String @id @default(cuid())
  bookId String
  book Book @relation(fields: [bookId], references: [id], onDelete: Cascade)
  sceneText String @db.Text  // Key scene description or quote
  imagePrompt String @db.Text  // AI-generated visual prompt
  order Int
  duration Int @default(5)  // seconds
}

model SocialShare {
  id String @id @default(cuid())
  trailerId String
  trailer BookTrailer @relation(fields: [trailerId], references: [id], onDelete: Cascade)
  platform String  // "youtube", "instagram", "tiktok", "facebook"
  shareUrl String?
  createdAt DateTime @default(now())
}
```

---

## 🛣 API ROUTES

- `POST /api/books/upload` - Upload book details and cover
- `POST /api/books/[id]/scenes` - Create scenes from synopsis
- `POST /api/trailers/generate` - Generate book trailer video
- `GET /api/trailers/[id]/status` - Check generation status
- `GET /api/trailers/[id]/download` - Download trailer
- `POST /api/trailers/[id]/share` - Share to social media
- `GET /api/music/library` - Get available music tracks

---

## 📄 KEY PAGES

- **Homepage:** "Turn Your Book Into a Cinematic Trailer"
- **Dashboard:** Book library, trailer gallery, analytics
- **Trailer Studio:** Upload book → Select genre/style → Customize scenes → Generate trailer
- **Pricing:** Free (1 trailer/mo), Author ($29/mo), Publisher ($99/mo)

---

## 🧩 COMPONENTS

- `book-uploader.tsx` - Upload book cover and details
- `scene-builder.tsx` - Create/edit key scenes
- `style-selector.tsx` - Choose trailer style and genre
- `trailer-preview.tsx` - Video player with editing controls
- `music-picker.tsx` - Select background music
- `export-options.tsx` - Choose format and export settings
- `social-share-panel.tsx` - Share to platforms

---

**Total Time:** 18-24 hours

**Next:** See `TODO.md`, `LANDING_PAGE_CONTENT.md`, `IMAGES_SCRIPT.md`
