# Personal Website — Architecture & Implementation Guide

## Vision

A visually striking personal portfolio site combining:
- **ai-2027.com's** editorial storytelling layout (long-scroll narrative, typography-forward, cinematic pacing)
- **Pretext-inspired** advanced text effects (text flowing around objects, dynamic reflow, typographic animation)
- **TouchDesigner-style** generative visuals translated to web via Three.js/WebGL (particle systems, noise fields, reactive geometry)

The result: a site that feels more like a curated art installation than a typical academic portfolio.

---

## Tech Stack

```
Framework:        Next.js 14+ (App Router, SSG for GitHub Pages)
3D / Visuals:     Three.js + custom GLSL shaders
Text Layout:      @chenglou/pretext (DOM-free text measurement for advanced typography)
Animation:        GSAP (ScrollTrigger for scroll-driven animation)
Styling:          Tailwind CSS + custom CSS for typographic fine-tuning
Font:             Inter (body) + a display serif (e.g. Playfair Display, EB Garamond, or Fraunces)
Deployment:       GitHub Pages via `gh-pages` branch (free)
Domain:           username.github.io (free) or custom domain (~$10/yr)
```

### Why this stack

| Choice | Reason |
|---|---|
| **Next.js SSG** | Static export (`next export`) deploys to GitHub Pages. React ecosystem gives access to Three.js wrappers (`@react-three/fiber`) and GSAP plugins. |
| **Three.js** | Industry standard for web 3D. Replaces TouchDesigner for generative visuals in the browser. Huge shader/effect ecosystem. |
| **Pretext** | Enables text effects impossible with CSS alone — text flowing around 3D objects, per-line text animation with exact height prediction, no layout jank. |
| **GSAP ScrollTrigger** | The gold standard for scroll-driven animation. ai-2027.com uses this pattern heavily — sections animate in as you scroll. |
| **Tailwind** | Utility-first CSS keeps the codebase small. Override with custom CSS only for typographic details. |

---

## Site Structure

```
/
├── Hero Section         — Full-viewport generative visual + name + tagline
├── About Section        — Split layout: text left, generative visual right
├── Projects Section     — Cards/panels with scroll-triggered reveals
│   ├── PACMC            — Featured project with expanded detail
│   └── Other projects   — Computational chemistry work, tools, etc.
├── Publications Section — Clean list with hover interactions
├── Contact Section      — Minimal: email, GitHub, LinkedIn, Google Scholar
└── Footer               — Small, no clutter
```

### Single-page scroll vs multi-page

Go **single-page scroll** for the main experience (like ai-2027.com) with smooth scroll-driven transitions between sections. Individual projects (like PACMC) can link out to their own GitHub repos or dedicated pages if needed.

---

## Section-by-Section Design Spec

### 1. Hero Section

**Layout:** Full viewport height. Dark background. Generative visual fills the screen.

**Generative visual options (pick one, implement with Three.js):**

- **Molecular particle field:** Thousands of particles arranged in a 3D molecular-like structure (nods to comp chem background). Particles drift slowly, connected by faint bonds. Mouse movement causes gentle displacement — particles react to cursor like a force field. Colors: muted blues, teals, white.

- **Noise flow field:** Perlin/Simplex noise-driven particle streams. Particles flow across the screen following a vector field that slowly evolves. Feels organic, like fluid dynamics. Similar to TouchDesigner flow fields but in WebGL.

- **Reaction-diffusion surface:** A slowly evolving reaction-diffusion pattern (Turing patterns) rendered on a 3D surface. Directly relevant to your chemistry background. Subtle, mesmerizing, scientifically grounded.

**Text overlay:** Your name in large display serif, tagline in smaller sans-serif. Text fades in with a slight delay after the visual loads. Use Pretext to measure text height and position it precisely over the 3D canvas without layout shift.

**Scroll cue:** Subtle downward arrow or "scroll" indicator that fades out as user scrolls.

**Implementation:**

```
three.js scene (full viewport canvas, position: fixed, z-index: 0)
  └── ShaderMaterial with custom fragment shader (noise field or particles)
  └── Raycaster for mouse interaction

HTML overlay (position: relative, z-index: 1)
  └── Name (h1, display serif, large)
  └── Tagline (p, sans-serif, smaller, slight opacity)

GSAP ScrollTrigger
  └── On scroll: fade out hero text, parallax-shift the 3D visual
```

### 2. About Section

**Layout:** Two-column on desktop. Left column: bio text (2-3 paragraphs). Right column: a smaller generative visual or a stylized photo treatment (e.g. photo with a shader overlay that makes it look like a computational visualization).

**Text style:** Body text in Inter 18px, generous line-height (1.7), max-width ~600px. Feels editorial, easy to read.

**Scroll animation:** Text paragraphs fade in and slide up slightly as they enter the viewport. Right-column visual animates continuously but subtly.

**Content:**
- Brief bio: computational/theoretical chemistry background
- What you're working on now (PACMC, regulatory tech)
- What drives you (intersection of chemistry, computation, and building tools)

### 3. Projects Section

**Layout:** Each project gets a "panel" — a full-width or near-full-width block with a dark/light alternating background. Featured project (PACMC) gets a larger, more elaborate panel.

**PACMC panel:**
- Large title with a subtle glow or gradient effect
- 2-3 sentence description
- Architecture diagram or visual (could be an SVG or a small interactive Three.js widget showing the agent pipeline)
- Links: GitHub, docs, PyPI (when available)
- Tech badges (Python, Claude API, RAG, etc.)

**Other project panels:**
- Smaller cards, arranged in a grid or stacked vertically
- Each card: title, one-line description, tech stack, links
- Hover effect: card lifts slightly, background shifts

**Scroll animation:** Projects slide in from the left or right as they enter viewport. Staggered timing for multiple cards.

**Implementation note — the Pretext opportunity:**

For the PACMC panel, use Pretext to create a text-wrapping effect where the project description *flows around* an embedded diagram or 3D object. This is the kind of editorial layout that ai-2027.com achieves with careful CSS but that Pretext makes dynamic and responsive. As the viewport resizes, text reflows in real-time around the obstacle without DOM measurement — this is the library's signature capability.

### 4. Publications Section

**Layout:** Clean, minimal list. Each publication is a row with: title, journal, year, and action links (PDF, DOI, BibTeX).

**Interaction:** Hover on a publication row → subtle highlight, maybe a small preview tooltip or expansion showing the abstract.

**Style:** Monospaced accents for journal names or years. Thin horizontal dividers between entries. No clutter.

**If no publications yet:** Use placeholder entries or label as "Coming Soon" with a note about current research areas. Better to have the section structure ready than to add it later.

### 5. Contact Section

**Layout:** Centered, minimal. Your email (as a `mailto:` link), plus icon links to GitHub, LinkedIn, Google Scholar, Twitter/X if applicable.

**Visual:** A subtle generative element — maybe the particle field from the hero reappears here in a smaller, calmer form, creating visual bookending.

---

## Generative Visuals — Implementation Detail

### Option A: Particle Noise Field (recommended starting point)

This is the most achievable and visually impactful. A field of particles (5,000–20,000) flowing through a 3D Perlin noise vector field, rendered with Three.js `Points` and a custom `ShaderMaterial`.

```
File: /components/ParticleField.tsx

Dependencies:
  - three
  - @react-three/fiber (React wrapper for Three.js)
  - @react-three/drei (helpers: OrbitControls, etc.)

Structure:
  - BufferGeometry with N particles, positions stored in Float32Array
  - Custom vertex shader: displaces particles based on noise(position + time)
  - Custom fragment shader: soft circular point, opacity falloff
  - Mouse position passed as uniform → particles repel from cursor
  - Animation loop: update time uniform each frame

Shader pseudocode (vertex):
  vec3 pos = position;
  float n = snoise(pos * 0.5 + time * 0.1);   // slow-evolving noise
  pos += normal * n * 0.3;                      // displace along noise
  
  // Mouse repulsion
  float dist = distance(pos.xy, mousePos);
  if (dist < repelRadius) {
    pos.xy += normalize(pos.xy - mousePos) * (repelRadius - dist) * 0.5;
  }
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = mix(1.0, 4.0, n);             // size varies with noise

Shader pseudocode (fragment):
  float d = distance(gl_PointCoord, vec2(0.5));
  if (d > 0.5) discard;
  float alpha = smoothstep(0.5, 0.1, d) * 0.6;
  gl_FragColor = vec4(color, alpha);            // soft glow
```

### Option B: Molecular Network (more chemistry-specific)

Particles arranged at nodes of a 3D graph structure resembling a molecular network. Edges (bonds) rendered as thin lines with `LineSegments`. The structure breathes — nodes oscillate gently, bonds stretch and compress.

This is more complex but directly signals "computational chemistry" to visitors.

### Option C: Reaction-Diffusion (most scientifically impressive, hardest)

A Gray-Scott reaction-diffusion simulation running on the GPU via ping-pong framebuffers. The pattern evolves in real-time on a 3D surface (torus, sphere, or flat plane). This is a real computational chemistry simulation running in the browser.

Impressive but significantly more work. Save for v2 if desired.

### Recommendation

Start with **Option A** (particle noise field). It's visually striking, runs smoothly on all hardware, and can be implemented in a day. Add molecular network elements (Option B) as a second pass. Keep Option C as an aspiration.

---

## Pretext Integration Plan

Pretext shines in specific places — don't use it everywhere, use it where it creates effects CSS can't.

### Where to use Pretext

1. **Hero text positioning:** Measure the title + tagline height before render, position precisely over the Three.js canvas without layout shift or FOUC (flash of unstyled content).

2. **PACMC project panel — text wrapping around obstacle:** Define a rectangular or circular exclusion zone (where a diagram or 3D widget sits), and use Pretext's `prepareWithSegments()` + `layoutNextLine()` API to flow text around the obstacle. This creates the editorial "text wraps around image" effect that ai-2027.com achieves statically, but here it's dynamic and responsive.

3. **Scroll-driven text reveal:** Use Pretext to pre-calculate line breaks, then animate text line-by-line (each line fades/slides in independently) as the user scrolls. This creates a cinematic text reveal impossible with CSS alone because CSS doesn't know where line breaks fall in a responsive layout.

### Where NOT to use Pretext

- Regular body paragraphs → just use CSS, it's fine
- Navigation → standard HTML/CSS
- Publication list → standard HTML/CSS
- Anything that doesn't need per-line control

### Installation

```bash
npm install @chenglou/pretext
```

### Basic usage pattern

```typescript
import { prepare, layout } from '@chenglou/pretext'

// One-time measurement (do this on mount or when text changes)
const prepared = prepare(paragraphText, '18px Inter')

// Layout at current container width (do this on mount + resize)
const { height, lineCount } = layout(prepared, containerWidth, 28) // 28px line-height

// Now you know exact height without DOM measurement
// Position elements, animate lines, etc.
```

---

## Scroll Animation Architecture

Using GSAP ScrollTrigger to orchestrate the full-page experience.

```
Scroll Timeline:
│
├── 0vh - 100vh:    Hero section
│   ├── 0vh:        Full opacity, particles active
│   ├── 50vh:       Text begins fade out
│   └── 100vh:      Hero fully faded, particles shift to background mode
│
├── 100vh - 200vh:  About section
│   ├── Entry:      Bio text fades in paragraph by paragraph
│   └── Midpoint:   Right-column visual reaches full animation
│
├── 200vh - 400vh:  Projects section
│   ├── PACMC:      Slides in from left, text wraps around diagram
│   └── Others:     Cards stagger in from alternating sides
│
├── 400vh - 500vh:  Publications section
│   └── Entry:      List items fade in one by one, top to bottom
│
└── 500vh - 550vh:  Contact section
    └── Entry:      Icons and email fade in, particle field softly reappears
```

### Implementation

```typescript
// Example: fade in About paragraphs on scroll
gsap.utils.toArray('.about-paragraph').forEach((el, i) => {
  gsap.from(el, {
    opacity: 0,
    y: 40,
    duration: 0.8,
    delay: i * 0.15,
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    }
  })
})
```

---

## File Structure

```
ohhmoo.github.io/
├── public/
│   ├── fonts/                     # Self-hosted Inter + display serif
│   ├── images/                    # Project screenshots, headshot
│   └── shaders/                   # GLSL shader files (if external)
│
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout (fonts, metadata, analytics)
│   │   ├── page.tsx               # Main single-page site
│   │   └── globals.css            # Tailwind base + custom typography
│   │
│   ├── components/
│   │   ├── Hero.tsx               # Hero section with Three.js canvas
│   │   ├── About.tsx              # About section
│   │   ├── Projects.tsx           # Projects grid/panels
│   │   ├── ProjectCard.tsx        # Individual project card
│   │   ├── Publications.tsx       # Publications list
│   │   ├── Contact.tsx            # Contact section
│   │   ├── Nav.tsx                # Floating nav (appears on scroll)
│   │   └── ParticleField.tsx      # Three.js generative visual component
│   │
│   ├── shaders/
│   │   ├── particles.vert.glsl    # Vertex shader for particle system
│   │   └── particles.frag.glsl    # Fragment shader for particle system
│   │
│   ├── hooks/
│   │   ├── useScrollAnimation.ts  # GSAP ScrollTrigger setup
│   │   ├── useMousePosition.ts    # Normalized mouse position for shaders
│   │   └── usePretextLayout.ts    # Pretext measurement hook
│   │
│   ├── data/
│   │   ├── projects.ts            # Project entries (title, desc, links, tech)
│   │   └── publications.ts        # Publication entries (title, journal, year, links)
│   │
│   └── lib/
│       └── pretextHelpers.ts      # Pretext utility functions
│
├── next.config.js                 # Static export config for GitHub Pages
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## Deployment to GitHub Pages (Free)

### Setup

1. Repository name: `OhhMoo.github.io` (for root site) or any repo name with GitHub Pages enabled in Settings.

2. Install the deployment package:
   ```bash
   npm install --save-dev gh-pages
   ```

3. Add to `next.config.js`:
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',           // Static HTML export
     images: { unoptimized: true }, // GitHub Pages doesn't support Next.js image optimization
     basePath: '',                // Empty for username.github.io
     // basePath: '/repo-name',  // If deploying to username.github.io/repo-name
   }
   module.exports = nextConfig
   ```

4. Add deploy script to `package.json`:
   ```json
   {
     "scripts": {
       "dev": "next dev",
       "build": "next build",
       "deploy": "next build && touch out/.nojekyll && gh-pages -d out -t true"
     }
   }
   ```
   The `.nojekyll` file tells GitHub Pages not to process the site with Jekyll (which would break Next.js output). The `-t true` flag includes dotfiles.

5. Deploy:
   ```bash
   npm run deploy
   ```

6. In GitHub repo Settings → Pages → set source to `gh-pages` branch.

7. Site live at `https://ohhmoo.github.io` within a few minutes.

### Custom domain (optional, ~$10/year)

1. Buy a domain from Namecheap, Cloudflare, or Porkbun
2. Add a `CNAME` file to `public/` with your domain name
3. Configure DNS: CNAME record pointing to `ohhmoo.github.io`
4. Enable HTTPS in GitHub Pages settings (free, automatic via Let's Encrypt)

---

## Implementation Order

### Phase 1: Scaffold + Hero (Day 1-2)
```
1. npx create-next-app@latest ohhmoo.github.io --typescript --tailwind
2. Set up file structure
3. Install: three, @react-three/fiber, @react-three/drei, gsap
4. Build ParticleField.tsx — get the generative visual running
5. Build Hero.tsx — overlay text on top of canvas
6. Deploy to GitHub Pages — get *something* live immediately
```

### Phase 2: Content Sections (Day 3-4)
```
7. Build About.tsx with scroll animations
8. Build Projects.tsx + ProjectCard.tsx
9. Build Publications.tsx
10. Build Contact.tsx
11. Add Nav.tsx (floating nav that appears after scrolling past hero)
12. Wire up GSAP ScrollTrigger for all sections
```

### Phase 3: Polish + Pretext (Day 5-7)
```
13. Install @chenglou/pretext
14. Add text-around-obstacle effect to PACMC project panel
15. Add line-by-line scroll reveal to About section
16. Fine-tune typography (font sizes, weights, spacing, colors)
17. Add cursor-reactive effects to particle field
18. Performance optimization (lazy load Three.js, reduce particle count on mobile)
19. Responsive design pass (mobile layout, reduced animations)
20. Final deploy
```

### Phase 4: Content (Ongoing)
```
21. Replace placeholder text with real bio
22. Add real project descriptions + screenshots
23. Add publications as they come
24. Iterate on visuals
```

---

## Performance Considerations

- **Three.js on mobile:** Reduce particle count from 15,000 → 3,000 on mobile. Detect with `window.innerWidth` or `navigator.userAgent`. Lower shader complexity if needed.
- **Lazy load the 3D scene:** Use `React.lazy()` or dynamic imports so the Three.js bundle doesn't block initial page load.
- **Pretext prepare() cost:** Call `prepare()` once on mount, not on every render. Cache the result. Only re-prepare if text or font changes.
- **GSAP cleanup:** Kill ScrollTrigger instances on unmount to prevent memory leaks.
- **Font loading:** Use `font-display: swap` to avoid invisible text during font load. Pretext measurements must happen *after* fonts are loaded — use `document.fonts.ready` promise.
- **Static export size:** Three.js adds ~150KB gzipped. Total bundle should stay under 500KB for fast load times.

---

## Color Palette

```
Background:       #0a0a0f (near-black with slight blue)
Surface:          #12121a (slightly lighter, for card backgrounds)
Text primary:     #e8e8ed (off-white, easier on eyes than pure white)
Text secondary:   #8888a0 (muted, for dates/metadata)
Accent:           #4a9eff (cool blue, for links and highlights)
Accent glow:      #4a9eff33 (accent at 20% opacity, for glows/shadows)
Particle color 1: #4a9eff (blue)
Particle color 2: #2dd4bf (teal)
Particle color 3: #ffffff (white, sparse)
```

Dark theme only. No light mode toggle needed — the generative visuals look best on dark backgrounds and it matches the ai-2027.com aesthetic.

---

## Typography Scale

```
Hero title:       64px / 72px line-height / display serif / weight 700
Hero tagline:     20px / 28px / Inter / weight 400 / text-secondary color
Section headers:  36px / 44px / display serif / weight 600
Body text:        18px / 28px / Inter / weight 400
Card titles:      22px / 28px / Inter / weight 600
Metadata:         14px / 20px / Inter / weight 400 / text-secondary color
Code/tech badges: 13px / monospace (JetBrains Mono or Fira Code)
```

---

## Resources & References

| Resource | URL | What it helps with |
|---|---|---|
| ai-2027.com source inspection | View source / DevTools | Scroll animation patterns, typography choices |
| Pretext demos | chenglou.me/pretext | Text-around-obstacle implementation reference |
| Pretext API docs | github.com/chenglou/pretext | `prepare()`, `layout()`, `prepareWithSegments()` |
| Three.js fundamentals | threejs.org/manual | Particle systems, shaders, BufferGeometry |
| React Three Fiber docs | docs.pmnd.rs/react-three-fiber | React integration for Three.js |
| GSAP ScrollTrigger docs | gsap.com/docs/v3/Plugins/ScrollTrigger | Scroll-driven animation API |
| Book of Shaders | thebookofshaders.com | GLSL shader fundamentals (noise, patterns) |
| Shadertoy | shadertoy.com | Shader inspiration and reference implementations |
| GitHub Pages docs | docs.github.com/en/pages | Deployment configuration |
| Next.js static export | nextjs.org/docs/app/building-your-application/deploying/static-exports | SSG configuration |
