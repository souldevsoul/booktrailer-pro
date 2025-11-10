# IMAGES_SCRIPT.md - BookTrailer Pro

Image generation guide for cinematic book trailer platform.

**Brand Colors:** Indigo (#6366F1), Violet (#8B5CF6), Cyan (#06B6D4)

---

## IMAGES NEEDED (~24 total)

### LOGOS (4)
1. **logo-main.svg** - Film reel + open book, indigo/violet gradient (Recraft V3 SVG)
2. **logo-icon.svg** - Icon only version, 512x512px
3. **logo-horizontal-light.svg** - For dark backgrounds
4. **logo-horizontal-dark.svg** - For light backgrounds

### HERO (2)
1. **hero-cinematic-montage.mp4** - Book covers transforming into trailer scenes (Google Veo or Luma, 10s loop, 1920x1080px)
2. **hero-author-watching.png** - Author watching their trailer on laptop, amazed expression (FLUX Pro, 1200x900px)

### FEATURE ICONS (7)
(Recraft V3, 256x256px SVG, indigo/violet/cyan)
1. **icon-ai-scenes.svg** - AI brain with film frames
2. **icon-styles.svg** - Multiple film style cards fanned out
3. **icon-music.svg** - Musical note with waveform
4. **icon-text-overlay.svg** - Text "A" overlaying film frame
5. **icon-export.svg** - Multiple aspect ratio frames
6. **icon-social.svg** - Share arrows to social platforms
7. **icon-analytics.svg** - Bar chart with views/shares

### GENRE TRAILER EXAMPLES (6)
(Google Veo-3.1 or Luma Ray, 30s trailers, 1920x1080px)
**Note:** These are actual demo trailers to showcase on homepage
1. **trailer-thriller.mp4** - Dark, tense, rapid cuts, pulsing music
2. **trailer-romance.mp4** - Soft, intimate, sweeping romantic score
3. **trailer-scifi.mp4** - Futuristic, electronic music, space scenes
4. **trailer-fantasy.mp4** - Magical, orchestral, medieval aesthetics
5. **trailer-mystery.mp4** - Shadowy, haunting music, clues revealed
6. **trailer-literary.mp4** - Artistic, contemplative, character-driven

### GENRE STYLE EXAMPLES (5)
(FLUX Pro, cinematic book scenes, 1920x1080px)
1. **style-dramatic.png** - High tension scene with fast motion blur
2. **style-epic.png** - Grand sweeping landscape with hero silhouette
3. **style-intimate.png** - Close-up character moment, soft lighting
4. **style-suspenseful.png** - Dark corridor with mystery figure
5. **style-whimsical.png** - Colorful fantasy world with magical elements

### UI MOCKUPS (4)
(FLUX Pro, realistic app screenshots, 1920x1080px)
1. **mockup-book-uploader.png** - Book upload interface with drag-drop zone
2. **mockup-scene-builder.png** - Scene editing interface with timeline
3. **mockup-style-selector.png** - Grid of trailer style cards
4. **mockup-trailer-preview.png** - Video player with download/share buttons

### TESTIMONIALS (3)
(FLUX Pro, 400x400px, professional author photos)
1. **testimonial-sarah.jpg** - Woman in 40s with glasses, holding thriller book
2. **testimonial-james.jpg** - Man in 50s at desk, fantasy books visible
3. **testimonial-emma.jpg** - Young woman in 20s with laptop, cheerful

---

## REPLICATE PROMPTS

### Logo Main (Recraft V3 SVG)
```
Model: recraft-ai/recraft-v3-svg
Prompt: "Professional logo design for 'BookTrailer Pro'. Film reel on left side merging with open book on right. Cinematic clapperboard integrated. Indigo (#6366F1) to violet (#8B5CF6) gradient. Modern, creative, Hollywood-inspired. Vector style, clean lines, minimal details."
Parameters: { "style": "digital_illustration", "size": "1024x1024" }
```

### Hero Cinematic Montage (Google Veo or Luma)
```
Model: google/veo-3.1 (or luma/ray)
Prompt: "Cinematic video montage. Multiple book covers float in dark space with dramatic lighting. Covers open and transform into vivid movie-like scenes: thriller chase, romantic embrace, sci-fi spaceship, fantasy castle, mystery detective. Smooth transitions with particle effects. Indigo and violet color grading. 10-second seamless loop. Professional film trailer quality."
Parameters: { "duration": 10, "aspect_ratio": "16:9", "quality": "high" }
```

### Hero Author Watching (FLUX Pro)
```
Model: black-forest-labs/flux-pro
Prompt: "Professional lifestyle photography. Woman author in her 40s sitting at modern desk, laptop open showing video player with book trailer. Her expression is amazed and delighted. Cozy home office with bookshelves in background. Natural window light from left. Warm, authentic moment. High-end product photography quality."
Parameters: { "aspect_ratio": "4:3", "safety_tolerance": 2 }
```

### Feature Icons (Recraft V3 SVG) - Examples
```
Model: recraft-ai/recraft-v3-svg

Icon 1 - AI Scenes:
Prompt: "Minimalist icon of AI brain with film strip frames emerging from it. Indigo (#6366F1) brain, violet film frames. Tech-creative fusion. 256x256px."

Icon 2 - Styles:
Prompt: "Minimalist icon of multiple film style cards fanned out like poker cards. Each card shows different genre symbol. Violet gradient. 256x256px."

Icon 3 - Music:
Prompt: "Minimalist icon of musical note with audio waveform. Cyan (#06B6D4) accent. Clean, modern design. 256x256px."

Icon 4 - Text Overlay:
Prompt: "Minimalist icon of large letter 'A' overlaying film frame rectangle. Typography focus. Indigo color. 256x256px."

Icon 5 - Export:
Prompt: "Minimalist icon showing three aspect ratio frames: landscape, portrait, square. Stacked with subtle perspective. Violet gradient. 256x256px."

Icon 6 - Social:
Prompt: "Minimalist icon of share arrow branching to YouTube, Instagram, TikTok, Facebook logos. Cyan accents. 256x256px."

Icon 7 - Analytics:
Prompt: "Minimalist icon of bar chart with upward trend. Views and shares symbols. Indigo gradient. 256x256px."
```

### Genre Trailer Examples (Google Veo-3.1)
```
Model: google/veo-3.1

Trailer 1 - Thriller:
Prompt: "30-second cinematic book trailer for psychological thriller. Dark urban setting at night. Fast cuts: shadowy figure in alley, woman looking over shoulder fearfully, phone with threatening text, running footsteps in rain. Rapid heartbeat sound design. Dark blue and black color grading. Tense pulsing music. Text overlay: 'Some secrets should stay buried.' Professional Hollywood trailer quality."

Trailer 2 - Romance:
Prompt: "30-second cinematic book trailer for contemporary romance. Soft golden hour lighting. Slow elegant cuts: couple's hands touching, coffee shop meet-cute, walking in park, almost-kiss moment, sunset embrace. Warm pink and golden tones. Sweeping romantic piano score. Text overlay: 'Love finds you when you least expect it.' Professional romantic film quality."

Trailer 3 - Sci-Fi:
Prompt: "30-second cinematic book trailer for space opera sci-fi. Deep space setting with stars and nebulae. Medium-paced cuts: sleek spaceship flying, futuristic city skyline, holographic interface, alien planet landscape, space battle. Cool blue and cyan color grading. Electronic orchestral score. Text overlay: 'The future of humanity lies among the stars.' Professional blockbuster quality."

Trailer 4 - Fantasy:
Prompt: "30-second cinematic book trailer for epic fantasy. Medieval and magical setting. Dynamic cuts: ancient castle on mountain, character wielding glowing sword, magical spell effects, dragon flying, army marching. Rich purple and gold tones. Epic orchestral music with choir. Text overlay: 'Destiny awaits those brave enough to seek it.' Professional fantasy film quality."

Trailer 5 - Mystery:
Prompt: "30-second cinematic book trailer for detective mystery. Moody noir atmosphere. Medium cuts: detective examining clues, vintage typewriter with case notes, shadowy suspect, rainy city street, old mansion, revelation moment. Muted colors with selective red accents. Haunting piano and strings. Text overlay: 'Every clue leads to darker truths.' Professional mystery thriller quality."

Trailer 6 - Literary Fiction:
Prompt: "30-second cinematic book trailer for literary fiction. Artistic and contemplative mood. Slow thoughtful cuts: character staring out rainy window, walking through autumn leaves, handwritten letter being read, old photographs, quiet cafe moment, meaningful glance. Natural colors with slight desaturation. Gentle piano and acoustic guitar. Text overlay: 'Sometimes the quietest stories speak the loudest.' Art house film quality."

Parameters for all: { "duration": 30, "aspect_ratio": "16:9", "quality": "high" }
```

### Style Examples (FLUX Pro)
```
Model: black-forest-labs/flux-pro

Style 1 - Dramatic:
Prompt: "Cinematic action scene with motion blur. Character running through explosive environment with debris flying. High contrast lighting. Fast movement. Dramatic tension. Film grain. Anamorphic lens flare. Professional action movie cinematography."

Style 2 - Epic:
Prompt: "Grand sweeping landscape with lone hero silhouette on mountain peak. Vast vista stretching to horizon. Golden hour lighting. Majestic clouds. Epic scale and scope. Widescreen cinematic composition. Professional fantasy epic cinematography."

Style 3 - Intimate:
Prompt: "Close-up character portrait with soft window light. Emotional vulnerable moment. Shallow depth of field with bokeh background. Warm gentle lighting. Tender atmosphere. Professional indie drama cinematography."

Style 4 - Suspenseful:
Prompt: "Dark corridor with mysterious figure at end. Atmospheric fog. Single dramatic light source creating long shadows. Tension and foreboding. Cool color temperature. Professional thriller cinematography."

Style 5 - Whimsical:
Prompt: "Colorful magical fantasy world with floating islands and glowing particles. Vibrant saturated colors. Playful lighting. Magical creatures in foreground. Dreamy ethereal quality. Professional animated fantasy film quality."

Parameters for all: { "aspect_ratio": "16:9", "safety_tolerance": 2 }
```

### UI Mockups (FLUX Pro)
```
Model: black-forest-labs/flux-pro

UI 1 - Book Uploader:
Prompt: "Modern web application UI mockup for book upload screen. Large drag-and-drop zone with dashed indigo border. Book cover placeholder icon. Form fields for title, author, genre dropdown, synopsis text area. Indigo (#6366F1) primary buttons. Clean professional interface. Laptop screen view."

UI 2 - Scene Builder:
Prompt: "Modern web application UI showing scene editing interface. Horizontal timeline at bottom with 6 scene cards. Each card shows thumbnail, text preview, duration slider. Drag handles visible. Left sidebar with 'Add Scene' button. Violet (#8B5CF6) accents. Professional video editing software style."

UI 3 - Style Selector:
Prompt: "Modern web application UI showing trailer style gallery. Grid of 5 large style cards: Dramatic, Epic, Intimate, Suspenseful, Whimsical. Each card has preview image and description. Hover state shown on one card with indigo glow. Clean dashboard design."

UI 4 - Trailer Preview:
Prompt: "Modern web application UI showing video player interface. Large centered video player with book trailer playing. Below player: Download HD button, Share to Social buttons (YouTube, Instagram, TikTok icons), View Analytics link. Cyan (#06B6D4) accent colors. Professional media player design."

Parameters: { "aspect_ratio": "16:9", "safety_tolerance": 2 }
```

### Testimonial Photos (FLUX Pro)
```
Model: black-forest-labs/flux-pro

Testimonial 1 - Sarah:
Prompt: "Professional author portrait. Woman in her 40s with glasses and warm smile, holding thriller novel with dark cover. Home office background with bookshelves. Natural window lighting. Confident and successful demeanor. Lifestyle photography quality."

Testimonial 2 - James:
Prompt: "Professional author portrait. Man in his 50s with salt-and-pepper beard at organized desk. Fantasy novels visible on shelves behind him. Modern home office. Natural lighting. Professional and authoritative presence. Publisher vibes. Lifestyle photography quality."

Testimonial 3 - Emma:
Prompt: "Professional author portrait. Young woman in her 20s with bright cheerful expression, laptop showing video editing interface. Cozy creative workspace with plants. Natural window light. Energetic and optimistic. Young author vibes. Lifestyle photography quality."

Parameters: { "aspect_ratio": "1:1", "safety_tolerance": 2 }
```

---

**Total Cost Estimate:** ~$3.50 (Replicate API)
- 6 video trailers @ $0.40 each = $2.40
- Images & SVGs = $1.10

**Generation Time:** 3-4 hours (video generation is slower)
**Storage:** ~400MB total (mostly video files)

---

## NOTES FOR GENERATION

1. **Video Priority:** Generate the 6 genre trailers first as they take longest (5-10 minutes each)
2. **Brand Colors:** Ensure indigo, violet, and cyan appear consistently across all designs
3. **Cinematic Quality:** All trailers should feel like professional movie trailers, not amateur slideshows
4. **Emotion:** Each genre should evoke the right emotional response
5. **Music:** Source appropriate background music for each genre (thriller: tension, romance: sweeping, etc.)
6. **Real Trailers:** The 6 genre examples should be actual usable trailers to demo the product
7. **Book Covers:** For demo trailers, generate fictional but professional-looking book covers
8. **Professional Photography:** Testimonials should look like real professional author headshots

---

**Ready for batch generation via Replicate API**
