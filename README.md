# Eastside Philosophy Website — Developer README

**Version in use: v1** (`git tag: v1`, commit `f274679`)
**Local dev server:** `http://192.168.1.46:8888/index.html`

---

## How to Recover This Version

If you've made changes and want to get back to the v1 state (the clean, working version):

```bash
# Option A: Hard reset — throws away all uncommitted changes and returns to v1
git reset --hard v1

# Option B: Check out v1 files without moving HEAD (inspect only)
git checkout v1

# Option C: See what's changed since v1
git diff v1
```

To save a new version before making changes (so you can revert to THAT later):
```bash
git add -A && git commit -m "your description here"
git tag v2   # or whatever version name you want
```

---

## What v1 Is

v1 is the **fully working, animation-free version** of the site. All pages load instantly with no scroll-triggered fade-in animations, and hover effects are correctly limited to subtle color/underline changes (no yellow text, no lift transforms on team cards).

### What was fixed to reach v1
- **All pages**: Added `el.style.transition = 'none'` to the inline `<script>` at the top of each page's `<body>`. This runs on DOMContentLoaded and strips CSS transitions off `.section`, `.lecture-card`, `.team-card`, `.resource-item`, `.event-card`, and `.forum-placeholder` elements — killing both scroll-fade animations and hover color shifts.
- **`lectures.html`**: Was missing the `transition: 'none'` line that all other pages had. Added it.
- **`about.html`**: Had an inline `<style>` block with `.team-card:hover` rules causing cards to lift (`translateY(-8px) scale(1.03)`) and names to turn gold on hover. Removed the transform and color hover rules. Also extended the JS cleanup to hit child elements `.team-avatar` and `.team-card h3` (they had their own `transition:` CSS that was being missed).
- **`animations.js`**: Stripped down to nav dropdown click support and scroll transparency only — no scroll-triggered animation logic.

---

## File Structure

```
esp-website/
├── index.html          — Home page (PLATO-style offering banners)
├── lectures.html       — Lectures page with talk write-ups + downloads
├── interviews.html     — Interviews page (Jeff Behrends, future guests)
├── forum.html          — Forum placeholder
├── resources.html      — Resource library (presentations, toolkits)
├── about.html          — About Us + team bios (modal popup on card click)
├── join.html           — Get Involved (contact form via FormSubmit)
├── styles.css          — Global styles (all pages share this)
├── animations.js       — Nav dropdown + scroll transparency only
└── images/             — All photos and logos
    ├── crest.png           — Nav logo (owl crest, used in all pages)
    ├── aren.jpg            — Aren Loving headshot
    ├── jeffery.jpg         — Jeffery Lou headshot
    ├── hennry.jpg          — Hennry Lou headshot
    ├── lucas.jpg           — Lucas Ma headshot
    ├── gregoire.jpg        — Gregoire Keene headshot
    ├── jason.jpg           — Jason Cheng headshot
    ├── lecture-wide.jpg    — Audience photo, STEM Fair lecture
    ├── lecture-speaker.jpg — Speaker photo, STEM Fair lecture
    ├── behrends-headshot.jpg — Jeff Behrends photo
    ├── school-of-athens.jpg  — Interviews page banner
    ├── creation-of-adam.jpg  — Background for home banners
    ├── death-of-socrates.jpg — Background for home banners
    ├── wanderer.jpg          — Background for home banners
    ├── hal-9000.jpg          — Background for home banners
    ├── banner-painting.jpg   — Background for home banners
    ├── group-photo.jpg       — Group/team photo
    └── harvard-logo.png      — Harvard logo (Behrends affiliation)
```

Presentation files (`.pptx`) are also in the root directory:
- `Implications-of-Development-of-AGI.pptx`
- `Behrends-AI-Ethics.pptx`
- `Political-Philosophy.pptx`
- `Albert-Camus.pptx`
- `Immanuel-Kant.pptx`

---

## Design System

**Colors (CSS variables in `styles.css`):**
| Variable | Value | Used For |
|---|---|---|
| `--cream` | `#F0EBE3` | Page background |
| `--ivory` | `#F5F0EA` | Cards, resource items |
| `--dark-brown` | `#2C2418` | Headings, nav bg |
| `--muted-brown` | `#5C4F3D` | Body text |
| `--warm-gray` | `#8A7E6B` | Secondary text, footer |
| `--accent-gold` | `#B8976A` | Labels, links, accents |
| `--light-border` | `#E0D8CC` | Dividers, card borders |

**Fonts (Google Fonts):**
- `Cormorant Garamond` — headings, serif body (`--serif`)
- `Inter` — nav, labels, buttons, UI (`--sans`)
- `Cinzel` — used sparingly for motto text

---

## Key Implementation Notes

### Animation / Transition Disable Pattern
Every page has this script immediately after `<body>`:
```html
<script>
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.animate-on-scroll').forEach(function(el) {
    el.classList.remove('animate-on-scroll');
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
  document.querySelectorAll('.section, .lecture-card, .team-card, .resource-item, .event-card, .forum-placeholder').forEach(function(el) {
    el.style.opacity = '1';
    el.style.transform = 'none';
    el.style.transition = 'none';
  });
});
</script>
```
`about.html` also extends this to child elements:
```js
document.querySelectorAll('.team-avatar, .team-card h3').forEach(function(el) {
  el.style.transition = 'none';
});
```

### Forms
`join.html` uses [FormSubmit](https://formsubmit.co/) to handle the contact form — no backend required.
- Submissions go to `eastsidephilosophy@gmail.com` (CC: `arenloving@gmail.com`)
- Captcha is disabled (`_captcha: false`)

### Nav Dropdown (About)
The About nav item is a hover dropdown with About Us and Get Involved. Click support on mobile is handled in `animations.js`.

### Team Bios (About page)
Each team card opens a modal with the member's bio. Bios are stored in a JS object in `about.html` and rendered into a modal overlay on click. Close by clicking outside the modal or pressing Escape.

---

## Git History

| Commit | Tag | Description |
|---|---|---|
| `f274679` | `v1` | **← CURRENT** Animation-free, hover-fixed, all pages working |
| `2e3452f` | — | ESP v3 — bios, logo, Behrends, about blurb, Camus/Kant |
| `32ba60b` | — | ESP v2 — PLATO layout, animations, slideshow, team bios |
| `ab9d13a` | — | ESP v1 — initial full site with animations |

---

## Contact / Ownership

- **Organization:** Eastside Philosophy (ESP)
- **President:** Aren Loving
- **Email:** eastsidephilosophy@gmail.com
