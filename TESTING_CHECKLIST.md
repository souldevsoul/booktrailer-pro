# BookTrailer Pro - Testing Checklist

**Purpose**: Comprehensive testing plan for Phase 7
**Date Created**: 2025-11-14
**Status**: Ready for execution

---

## 🎯 Testing Overview

This document provides a complete testing checklist for BookTrailer Pro before deployment. Each section includes:
- Test steps
- Expected results
- Pass/fail criteria
- Notes for issues found

---

## 1. AUTHOR FLOW - Complete User Journey

### 1.1 Homepage & Navigation
- [ ] Load homepage at `http://localhost:3000`
- [ ] Verify hero section displays correctly
- [ ] Check "Create Your First Trailer" CTA button works
- [ ] Verify navigation menu (About, Features, Pricing, Contact)
- [ ] Test mobile responsive menu (< 768px)
- [ ] Verify footer links work

**Expected**: All pages load without errors, responsive design works

---

### 1.2 Book Upload Flow

#### Step 1: Navigate to Upload
- [ ] Click "Create Your First Trailer" or navigate to `/dashboard/books/new`
- [ ] Verify auth redirect (if not logged in)
- [ ] Login/register if needed

#### Step 2: Fill Book Form
- [ ] Fill in book title: "The Shadow Protocol"
- [ ] Fill in author name: "Jane Smith"
- [ ] Select genre: "Thriller"
- [ ] Enter synopsis (min 100 words):
```
In the depths of Silicon Valley, a cybersecurity expert discovers a
hidden surveillance program that's been tracking the world's most
powerful leaders. As she digs deeper, she realizes the program isn't
just watching - it's predicting and manipulating global events.
Racing against time, she must expose the truth before becoming the
next target. But in a world where everyone is watching, who can she trust?
```
- [ ] Upload book cover image (test with JPG, PNG, WebP)

#### Step 3: Submit & Verify
- [ ] Click "Upload Book" button
- [ ] Verify upload progress indicator appears
- [ ] Verify toast notification: "Book uploaded successfully!"
- [ ] Check redirect to book details page: `/dashboard/books/[id]`
- [ ] Verify book appears in books library: `/dashboard/books`

**Expected**:
- Form validation works
- File upload succeeds
- Book saved to database
- Cover image uploaded to Vercel Blob
- No console errors

---

### 1.3 Scene Generation Flow

#### Auto-Generate Scenes
- [ ] From book details page, click "Generate Scenes"
- [ ] Verify loading state: "Generating scenes from synopsis..."
- [ ] Wait for OpenAI API response (5-15 seconds)
- [ ] Verify 5 scenes generated with:
  - Scene number (1-5)
  - Description (2-3 sentences each)
  - Duration (default 5 seconds)
  - Camera angle (default "medium")

**Example Expected Scenes** (Thriller):
```
Scene 1: Close-up of computer screen with cascading code, fingers
flying across keyboard in dimly lit office

Scene 2: Wide shot of Silicon Valley skyline at dusk, ominous
surveillance cameras visible on buildings

Scene 3: Medium shot of protagonist's shocked face as she discovers
hidden files, blue screen glow illuminating her features

Scene 4: Fast-paced montage of global leaders, news headlines, and
data streams connecting their images

Scene 5: Dramatic chase scene through server room, red emergency
lights flashing, protagonist running
```

#### Edit Scenes
- [ ] Click edit icon on Scene 2
- [ ] Modify description
- [ ] Change duration from 5s to 7s
- [ ] Change camera angle to "wide"
- [ ] Click "Save"
- [ ] Verify changes persist
- [ ] Verify toast: "Scene updated successfully!"

#### Reorder Scenes
- [ ] Drag Scene 3 to position 2
- [ ] Verify scene numbers update automatically
- [ ] Verify toast: "Scenes reordered"

#### Add/Remove Scenes
- [ ] Click "Add Scene" button
- [ ] Fill in new scene details
- [ ] Click "Delete" on Scene 4
- [ ] Verify confirmation dialog
- [ ] Confirm deletion
- [ ] Verify scene removed

**Expected**:
- AI generates relevant, genre-appropriate scenes
- Edit functionality works smoothly
- Drag-and-drop reordering works
- Add/delete scenes work
- All changes save to database
- No console errors

---

### 1.4 Style Selection Flow

#### Navigate to Style Selector
- [ ] Click "Choose Style" button
- [ ] Verify 5 style cards display:
  - **Dramatic**: High contrast lighting, intense close-ups
  - **Epic**: Grand scale, sweeping landscapes
  - **Intimate**: Character-focused, shallow depth of field
  - **Suspenseful**: Dark thriller aesthetic, mysterious atmosphere
  - **Whimsical**: Playful, bright vibrant colors

#### Select Style
- [ ] Click on "Suspenseful" style card
- [ ] Verify card highlights with border
- [ ] Verify style description updates
- [ ] Click "Continue"
- [ ] Verify style saved

**Expected**:
- All 5 styles display with previews
- Selection works correctly
- Style saved to trailer settings
- Visual feedback on selection

---

### 1.5 Music Selection Flow

#### Browse Music Library
- [ ] Navigate to music picker
- [ ] Verify 10+ music tracks display
- [ ] Verify each track has:
  - Title
  - Genre/mood tag
  - Duration
  - Preview player with play/pause

#### Select Music
- [ ] Click play on "Dark Tension" track
- [ ] Verify audio plays
- [ ] Click "Select This Track"
- [ ] Verify visual feedback (checkmark)
- [ ] Click "Continue"

#### Upload Custom Music (Optional)
- [ ] Click "Upload Custom Music"
- [ ] Select MP3 file (test < 10MB)
- [ ] Verify upload progress
- [ ] Verify track added to library
- [ ] Select custom track

**Expected**:
- Music library loads
- Audio preview works
- Track selection works
- Custom upload works (if implemented)
- Selected music saved

---

### 1.6 Trailer Generation Flow

#### Start Generation
- [ ] Click "Generate Trailer" button
- [ ] Verify confirmation dialog with settings summary:
  - Book title
  - Number of scenes (5)
  - Style (Suspenseful)
  - Music track
  - Estimated duration (30-60s)
- [ ] Click "Confirm & Generate"
- [ ] Verify redirect to trailer status page: `/dashboard/trailers/[id]`

#### Monitor Generation Status
- [ ] Verify initial status: "Queued"
- [ ] Verify loading animation displays
- [ ] Verify progress message: "Your trailer is being generated..."
- [ ] Wait for status updates (polling every 5 seconds)
- [ ] Expected status progression:
  1. "Queued" (0-10 seconds)
  2. "Processing" (10-120 seconds)
  3. "Completed" (after 2-5 minutes)

**Note**: Replicate MiniMax Video-01 takes 2-5 minutes for generation

#### View Completed Trailer
- [ ] Verify status changes to "Completed"
- [ ] Verify video player appears with thumbnail
- [ ] Verify trailer metadata displays:
  - Duration
  - Resolution (1920x1080)
  - File size
  - Creation date
- [ ] Click play button
- [ ] Verify video plays smoothly
- [ ] Test video controls:
  - Play/pause
  - Seek bar
  - Volume
  - Fullscreen
  - Quality selection

**Expected**:
- Generation request succeeds
- Status polling works correctly
- Webhook updates status
- Video URL returned from Replicate
- Video uploaded to Vercel Blob
- Player works without issues
- No console errors

#### Handle Generation Errors
- [ ] Test API failure scenario (disable REPLICATE_API_TOKEN)
- [ ] Verify error status: "Failed"
- [ ] Verify error message displays
- [ ] Verify "Retry" button appears
- [ ] Click "Retry"
- [ ] Verify new generation attempt starts

**Expected**:
- Errors handled gracefully
- Clear error messages
- Retry functionality works

---

### 1.7 Export Flow

#### Select Export Format
- [ ] From trailer page, click "Export" button
- [ ] Verify export modal displays with options:
  - **Format**: MP4 (1080p), MP4 (720p), MP4 (4K), WebM
  - **Platform**: YouTube, Instagram, TikTok, Facebook, Custom
  - **Resolution**: 1920x1080, 1080x1920, 1080x1080
  - **Aspect Ratio**: 16:9, 9:16, 1:1, 4:5, 21:9

#### Test Standard Export (Free Tier)
- [ ] Select: MP4 (1080p), YouTube, 1920x1080, 16:9
- [ ] Click "Export"
- [ ] Verify loading state
- [ ] Verify toast: "Export created successfully!"
- [ ] Verify download button appears
- [ ] Click "Download"
- [ ] Verify file downloads to local machine
- [ ] Verify filename format: `booktrailer-[title]-[format].mp4`

#### Test Premium Export (Requires Subscription)
- [ ] Select: MP4 (4K), Custom, 3840x2160, 21:9
- [ ] Click "Export"
- [ ] **IF NOT SUBSCRIBED**: Verify error: "Premium export formats require Publisher or Studio subscription"
- [ ] **IF SUBSCRIBED**: Verify export succeeds

#### Test Multiple Exports
- [ ] Export same trailer in 3 formats:
  1. YouTube (16:9, 1920x1080)
  2. Instagram Story (9:16, 1080x1920)
  3. Instagram Feed (1:1, 1080x1080)
- [ ] Verify all 3 exports appear in export history
- [ ] Download and verify each has correct dimensions

**Expected**:
- Export form validation works
- Premium gating works correctly
- Export records created in database
- Files downloadable
- Correct aspect ratios and resolutions
- Usage logged for analytics

---

### 1.8 Share Flow

#### Share to Social Media
- [ ] From trailer page, click "Share" button
- [ ] Verify share panel displays with platforms:
  - YouTube
  - Instagram
  - Facebook
  - Twitter
  - LinkedIn
  - WhatsApp
  - Email
  - TikTok

#### Test Platform Shares
- [ ] Click "YouTube" button
- [ ] Verify YouTube upload page opens in new tab
- [ ] Verify share tracked (POST /api/trailers/[id]/share)
- [ ] Verify toast: "Share to YouTube tracked successfully!"
- [ ] Close YouTube tab
- [ ] Repeat for 2-3 other platforms

#### Test Copy Link
- [ ] Click "Copy Link" button
- [ ] Verify toast: "Link copied to clipboard!"
- [ ] Paste in another browser tab
- [ ] Verify trailer loads at public URL

#### Test Embed Code
- [ ] Click "Get Embed Code" button
- [ ] Verify embed code displays:
```html
<iframe src="https://booktrailerpro.com/trailers/[id]"
        width="640" height="360"
        frameborder="0"
        allow="autoplay; fullscreen"
        allowfullscreen>
</iframe>
```
- [ ] Click "Copy Embed Code"
- [ ] Verify toast: "Embed code copied!"

#### Test QR Code Generation
- [ ] Click "Generate QR Code" button
- [ ] Verify QR code displays in modal
- [ ] Download QR code image
- [ ] Scan QR code with mobile device
- [ ] Verify trailer loads on mobile

#### View Share Statistics
- [ ] Navigate to trailer statistics
- [ ] Verify share counts by platform:
  - YouTube: 1 share
  - Facebook: 1 share
  - Twitter: 1 share
  - (etc.)
- [ ] Verify total shares count
- [ ] Verify recent shares list with timestamps

**Expected**:
- All platform buttons work
- Share URLs open correctly
- Share tracking works (POST succeeds)
- Share stats display correctly (GET succeeds)
- Copy/embed functionality works
- QR code generation works
- No console errors

---

## 2. PUBLISHER FLOW - Multiple Books

### 2.1 Upload Multiple Books
- [ ] Upload 3 books in different genres:
  1. "The Shadow Protocol" (Thriller)
  2. "Hearts Entwined" (Romance)
  3. "Starship Exodus" (Sci-Fi)
- [ ] Verify all 3 appear in books library
- [ ] Verify sorting options work (by date, title, genre)
- [ ] Verify search functionality works

### 2.2 Generate Multiple Trailers
- [ ] Generate trailer for each book
- [ ] Verify concurrent generation works (or queues properly)
- [ ] Verify all 3 trailers appear in trailers library
- [ ] Verify filter by genre works
- [ ] Verify filter by status works (Completed, Processing, Failed)

### 2.3 Bulk Operations
- [ ] Select multiple trailers (checkbox)
- [ ] Click "Bulk Export"
- [ ] Verify export modal with batch options
- [ ] Export all as YouTube format
- [ ] Verify all exports succeed
- [ ] Download all as ZIP file

### 2.4 Analytics Dashboard
- [ ] Navigate to `/dashboard/usage`
- [ ] Verify usage statistics display:
  - Total trailers generated
  - Total exports
  - Total shares
  - Views per trailer
  - Most popular export format
  - Most popular share platform
- [ ] Verify charts/graphs display (if implemented)
- [ ] Export analytics as CSV

**Expected**:
- Multi-book management works
- Bulk operations succeed
- Analytics accurate
- Dashboard loads quickly

---

## 3. MOBILE RESPONSIVE TESTING

### 3.1 Mobile Viewport (375px width)
- [ ] Test on iPhone SE/12/13 viewport
- [ ] Homepage displays correctly
- [ ] Navigation menu hamburger works
- [ ] Book cards stack vertically
- [ ] Scene builder works on mobile
- [ ] Video player responsive
- [ ] Forms usable on mobile
- [ ] Buttons appropriately sized (min 44x44px)

### 3.2 Tablet Viewport (768px - 1024px)
- [ ] Test on iPad viewport
- [ ] 2-column grid for books
- [ ] Navigation displays correctly
- [ ] Video player sized appropriately

### 3.3 Touch Interactions
- [ ] Test drag-and-drop scenes on touch device
- [ ] Test video player controls on touch
- [ ] Test form inputs on mobile keyboard
- [ ] Verify no hover-only interactions

**Expected**:
- All pages responsive
- Touch interactions work
- No horizontal scroll
- Readable font sizes (min 16px for body)
- Proper spacing/padding on mobile

---

## 4. ERROR HANDLING & EDGE CASES

### 4.1 Form Validation Errors
- [ ] Submit book form with empty title → Error message
- [ ] Submit with < 100 char synopsis → Error message
- [ ] Upload invalid file type (e.g., .exe) → Error message
- [ ] Upload file > 10MB → Error message
- [ ] Submit without genre selected → Error message

### 4.2 API Errors
- [ ] Disconnect internet → Show offline message
- [ ] Simulate 500 error → Show error toast
- [ ] Simulate timeout → Show timeout message
- [ ] Test retry functionality for failed requests

### 4.3 Authentication Errors
- [ ] Access protected route while logged out → Redirect to login
- [ ] Try to edit another user's book → 403 error
- [ ] Session expires during upload → Re-auth prompt

### 4.4 Empty States
- [ ] Load `/dashboard/books` with no books → Show empty state with CTA
- [ ] Load `/dashboard/trailers` with no trailers → Show empty state
- [ ] Load music library with no tracks → Show empty state

### 4.5 Loading States
- [ ] Verify skeleton loaders display during fetch
- [ ] Verify progress bars update correctly
- [ ] Verify loading spinners appear for async operations
- [ ] No "flash of unstyled content"

**Expected**:
- All errors handled gracefully
- Clear error messages
- Helpful suggestions for resolution
- No app crashes
- Users never see blank pages

---

## 5. PERFORMANCE TESTING

### 5.1 Page Load Times
- [ ] Homepage loads in < 2 seconds
- [ ] Dashboard loads in < 3 seconds
- [ ] Video player ready in < 1 second

### 5.2 API Response Times
- [ ] `POST /api/books` responds in < 500ms
- [ ] `GET /api/books` responds in < 300ms
- [ ] `POST /api/trailers/generate` responds in < 1s (queues job)
- [ ] `GET /api/trailers/[id]/status` responds in < 200ms

### 5.3 Bundle Size
- [ ] Check bundle analyzer
- [ ] Verify main bundle < 300KB (gzipped)
- [ ] Verify images optimized (WebP format)
- [ ] Verify code splitting works

**Expected**:
- Fast page loads
- Quick API responses
- Optimized bundles
- Good Lighthouse scores (> 80)

---

## 6. ACCESSIBILITY TESTING

### 6.1 Keyboard Navigation
- [ ] Tab through entire page
- [ ] All interactive elements focusable
- [ ] Visible focus indicators
- [ ] Skip to content link works

### 6.2 Screen Reader Testing
- [ ] Test with VoiceOver (Mac) or NVDA (Windows)
- [ ] All images have alt text
- [ ] Form labels properly associated
- [ ] ARIA labels on complex components

### 6.3 Color Contrast
- [ ] All text meets WCAG AA standards (4.5:1 contrast)
- [ ] Focus indicators visible
- [ ] Error messages distinguishable

**Expected**:
- WCAG 2.1 AA compliance
- Fully keyboard accessible
- Screen reader friendly

---

## 7. BROWSER COMPATIBILITY

### 7.1 Desktop Browsers
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### 7.2 Mobile Browsers
- [ ] Safari iOS (latest)
- [ ] Chrome Android (latest)

**Expected**:
- All features work across browsers
- No browser-specific bugs
- Consistent appearance

---

## 8. SECURITY TESTING

### 8.1 Authentication
- [ ] Test XSS in form inputs (escaped correctly)
- [ ] Test SQL injection in inputs (Prisma protects)
- [ ] Verify JWT tokens expire correctly
- [ ] Test CSRF protection on POST requests

### 8.2 Authorization
- [ ] Verify users can't access others' books
- [ ] Verify users can't delete others' trailers
- [ ] Test admin route protection
- [ ] Test API endpoint auth

### 8.3 File Upload Security
- [ ] Test malicious file upload (blocked)
- [ ] Verify file type validation (client + server)
- [ ] Verify file size limits enforced
- [ ] Test path traversal attacks (blocked)

**Expected**:
- No security vulnerabilities
- Proper input sanitization
- Strong auth/authz
- Secure file handling

---

## 9. DATABASE & DATA INTEGRITY

### 9.1 Data Persistence
- [ ] Create book → Verify in database (Prisma Studio)
- [ ] Edit scene → Verify changes saved
- [ ] Delete trailer → Verify cascade delete (scenes deleted)
- [ ] Test database rollback on error

### 9.2 Concurrent Operations
- [ ] Multiple users create books simultaneously
- [ ] Multiple trailers generating at once
- [ ] Verify no data corruption
- [ ] Verify proper transaction handling

**Expected**:
- All data persists correctly
- No data loss
- Referential integrity maintained
- Proper error handling

---

## 10. REPLICATE INTEGRATION

### 10.1 Video Generation
- [ ] Test MiniMax Video-01 API call
- [ ] Verify prompt generation (scenes → video prompt)
- [ ] Verify video URL returned
- [ ] Verify video download succeeds
- [ ] Test different styles generate different aesthetics

### 10.2 Webhook Handling
- [ ] Verify webhook endpoint `/api/webhooks/replicate` works
- [ ] Test successful completion webhook
- [ ] Test error webhook
- [ ] Verify status updates in database

### 10.3 Error Scenarios
- [ ] API key invalid → Clear error message
- [ ] Quota exceeded → Clear error message
- [ ] Generation timeout → Retry mechanism
- [ ] Webhook fails → Status still updates via polling

**Expected**:
- Replicate API integration works
- Video generation succeeds
- Webhooks processed correctly
- Errors handled gracefully

---

## TEST RESULTS SUMMARY

### Pass/Fail Criteria

**PASS**: ✅ All critical functionality works, no blocking bugs
**FAIL**: ❌ Critical bugs found, deployment blocked

| Category | Status | Notes |
|----------|--------|-------|
| Author Flow | [ ] PASS / [ ] FAIL | |
| Publisher Flow | [ ] PASS / [ ] FAIL | |
| Mobile Responsive | [ ] PASS / [ ] FAIL | |
| Error Handling | [ ] PASS / [ ] FAIL | |
| Performance | [ ] PASS / [ ] FAIL | |
| Accessibility | [ ] PASS / [ ] FAIL | |
| Browser Compat | [ ] PASS / [ ] FAIL | |
| Security | [ ] PASS / [ ] FAIL | |
| Database | [ ] PASS / [ ] FAIL | |
| Replicate Integration | [ ] PASS / [ ] FAIL | |

### Critical Bugs Found
```
1. [BUG-001] Description...
2. [BUG-002] Description...
```

### Minor Issues Found
```
1. [ISSUE-001] Description...
2. [ISSUE-002] Description...
```

### Recommendations
```
1. Fix critical bugs before deployment
2. Address minor issues in post-launch updates
3. Monitor error rates in production
4. Set up alerts for API failures
```

---

## NEXT STEPS

- [ ] Fix all critical bugs found during testing
- [ ] Document known minor issues
- [ ] Update PROJECT_STATUS.md with test results
- [ ] Proceed to Phase 10: Deployment

---

**Created**: 2025-11-14
**Last Updated**: 2025-11-14
**Version**: 1.0
**Testers**: Development team
