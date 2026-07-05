# Design brief — personal portfolio site

## Design read
A personal portfolio for one person, built for future employers/collaborators
to quickly read career history, current projects, and interests; register is
cinematic and quietly confident, not corporate-resume flat.

## Concept spine
**Archive / dossier.** The site reads like a curated production reel on the
subject: folio numbers, frame/format annotations, timestamped chrome around a
single-shot cinematic hero film of the subject. Career history, projects, and
interests are "reels" in that dossier, not resume bullets.

## Delivery tier
**Cinema** (default for portfolio/brand). Lenis + GSAP ScrollTrigger, one
Tier-1 hero mechanic, motivated scroll-chapter reveals elsewhere. No WebGL/3D
second beat (spectacle not warranted here).

## Locked palette
Near-black ground `#0b0906` / `#141110`, warm amber-orange rim accent
`#e8792a` (secondary ember `#c25a1f` for pressed/hover states), warm off-white
text `#f3ede2`. **This is normally a banned default family (graphite +
amber/ember) — override is deliberate**: the user supplied their own reference
imagery and wrote the hero's motion prompt around a literal warm-orange rim
light sweep, so the accent is a direct, explicit brand choice, not a generic
reach. No neon, no purple, no second accent hue.

## Locked type
Display: a compressed/condensed grotesk (e.g. **Anton**-class, tight
tracking, all-caps) for the name lockup and section headlines — reads as
"credits" typography, matches the dossier spine.
Meta/labels/body-support: a monospace (e.g. **JetBrains Mono**) for folio
tags, frame counters, nav, timestamps — never for body copy.
Body copy: a plain grotesk (e.g. **Inter Tight**) at readable weight — the
condensed face is display-only, never long-form text.

## Tier-1 technique
**A1 — Single-shot hero scrub** (wow-catalog, Film scrub family). The
approved hero video (seedance_2_0, subject still with arms crossed, camera
push-in + left-right parallax dolly, amber rim light sweeping right-to-left)
is extracted to a frame sequence and bound to the hero's pinned
ScrollTrigger progress: scrolling plays the film. This directly enacts the
concept spine (dossier = "reel you play by scrolling through it") and is the
literal effect the user asked for. Mobile: shorter pin distance, same frame
sequence, no cursor-only affordances.

## Section plan
1. **Hero** — image-as-canvas full-bleed film scrub. Composition anchor:
   image-as-canvas. Chrome: folio tag top-left, format/frame-count tag
   top-right, name lockup + one-line tagline centered-low, nav top bar.
2. **Career history** — poster-stacked chapter list (D2-lite): each role is
   a full-width row with big role/company type and a short line, ordered
   newest first. Composition anchor: top-left lead per row.
3. **Current projects** — asymmetric editorial grid (2-col zigzag, max 2 in
   a row, no equal 3-col trio). Composition anchor: off-grid offset.
4. **Interests** — diagonal staggered small-tile masonry, denser/lighter
   section. Composition anchor: stacked center.
5. **Contact** — oversized statement + single CTA, minimal chrome.
   Composition anchor: centered statement (acceptable here — closing beat).

4 distinct layout families across 5 sections, no consecutive repeats.

## Asset plan
- Hero visual: 1 approved still (already sourced from the user's own photo)
  + seedance_2_0 video, frame-extracted for the scrub (public/frames/hero/).
- Section plates: 2 atmospheric plates (dark amber-graded grain/gradient) for
  career + interests section backgrounds.
- Custom icon set: one sheet, 8 glyphs (career/briefcase, project/terminal,
  interest markers, contact/mail, arrow, external-link, play, folio-mark),
  2px stroke, amber-on-dark, sliced + background-removed.
- Logo/monogram: generated initials monogram fallback (user has no existing
  logo) for nav mark + favicon family + OG card.
- OG card: 1200x630 dossier-styled card.

## CTA inventory
- **"View project"** — project card link, arrow-underline garment, own
  hover-slide interaction. Used only on project cards.
- **"Get in touch"** — single site-wide contact intent label: nav link
  (text underline garment) + contact section CTA (filled amber button,
  distinct press/hover physics). Same label, two garments, one intent.

## Content status
Career history, current projects, and interests are placeholder copy by
explicit request — clearly editable placeholder sentences, not lorem ipsum,
labeled for the user to replace with real content later. Name lockup uses
"YOUR NAME" as an explicit placeholder pending the user's real name.
