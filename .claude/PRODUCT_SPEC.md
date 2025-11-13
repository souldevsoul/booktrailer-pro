# BookTrailer Pro - Complete Product Specification

## 🎯 Brand Concept & Vision

### What is BookTrailer Pro?

**BookTrailer Pro** is an AI-powered book trailer creation platform that bridges the gap between instant AI video generation and professional human video editing expertise.

**The Core Innovation:**
We combine the speed of AI video generation with the quality of human video editors through a seamless hybrid workflow and unified credit system.

### Value Proposition

**For Authors & Publishers:**
- Create engaging book trailers in minutes, not weeks
- Start free, pay only when you need more
- Professional quality without production company prices

**For Literary Agencies & Marketing Firms:**
- Use AI for rapid concept generation
- Human video editors refine the best concepts
- Complete trailer packages with multiple formats
- White-label option for client work

### Unique Selling Points

1. **AI + Human Hybrid** - Start with AI speed, finish with human quality
2. **Unified Credits** - One credit system for both AI generation and editor services
3. **Complete Trailer Packages** - Not just video, full marketing assets included
4. **All Formats** - MP4, WebM, GIF previews ready for any platform
5. **7 Video Styles** - Cinematic, Dramatic, Mysterious, Romantic, Action, Literary, Minimalist
6. **Commercial Rights** - Full ownership, use anywhere forever

---

## 🎨 Visual Brand Identity

### Brand Colors (CRITICAL - DO NOT DEVIATE!)

**Primary Palette:**
```
Purple/Pink/Amber Family:
- #9333EA (purple-600) - Primary action color
- #F59E0B (amber-500) - Secondary emphasis, creative energy
- #EC4899 (pink-500) - Engaging, literary accent
- #A855F7 (purple-500) - Lighter variation
```

**Usage Rules:**
- Primary CTAs: Purple/Pink gradients
- Secondary elements: Amber/Purple
- Backgrounds: White/Slate-50
- Text: Slate-900 (headings), Slate-600 (body)

**NEVER Use (VoiceCraft template colors):**
- ❌ Yellow (`yellow-*`) alone
- ❌ Orange (`orange-*`) alone
- ❌ Harsh black borders
- ❌ Brutalist shadows
- ❌ Emerald/Teal (LogoSmith colors)

### Visual Style

**Typography:**
- Headings: Bold, literary (text-5xl, font-bold)
- Body: Readable, flowing (text-lg, leading-relaxed)
- Accents: Semibold for emphasis

**Shadows (Soft & Cinematic):**
```css
shadow-soft-sm    - Subtle elevation
shadow-soft-md    - Card elevation
shadow-soft-lg    - Modal/popup elevation
shadow-soft-xl    - Hero element elevation
shadow-glow-purple - Interactive glow effect
shadow-glow-pink   - Accent glow effect
```

**Corners (Smooth & Modern):**
```css
rounded-xl    - Buttons, cards
rounded-2xl   - Large cards, sections
rounded-3xl   - Hero elements
rounded-full  - Badges, avatars
```

**Spacing (Generous & Breathable):**
- Section padding: py-24 (desktop), py-16 (mobile)
- Card padding: p-8, p-10, p-12
- Element gaps: gap-6, gap-8
- Vertical rhythm: space-y-6, space-y-8

---

## 🔄 Core User Flows

### Flow 1: New User → First Trailer (AI Only)

```
1. User lands on homepage
   ↓
2. Clicks "Create Trailer" CTA
   ↓
3. [If not logged in] → Sign up/login (Clerk Auth)
   ↓
4. Arrives at /dashboard/brief
   ↓
5. Fills out brief form:
   - Book title (required)
   - Author name (required)
   - Genre (dropdown: Fiction, Mystery, Romance, Thriller, Fantasy, etc.)
   - Book description (textarea)
   - Key themes (tags: love, adventure, betrayal, mystery, etc.)
   - Mood preferences (tone: dark, uplifting, suspenseful, etc.)
   - Video style (Cinematic/Dramatic/Mysterious/etc.)
   ↓
6. Clicks "Generate Trailer" button
   ↓
7. Brief saved to database (Prisma)
   ↓
8. API call to /api/trailers/generate
   ↓
9. Replicate API generates 3-5 trailer concepts
   - Model: minimax/video-01 (AI video generation)
   - Fallback: stability-ai/stable-video-diffusion
   ↓
10. Loading state shows progress (30-120 seconds)
    ↓
11. Generated trailers appear in gallery
    ↓
12. User clicks on favorite trailer
    ↓
13. Opens customization panel:
    - Trim video length
    - Add text overlays
    - Music selection
    - Pacing adjustments
    ↓
14. User clicks "Download" or "Get Full Package"
    ↓
15. [FREE TIER] → Download MP4 with watermark
    [PAID TIER] → Download all formats (MP4, WebM, GIF preview)
    ↓
16. Success! Trailer downloaded
```

**Happy Path Checkpoints:**
- ✅ Brief form validates properly
- ✅ Generation shows real-time progress
- ✅ All 3-5 trailers render/play correctly
- ✅ Customization updates preview instantly
- ✅ Download delivers correct file format
- ✅ Free tier shows watermark, paid tier doesn't

---

### Flow 2: User → Hire Video Editor (Hybrid Path)

```
1. User has generated AI trailer
   ↓
2. Sees "Not quite perfect? Hire a video editor" CTA
   ↓
3. Clicks "Hire Editor" button
   ↓
4. Modal opens explaining service:
   - "Professional video editor will refine your chosen AI concept"
   - "2-3 revision rounds included"
   - "Delivered in 3-7 business days"
   - "Cost: 15 credits ($149) or 30 credits ($299 for rush)"
   ↓
5. User confirms selected trailer
   ↓
6. User adds editing brief (what to improve)
   ↓
7. [If insufficient credits] → Redirect to /pricing
   ↓
8. Credit purchase flow:
   - Select credit package
   - Stripe checkout
   - Credits added to account
   ↓
9. Editor request created in database
   ↓
10. Email sent to editing team
    ↓
11. Dashboard shows "In Progress" status
    ↓
12. Editor uploads refined versions
    ↓
13. User receives notification
    ↓
14. User reviews trailers in dashboard
    ↓
15. User approves OR requests revision
    ↓
16. Final approved trailer delivered
    ↓
17. User downloads all formats + marketing assets
```

**Happy Path Checkpoints:**
- ✅ Editor request form clear and complete
- ✅ Credit deduction happens correctly
- ✅ User receives confirmation email
- ✅ Status updates show in dashboard
- ✅ Editor can upload files successfully
- ✅ User can request revisions (up to limit)
- ✅ Final files downloadable in all formats

---

### Flow 3: Returning User → Browse History

```
1. User logs in
   ↓
2. Lands on /dashboard
   ↓
3. Sees:
   - Recent trailers (video gallery)
   - Active editor projects (status cards)
   - Credit balance (top-right)
   - "Create New Trailer" button
   ↓
4. Clicks on past trailer
   ↓
5. Trailer detail page opens:
   - Video player preview
   - Original brief
   - Download buttons
   - "Create Variation" button
   - "Hire Editor to Refine" button
   ↓
6. User can:
   - Download again (no extra charge)
   - Create new variation (uses credits)
   - Send to editor (uses credits)
```

**Happy Path Checkpoints:**
- ✅ All past trailers visible
- ✅ Trailers load with correct metadata
- ✅ Download works without re-generation
- ✅ Variations respect original brief

---

## 💳 Credit System (Unified)

### Credit Economics

**What Credits Buy:**
- 1 credit = 1 AI trailer generation (up to 5 concepts)
- 1 credit = 1 trailer variation (style/mood change)
- 15 credits = Professional editor refinement (standard)
- 30 credits = Professional editor refinement (rush, 48-72hr)
- 5 credits = Complete marketing package (extended assets)

### Pricing Tiers

| Tier | Price | Credits/Month | AI Generations | Editor Access | Features |
|------|-------|---------------|----------------|---------------|----------|
| **Free** | $0 | 2 | 2 trailers | ❌ | MP4 only, watermark |
| **Creator** | $29/mo | 20 | 20 trailers | ✅ | All formats, packages, no watermark |
| **Studio** | $99/mo | 100 | 100 trailers | ✅ | Everything + team (5 seats) + white-label |

### Credit Purchase (À la carte)

For users who exceed monthly limits:

| Package | Price | Credits | Savings |
|---------|-------|---------|---------|
| Starter | $15 | 10 | - |
| Pro | $35 | 30 | 17% |
| Studio | $95 | 100 | 25% |
| Agency | $250 | 300 | 33% |

**Rules:**
- Credits never expire
- Unused monthly credits carry over (up to 2x monthly limit)
- Team seats share credit pool
- Editor requests deduct credits immediately
- Failed generations refund credits automatically

---

## 🤖 Replicate Integration

### AI Models Used

**Primary: minimax/video-01**
- **Purpose:** AI video generation from text
- **Output:** MP4 files (high quality)
- **Speed:** ~60-120 seconds per generation
- **Best for:** Cinematic, dramatic, mysterious styles

**Secondary: stability-ai/stable-video-diffusion**
- **Purpose:** High-quality video concepts
- **Output:** MP4 files (stable diffusion)
- **Speed:** ~45-90 seconds per generation
- **Best for:** Minimalist, literary, romantic styles

### Generation Flow

```typescript
// /app/api/trailers/generate/route.ts

export async function POST(req: Request) {
  // 1. Parse request
  const { briefId, style, userId } = await req.json()

  // 2. Check user credits
  const user = await db.user.findUnique({ where: { id: userId }})
  if (user.credits < 1) {
    return Response.json({ error: "Insufficient credits" }, { status: 402 })
  }

  // 3. Deduct credit immediately
  await deductCredits(userId, 1, "trailer_generation", briefId)

  // 4. Fetch brief details
  const brief = await db.brief.findUnique({ where: { id: briefId }})

  // 5. Build Replicate prompt
  const prompt = buildPrompt(brief, style)
  // Example: "Create a cinematic book trailer for 'The Midnight Garden',
  // mystery-themed, dark and atmospheric, suspenseful mood"

  // 6. Call Replicate API
  try {
    const prediction = await replicate.predictions.create({
      model: "minimax/video-01",
      input: {
        prompt: prompt,
        style: style,
        duration: 30, // 30 seconds
        num_outputs: 5, // Generate 5 variations
      }
    })

    // 7. Save trailer record (status: processing)
    const trailer = await db.trailer.create({
      data: {
        briefId,
        userId,
        style,
        status: "processing",
        replicateId: prediction.id,
      }
    })

    // 8. Poll Replicate for completion (webhook preferred)
    // Webhook will update trailer status when done

    return Response.json({ trailerId: trailer.id, status: "processing" })

  } catch (error) {
    // 9. Refund credit on failure
    await refundCredits(userId, 1, "generation_failed", briefId)
    return Response.json({ error: "Generation failed" }, { status: 500 })
  }
}
```

---

## 📄 Marketing Pages (Required)

### Homepage (/)

**Sections (in order):**

1. **Hero Section**
   - H1: "Your Book. Your Trailer. In Minutes."
   - Subheading: "AI generates instant trailers. Professional editors refine to perfection."
   - Primary CTA: "Start with AI (Free)" → /dashboard
   - Secondary CTA: "Hire an Editor" → /pricing (editor section)
   - Trailer showcase: Video carousel of example trailers

2. **AI + Human Hybrid Section**
   - Split comparison cards
   - Left: AI Path (fast, affordable, instant)
   - Right: Human Path (custom, expert, refined)
   - Center: Hybrid option (best of both)

3. **How It Works (3 Steps)**
   - Step 1: Fill Brief (icon + description)
   - Step 2: AI Generates (icon + description)
   - Step 3: Customize & Download (icon + description)

4. **Trailer Gallery Showcase**
   - Real AI-generated examples
   - Filterable by genre (Mystery, Romance, etc.)
   - Play on hover

5. **7 Video Styles**
   - Cards for each style
   - Video example
   - Description
   - "View Examples" link

6. **Features Grid (6 items)**
   - Multiple Video Styles
   - Instant Customization
   - Trailer Variations (different lengths)
   - All File Formats (MP4, WebM, GIF)
   - Complete Marketing Package
   - Commercial Rights

---

## 🗄 DATABASE SCHEMA

### DELETE: Voice models
### ADD:
```prisma
model Brief {
  id String @id @default(cuid())
  userId String
  bookTitle String
  authorName String
  genre String  // "fiction", "mystery", "romance", "thriller", "fantasy", etc.
  description String @db.Text
  themes String[]  // "love", "adventure", "betrayal", "mystery"
  mood String?  // "dark", "uplifting", "suspenseful", "romantic"
  trailers Trailer[]
  createdAt DateTime @default(now())
}

model Trailer {
  id String @id @default(cuid())
  briefId String
  brief Brief @relation(fields: [briefId], references: [id], onDelete: Cascade)
  userId String
  style String  // "cinematic", "dramatic", "mysterious", "romantic", "action", "literary", "minimalist"
  primaryUrl String  // Main trailer file (MP4)
  thumbnailUrl String?  // Thumbnail image
  duration Int @default(30)  // Duration in seconds
  status String @default("processing")  // "processing", "completed", "failed"
  replicateId String?
  variations TrailerVariation[]
  marketingPackage MarketingPackage?
  favorites Int @default(0)
  downloads Int @default(0)
  createdAt DateTime @default(now())
}

model TrailerVariation {
  id String @id @default(cuid())
  trailerId String
  trailer Trailer @relation(fields: [trailerId], references: [id], onDelete: Cascade)
  type String  // "short-15s", "medium-30s", "long-60s", "gif-preview", "social-square"
  fileUrl String
  format String  // "mp4", "webm", "gif"
  duration Int  // Duration in seconds
}

model MarketingPackage {
  id String @id @default(cuid())
  trailerId String @unique
  trailer Trailer @relation(fields: [trailerId], references: [id], onDelete: Cascade)
  socialAssets Json  // {square: "url", vertical: "url", horizontal: "url"}
  gifPreview String?  // GIF preview URL
  thumbnails String[]  // Array of thumbnail URLs
  captionTemplates Json  // {instagram: "...", facebook: "...", twitter: "..."}
  packageUrl String?  // ZIP download URL
}

model EditorRequest {
  id String @id @default(cuid())
  userId String
  trailerId String
  brief String @db.Text
  referenceUrls String[]
  priority String  // "standard", "rush"
  status String @default("pending")
  editorId String?
  drafts EditorDraft[]
  revisions Revision[]
  creditsUsed Int
  createdAt DateTime @default(now())
  completedAt DateTime?
}

model EditorDraft {
  id String @id @default(cuid())
  requestId String
  request EditorRequest @relation(fields: [requestId], references: [id])
  version Int
  fileUrls String[]
  notes String?
  uploadedAt DateTime @default(now())
}

model Revision {
  id String @id @default(cuid())
  requestId String
  request EditorRequest @relation(fields: [requestId], references: [id])
  feedback String @db.Text
  createdAt DateTime @default(now())
}
```

---

## 🛣 API ROUTES

- `POST /api/briefs/create` - Create trailer brief
- `GET /api/briefs` - List all briefs
- `POST /api/trailers/generate` - Generate trailers from brief
- `GET /api/trailers/[id]` - Get trailer details with variations
- `PATCH /api/trailers/[id]/customize` - Update trailer customization
- `POST /api/trailers/[id]/variations` - Generate trailer variations
- `POST /api/trailers/[id]/package` - Generate complete marketing package
- `GET /api/trailers/[id]/download` - Download trailers in various formats
- `POST /api/trailers/[id]/favorite` - Mark trailer as favorite
- `POST /api/requests/create` - Create editor request
- `GET /api/requests/[id]` - Get request details

---

## ✅ End Goal Verification Checklist

### Marketing Pages Complete?
- [ ] Homepage has all 6 sections
- [ ] Pricing page shows all 3 tiers + à la carte
- [ ] All CTAs lead to correct destinations
- [ ] SEO meta tags present
- [ ] Mobile responsive
- [ ] Design system consistent (purple/amber/pink, soft shadows)

### User Flows Working?
- [ ] New user can sign up
- [ ] User can create brief
- [ ] AI generation works (Replicate integration)
- [ ] Generated trailers display/play correctly
- [ ] User can customize trailer
- [ ] User can download (format restrictions by tier)
- [ ] User can hire editor
- [ ] Editor request creates correctly
- [ ] Credit system deducts properly

### Credit System Complete?
- [ ] Free tier: 2 credits/month
- [ ] Creator tier: 20 credits/month
- [ ] Studio tier: 100 credits/month
- [ ] À la carte purchase works (Stripe)
- [ ] Credits deduct on generation
- [ ] Credits deduct on editor request
- [ ] Credits refund on failure
- [ ] Credit balance displays correctly

---

## 🎨 Design System Confirmation

**Colors Used Everywhere:**
- ✅ Purple (#9333EA)
- ✅ Amber (#F59E0B)
- ✅ Pink (#EC4899)
- ❌ NO Yellow alone
- ❌ NO Orange alone
- ❌ NO Emerald/Teal (LogoSmith colors)
- ❌ NO Harsh black borders

**Visual Style:**
- ✅ Soft shadows (shadow-soft-*)
- ✅ Smooth corners (rounded-xl/2xl/3xl)
- ✅ Generous spacing (py-24, gap-8)
- ✅ Creative, literary, engaging feel

---

This is the complete, comprehensive specification for BookTrailer Pro. Every flow, every page, every technical detail is documented here.
