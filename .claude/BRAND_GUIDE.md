# BookTrailer Pro - Brand Identity Guide

## 🎨 Brand Colors (CRITICAL!)

### Primary Palette

**Use ONLY these colors:**

```css
/* Primary - Purple (Creative, Literary) */
--purple-600: #9333EA;    /* Primary CTA, main brand color */
--purple-500: #A855F7;    /* Lighter variation, hover states */
--purple-700: #7E22CE;    /* Darker variation, depth */

/* Secondary - Amber (Creative Energy, Warmth) */
--amber-500: #F59E0B;     /* Secondary emphasis, creative spark */
--amber-400: #FBBF24;     /* Lighter variation */
--amber-600: #D97706;     /* Darker variation */

/* Accent - Pink (Engaging, Literary Romance) */
--pink-500: #EC4899;      /* Accent color, calls to action */
--pink-400: #F472B6;      /* Lighter variation */
--pink-600: #DB2777;      /* Darker variation */

/* Neutrals */
--slate-900: #0F172A;     /* Headings, primary text */
--slate-600: #475569;     /* Body text */
--slate-50: #F8FAFC;      /* Backgrounds */
--white: #FFFFFF;         /* Pure white */
--black: #000000;         /* Pure black (sparingly) */
```

### Gradient Combinations

**Primary Gradients:**
```tsx
bg-gradient-to-r from-purple-600 to-pink-500     // Main CTA
bg-gradient-to-r from-amber-500 to-pink-500      // Creative energy
bg-gradient-to-br from-purple-500 to-pink-500    // Hero elements
bg-gradient-to-r from-purple-600 to-purple-700   // Subtle depth
```

### Color Usage Rules

**Primary CTAs (Buttons, Links):**
- Use purple-600 or gradients with purple → pink
- Hover: Slightly darker or more saturated

**Secondary Elements:**
- Amber-500 for highlights, badges, accent elements
- Pink-500 for interactive elements, icons

**Backgrounds:**
- White or slate-50 for main backgrounds
- Very light gradients for hero sections

**Text:**
- Slate-900 for headings
- Slate-600 for body text
- White for text on dark backgrounds

---

## ❌ FORBIDDEN COLORS

**NEVER Use These:**
- ❌ Yellow alone (`yellow-*`) - too harsh
- ❌ Orange alone (`orange-*`) - conflicts with amber
- ❌ Emerald/Teal (`emerald-*`, `teal-*`) - that's LogoSmith's brand
- ❌ Blue/Indigo alone (`blue-*`, `indigo-*`) - wrong brand family
- ❌ Harsh black borders (`border-black border-4`) - too brutalist

---

## 🎭 Visual Style

### Typography

**Headings:**
```tsx
text-5xl font-bold            // Hero headings (H1)
text-4xl font-bold            // Section headings (H2)
text-3xl font-semibold        // Subsection headings (H3)
text-2xl font-semibold        // Card titles (H4)
```

**Body Text:**
```tsx
text-lg leading-relaxed       // Main body text
text-base leading-relaxed     // Secondary text
text-sm text-slate-600        // Meta text, captions
```

**Special Text:**
```tsx
text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500
// For hero headlines and special emphasis
```

### Shadows (Soft & Cinematic)

**Use these shadow classes:**
```css
shadow-soft-sm    // Subtle elevation (cards, buttons)
shadow-soft-md    // Medium elevation (modals, dropdowns)
shadow-soft-lg    // High elevation (popovers, tooltips)
shadow-soft-xl    // Hero elements, featured content

shadow-glow-purple  // Interactive glow (CTAs)
shadow-glow-pink    // Accent glow (special elements)
```

**Shadow definitions (add to globals.css):**
```css
.shadow-soft-sm {
  box-shadow: 0 1px 3px 0 rgba(147, 51, 234, 0.1),
              0 1px 2px -1px rgba(147, 51, 234, 0.1);
}

.shadow-soft-md {
  box-shadow: 0 4px 6px -1px rgba(147, 51, 234, 0.1),
              0 2px 4px -2px rgba(147, 51, 234, 0.1);
}

.shadow-soft-lg {
  box-shadow: 0 10px 15px -3px rgba(147, 51, 234, 0.15),
              0 4px 6px -4px rgba(147, 51, 234, 0.1);
}

.shadow-soft-xl {
  box-shadow: 0 20px 25px -5px rgba(147, 51, 234, 0.15),
              0 8px 10px -6px rgba(147, 51, 234, 0.1);
}

.shadow-glow-purple {
  box-shadow: 0 0 20px rgba(147, 51, 234, 0.4);
}

.shadow-glow-pink {
  box-shadow: 0 0 20px rgba(236, 72, 153, 0.4);
}
```

### Border Radius (Smooth & Modern)

**Use these rounded classes:**
```tsx
rounded-xl      // Buttons, input fields, small cards
rounded-2xl     // Medium cards, sections
rounded-3xl     // Large hero elements, featured content
rounded-full    // Badges, avatars, pill buttons
```

**Examples:**
```tsx
// Button
className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500"

// Card
className="p-8 rounded-2xl shadow-soft-md"

// Hero element
className="rounded-3xl overflow-hidden shadow-soft-xl"

// Badge
className="px-4 py-1 rounded-full bg-amber-500 text-white text-sm"
```

---

## 📐 Spacing System

### Section Padding

**Vertical spacing:**
```tsx
py-24    // Desktop sections (96px)
py-16    // Mobile sections (64px)
py-12    // Subsections (48px)
```

**Usage:**
```tsx
// Hero section
<section className="py-24 md:py-32">

// Content section
<section className="py-16 md:py-24">

// Subsection
<div className="py-12">
```

### Card Padding

```tsx
p-8     // Standard cards (32px)
p-10    // Medium cards (40px)
p-12    // Large cards (48px)
```

### Element Gaps

```tsx
gap-6    // Standard gap (24px)
gap-8    // Large gap (32px)
gap-4    // Small gap (16px)

space-y-6   // Vertical rhythm (standard)
space-y-8   // Vertical rhythm (large)
```

---

## 🎨 Component Patterns

### Primary Button

```tsx
<button className="
  px-6 py-3
  bg-gradient-to-r from-purple-600 to-pink-500
  text-white font-semibold
  rounded-xl
  shadow-soft-md hover:shadow-glow-purple
  transition-all duration-300
  hover:scale-105
">
  Create Trailer
</button>
```

### Secondary Button

```tsx
<button className="
  px-6 py-3
  bg-amber-500
  text-white font-semibold
  rounded-xl
  shadow-soft-sm hover:shadow-soft-md
  transition-all duration-300
  hover:bg-amber-600
">
  Learn More
</button>
```

### Outline Button

```tsx
<button className="
  px-6 py-3
  border-2 border-purple-600
  text-purple-600 font-semibold
  rounded-xl
  hover:bg-purple-600 hover:text-white
  transition-all duration-300
">
  View Examples
</button>
```

### Card

```tsx
<div className="
  p-8
  bg-white
  rounded-2xl
  shadow-soft-md hover:shadow-soft-lg
  transition-shadow duration-300
  border border-slate-100
">
  {/* Card content */}
</div>
```

### Gradient Card (Featured)

```tsx
<div className="
  p-8
  bg-gradient-to-br from-purple-500/10 to-pink-500/10
  rounded-2xl
  shadow-soft-lg
  border border-purple-200
">
  {/* Featured content */}
</div>
```

### Input Field

```tsx
<input className="
  w-full
  px-4 py-3
  border-2 border-slate-200
  rounded-xl
  focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20
  transition-all duration-200
  placeholder:text-slate-400
" />
```

### Badge

```tsx
<span className="
  px-3 py-1
  bg-amber-500
  text-white text-sm font-semibold
  rounded-full
  shadow-soft-sm
">
  Popular
</span>
```

---

## 🚫 Anti-Patterns (What to Avoid)

### From VoiceCraft Template

**DON'T do this:**
```tsx
// ❌ Harsh black borders
className="border-4 border-black"

// ❌ Brutalist shadows
className="shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"

// ❌ Wrong color family
className="bg-yellow-400"
className="bg-emerald-500"
className="bg-teal-500"

// ❌ Sharp corners
className="rounded-none"

// ❌ Uppercase everywhere
className="uppercase"
```

**DO this instead:**
```tsx
// ✅ Subtle borders
className="border border-slate-200"

// ✅ Soft shadows
className="shadow-soft-md"

// ✅ Correct colors
className="bg-purple-600"
className="bg-amber-500"
className="bg-pink-500"

// ✅ Smooth corners
className="rounded-xl"

// ✅ Normal case with selective emphasis
className="font-semibold"
```

---

## 🎬 Video/Media Styling

### Video Player Container

```tsx
<div className="
  relative
  rounded-2xl
  overflow-hidden
  shadow-soft-xl
  aspect-video
  bg-slate-900
">
  <video className="w-full h-full object-cover" />
</div>
```

### Video Thumbnail with Play Button

```tsx
<div className="
  relative
  rounded-2xl
  overflow-hidden
  shadow-soft-lg
  cursor-pointer
  group
">
  <img className="w-full aspect-video object-cover" />
  <div className="
    absolute inset-0
    bg-gradient-to-t from-purple-900/80 to-transparent
    flex items-center justify-center
    group-hover:bg-purple-900/60
    transition-all duration-300
  ">
    <div className="
      w-16 h-16
      bg-white
      rounded-full
      flex items-center justify-center
      shadow-glow-pink
      group-hover:scale-110
      transition-transform duration-300
    ">
      <PlayIcon className="text-purple-600" />
    </div>
  </div>
</div>
```

---

## 📱 Responsive Behavior

### Breakpoints

```tsx
// Mobile first approach
<div className="
  px-4 py-8          // Mobile
  md:px-8 md:py-16   // Tablet
  lg:px-12 lg:py-24  // Desktop
">
```

### Grid Layouts

```tsx
// Responsive grid
<div className="
  grid
  grid-cols-1           // Mobile: 1 column
  md:grid-cols-2        // Tablet: 2 columns
  lg:grid-cols-3        // Desktop: 3 columns
  gap-6 lg:gap-8
">
```

---

## ✅ Brand Checklist

Before committing any design, verify:

- [ ] Colors are ONLY purple/amber/pink (no yellow, emerald, teal)
- [ ] Shadows are soft (no harsh brutalist shadows)
- [ ] Corners are rounded (rounded-xl or higher, no sharp edges)
- [ ] Spacing is generous (py-24, gap-8, not cramped)
- [ ] Gradients use purple → pink or amber → pink
- [ ] Buttons have hover states with transitions
- [ ] Cards have subtle shadows and borders
- [ ] Typography follows the scale (text-5xl for hero, etc.)
- [ ] Mobile responsive (tested on small screens)
- [ ] No VoiceCraft remnants (microphone, waveform, yellow)

---

## 🎨 Brand Personality

**Visual Language:**
- Creative and literary (not corporate)
- Engaging and dynamic (not static)
- Professional yet approachable (not stuffy)
- Cinematic and dramatic (not minimal/boring)

**Tone:**
- Inspiring (you can bring your book to life)
- Empowering (tools for authors)
- Premium (professional quality)
- Accessible (easy to use)

---

## 📐 Layout Patterns

### Hero Section

```tsx
<section className="
  py-24 md:py-32
  bg-gradient-to-br from-purple-50 to-pink-50
">
  <div className="container mx-auto px-4">
    <h1 className="
      text-5xl md:text-7xl font-bold
      text-transparent bg-clip-text
      bg-gradient-to-r from-purple-600 to-pink-500
      mb-6
    ">
      Your Book. Your Trailer.
    </h1>
    <p className="
      text-xl md:text-2xl
      text-slate-600
      leading-relaxed
      mb-8
    ">
      AI generates instant trailers. Professionals refine to perfection.
    </p>
    {/* CTAs */}
  </div>
</section>
```

### Feature Grid

```tsx
<section className="py-24 bg-white">
  <div className="container mx-auto px-4">
    <div className="
      grid
      grid-cols-1 md:grid-cols-2 lg:grid-cols-3
      gap-8
    ">
      {features.map(feature => (
        <div className="
          p-8
          rounded-2xl
          shadow-soft-md hover:shadow-soft-lg
          transition-shadow duration-300
          border border-slate-100
        ">
          {/* Feature content */}
        </div>
      ))}
    </div>
  </div>
</section>
```

---

**Brand Colors:** Purple (#9333EA) + Amber (#F59E0B) + Pink (#EC4899)
**Visual Style:** Creative, Literary, Engaging, Cinematic
**Tone:** Inspiring, Empowering, Premium, Accessible

This is the definitive brand guide for BookTrailer Pro.
