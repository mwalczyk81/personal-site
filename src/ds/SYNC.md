# Design system sync

Vendored copy of Matt's Design System. Copy-only: never edit these files by hand. Fixes go to the upstream kit first, then come back through a clean re-sync.

- Source: Design System artifact, <https://claude.ai/artifact/E2SU2aXqnLZ5r9tu5VE9Mm>
- Kit version: 1793794809-c293 (v26), taken from the RoleRadar vendored copy at `web/app/ds`
- Synced: 2026-11-05

## What is here

| Path | Use |
| --- | --- |
| `tokens.css` | Semantic `--ds-*` tokens, light and dark (`data-theme="dark"`), type, spacing, radius, shadow, and the IBM Plex `@font-face` rules. Load first. |
| `components/bundle.css` | Global focus ring, reduced motion, motion tokens, `--ds-font-*` names. Load after `tokens.css`. |
| `fonts/*.woff2` | IBM Plex Sans (variable), Serif (400, 500, 600), Mono (400, 500). |
| `README.md` | The kit's brand book. Read it before restyling anything. |

Not vendored: the React components (`components/src`). The site restyles its own markup with Tailwind utilities mapped to the semantic tokens in `src/index.css`.

## File hashes (sha256, as published)

```text
cf40a7c05062ef842822e77c87356ebcfa771388c670fec506620682046bd31d  tokens.css
894df15ebd2832d61cce810a99d6a8be08b7ab786480153eac82c72d2c39eb03  components/bundle.css
3447e398a4abcda815c68a35d349ad89ec286d633268571b18277706f1455076  README.md
08949f728dc52d528e69b1667d15c89a5686a4ee9a296ff90983985f99c380f7  fonts/ibm-plex-mono-latin-400-normal.woff2
01d285447409c8a588692162439a038b8cbd7871309ee20267b0d2d91c6e8e22  fonts/ibm-plex-mono-latin-500-normal.woff2
e2291e842cf5af167122a22881a740c7f2dda7716f1e8cd76680264f4a859470  fonts/ibm-plex-sans-latin-wght-normal.woff2
cb2c5eee2c0a43ff30d2365407c7bc8b20e3bd90720a4a64102ba0b328022a02  fonts/ibm-plex-serif-latin-400-normal.woff2
677082fc2e9ee60701b874fe5983c98ea9fb3b588cc1b02058ff9bf29ea783e4  fonts/ibm-plex-serif-latin-500-normal.woff2
e279e4f8baa0d4634d98868092f2198ae0dcd9e142c935822c385b9843352a9b  fonts/ibm-plex-serif-latin-600-normal.woff2
```
