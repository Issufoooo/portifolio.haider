# Portfolio — Documentation

High-end personal portfolio built with **React + TypeScript + Tailwind CSS**.

---

## Quick Start

```bash
npm install
npm run dev       # dev server → http://localhost:3000
npm run build     # production build
npm run preview   # preview production build
```

---

## Project Structure

```
/portfolio
  /public/assets
    /websites/         ← Web project images & videos
    /designs/
      /company1/
        /work1-1/      ← Design work images
        /work1-2/
      /company2/
        ...
    /profile/          ← Your profile photo
  /src
    /hooks             ← useInView, useMobile
    /data              ← All editable content
    /components        ← Reusable UI components
    /sections          ← Page sections (1 file per section)
    App.tsx            ← Root — section order lives here
    index.css          ← All custom CSS + animations
```

---

## ① Where to Replace Images

### Profile photo
Place your photo at:
```
/public/assets/profile/photo.jpg
```
Reference in `src/sections/AboutContact.tsx`:
```tsx
image="/assets/profile/photo.jpg"
```

### Web project previews
Place files at:
```
/public/assets/websites/website1-preview.jpg
/public/assets/websites/website1-video.mp4   ← optional
/public/assets/websites/website2-preview.jpg
...
```
Reference in `src/data/projects.ts` → `preview` and `video` fields.

### Design portfolio images
Place files at:
```
/public/assets/designs/company1/work1-1/img1.jpg
/public/assets/designs/company1/work1-1/img2.jpg
/public/assets/designs/company1/work1-2/img1.jpg
...
```
Reference in `src/data/companies.ts` → `coverImage` and `images[]` fields.

> **Image format tips:**
> - Use `.jpg` or `.webp` for photos (better compression)
> - Recommended sizes: previews at 1200×750px, design images at 1400×1050px
> - Keep files under 500KB when possible

---

## ② Where to Replace Videos

Web project videos go in `/public/assets/websites/`. In `src/data/projects.ts`, set:
```ts
video: '/assets/websites/website1-video.mp4',
```
If `video` is set, the modal shows an auto-playing muted loop inside the phone mockup.
If not set, it falls back to the `preview` image.

---

## ③ Where to Edit Text

### Hero section
File: `src/sections/Hero.tsx`
- Headline, subheadline, stats row → edit inline JSX text

### Services
File: `src/sections/Services.tsx`
- `SERVICES` array → edit `title`, `tagline`, `description`, `points[]`

### About / Bio
File: `src/sections/AboutContact.tsx`
- `name`, `role`, `location`, `bio` props on `<ProfileCard />`
- Also edit the process steps list in the same file

### Thinking section
File: `src/sections/Thinking.tsx`
- `LINES`, `QUESTIONS`, closing blockquote → edit inline JSX

### Final CTA
File: `src/sections/FinalCTA.tsx`
- Headline and sub-statement → edit inline JSX

---

## ④ Where to Edit Links

### Social / contact links
File: `src/sections/AboutContact.tsx`

Find `PROFILE_LINKS` and `SOCIAL_LINKS` arrays:
```ts
const PROFILE_LINKS: ProfileLink[] = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/yourhandle', ... },
  ...
];

const SOCIAL_LINKS: SocialLink[] = [
  { id: 'email', label: 'hello@seuemail.com', href: 'mailto:hello@seuemail.com', ... },
  { id: 'whatsapp', label: 'WhatsApp', href: 'https://wa.me/258840000000', ... },
  ...
];
```

### Project live links
File: `src/data/projects.ts`
Set `link: 'https://yourliveurl.com'` per project.

### Nav links
File: `src/components/Navbar.tsx`
```ts
const NAV_LINKS = [
  { label: 'Trabalhos', href: '#web-projects' },
  ...
];
```

---

## ⑤ How to Add Web Projects

Open `src/data/projects.ts` and add an object to `webProjects[]`:

```ts
{
  id: 'project-5',           // unique ID
  name: 'Nome do Projeto',
  description: 'Descrição curta.',
  preview: '/assets/websites/website5-preview.jpg',
  video: '/assets/websites/website5-video.mp4',   // optional
  link: 'https://seusite.com',                    // optional
  tags: ['Web App', 'SaaS'],
  problem: 'O problema que existia...',
  solution: 'A solução que desenvolvi...',
  result: 'O resultado obtido...',
},
```

Then place the image at `/public/assets/websites/website5-preview.jpg`.

> Note: The section renders a 2-column grid. It works best with 2 or 4 projects.

---

## ⑥ How to Add Companies

Open `src/data/companies.ts` and add to `companies[]`:

```ts
{
  id: 'company-4',
  name: 'Nome da Empresa',
  industry: 'Sector',
  description: 'Breve descrição do projeto.',
  year: '2024',
  works: [],   // add works below
},
```

Create the folder:
```
/public/assets/designs/company4/
```

---

## ⑦ How to Add Works to a Company

Inside a company's `works[]` array:

```ts
{
  id: 'work-4-1',
  label: '4.1',
  name: 'Nome do Trabalho',
  description: 'Descrição do que foi feito.',
  coverImage: '/assets/designs/company4/work4-1/img1.jpg',
  images: [
    '/assets/designs/company4/work4-1/img1.jpg',
    '/assets/designs/company4/work4-1/img2.jpg',
    '/assets/designs/company4/work4-1/img3.jpg',
  ],
},
```

Then place images at:
```
/public/assets/designs/company4/work4-1/img1.jpg
/public/assets/designs/company4/work4-1/img2.jpg
...
```

The 3D gallery renders automatically. More works = wider carousel radius.

---

## ⑧ How Responsiveness Is Handled

### Breakpoints (Tailwind defaults)
| Name | Width |
|------|-------|
| `sm` | ≥640px |
| `md` | ≥768px |
| `lg` | ≥1024px |
| `xl` | ≥1280px |

### Strategy used

| Component | Mobile | Desktop |
|-----------|--------|---------|
| Navbar | Hamburger overlay menu | Inline links + CTA |
| Hero | Stacked, smaller font | Full layout, large type |
| Quick Proof | 2-column grid | 4-column grid |
| Services | Vertical accordion (tap to expand) | Horizontal flex-expand (hover) |
| Web Projects | 1-column | 2-column grid |
| Design Portfolio | Vertical stack | 3-column grid |
| 3D Gallery | 2-column flat grid | 3D CSS carousel with drag |
| Project Modal | Stacked (mockup below info) | Two columns |
| About | Stacked | Two columns |
| Testimonials | 1-column | 3-column grid |

### `useMobile` hook
`src/hooks/useMobile.ts` — listens to `matchMedia`, updates on resize. Used by:
- `ThreeDGallery` → switches to grid at `< 900px`
- `FlexExpandCards` → changes to tap-toggle at `< 768px`

### Touch interactions
- All buttons are `min-height: 44px` equivalent (Tailwind `py-3` minimum)
- Modals work on small screens with `overflow-y: auto`
- 3D gallery registers `touchstart` / `touchmove` for drag-rotation

---

## Design Tokens

Defined in `tailwind.config.js`:

| Token | Value | Usage |
|-------|-------|-------|
| `canvas` | `#0A0F1C` | Page background |
| `canvas-light` | `#0F1628` | Alternate section bg |
| `canvas-card` | `#111827` | Card backgrounds |
| `primary` | `#2563EB` | Blue-600 primary |
| `secondary` | `#3B82F6` | Blue-500 secondary |

Text uses standard Tailwind: `gray-200` (primary text), `gray-400` (secondary), `gray-500` (muted).

---

## Customising Colors

Change the design system in two places:

1. `tailwind.config.js` → update color values
2. `src/index.css` → update `rgba(37,99,235,...)` references (search & replace `37,99,235` with your new primary RGB)

---

## Adding Sections

1. Create `src/sections/MyNewSection.tsx`
2. Import and add to `src/App.tsx`:
```tsx
import MyNewSection from './sections/MyNewSection';
// inside <main>:
<MyNewSection />
```
3. Add a nav link in `src/components/Navbar.tsx` if needed.

---

## Production Checklist

- [ ] Replace all placeholder images in `/public/assets/`
- [ ] Edit personal info in `src/sections/AboutContact.tsx`
- [ ] Update links in `PROFILE_LINKS` and `SOCIAL_LINKS`
- [ ] Fill `src/data/projects.ts` with real projects
- [ ] Fill `src/data/companies.ts` with real design work
- [ ] Update `src/data/testimonials.ts` with real testimonials
- [ ] Update page `<title>` in `index.html`
- [ ] Update meta description in `index.html`
- [ ] Set favicon at `/public/favicon.svg`
- [ ] Run `npm run build` and test with `npm run preview`
