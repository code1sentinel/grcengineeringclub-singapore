# GRC Engineering Club — Singapore Chapter

Static site for the Singapore Chapter of the GRC Engineering Club.

> A community where GRC practitioners learn and build, so that they run GRC
> that is automated, continuous, and verifiable.

## Running it

No build step, no dependencies. Open `index.html`, or serve the folder:

```
python3 -m http.server 8000
```

## Layout

```
index.html            all page content
assets/css/styles.css design tokens and layout
assets/js/main.js     sticky header, mobile nav, reveal-on-scroll
assets/img/logo.jpg   club logo (also the favicon)
assets/img/banner.png chapter banner, used for social cards
.nojekyll             serve assets as-is on GitHub Pages
```

## Deploying

GitHub Pages serves this repository directly, with no build and no CI. In
Settings, then Pages, the source is "Deploy from a branch", set to `main` at
`/ (root)`. Every push to `main` republishes the site within about a minute.

Live at https://code1sentinel.github.io/grcengineeringclub-singapore/

The `.nojekyll` file matters here. Without it Pages runs the content through
Jekyll, which skips directories it does not recognise and can drop `assets`.

There is deliberately no deploy workflow. An earlier attempt used
`actions/configure-pages` with enablement turned on, but the Actions token
cannot create a Pages site that has never existed, so it failed with
"Resource not accessible by integration" on every run. Serving straight from
the branch avoids that bootstrap problem entirely.

## Design tokens

Taken from the Singapore Chapter slide deck, so the site and the deck match.

| Token | Value | Used for |
| --- | --- | --- |
| `--orange` | `#E8650A` | Accents, eyebrows, rules, button fills |
| `--bg` | `#0D0D0D` | Page background under the dot grid |
| `--surface-raised` | `#2A2A2A` | Panels and cards |
| `--border` | `#3A3A3A` | Card borders |
| `--text` | `#F5F5F5` | Body copy |
| `--muted` | `#A0A0A0` | Secondary copy and the footer |

Typeface is Inter, matching the deck. The background reproduces the deck's
near-black canvas with a fine dot grid and a warm orange bloom.

Buttons put a near-black label on the orange fill rather than white. White on
`#E8650A` measures 3.3:1, below the WCAG AA threshold of 4.5:1; the dark label
measures 5.9:1. The deck never pairs white with orange, so nothing is lost.

## Editing content

All copy lives in `index.html` as plain markup.

- **Values** are `li.value` items in the `#values` list.
- **Meeting topics** are grouped into `article.track` blocks under `#meetings`.
  Each track has a `.track__head` and a `.topics` list of `li.topic` entries.
- **Links** point at `grcengclub.com/chapters/singapore`. Change them there
  once the chapter has its own sign-up destination.

## Accessibility

- Text meets WCAG AA contrast; the ratios were measured, not estimated.
- Headings run `h1` to `h4` in order, with one `h1`.
- The page renders fully without JavaScript. Scroll reveals are gated behind a
  `js` class on `<html>`, so nothing is hidden when scripts do not run.
- Animation is dropped under `prefers-reduced-motion`.
- There is a skip link, and the mobile menu reports state via `aria-expanded`.
