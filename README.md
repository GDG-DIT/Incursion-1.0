# Incursion

A Next.js App Router version of the supplied hackathon website. The font, intro video, scroll-scrubbed planetary collision, lightning/glitch title reveal, Doom scenes, schedule, and sound controls are preserved. The film toolbar, chapter navigation, automatic playback mode, and “Watch film” option have been removed.

## Run locally

Use Node.js 20.9 or newer.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Enter with or without sound, optionally skip the intro, and scroll to explore.

## Verify audio behavior

```sh
npm test
```

The tests cover cue rearming after rewinds, avoiding overlapping impacts on large scroll jumps, mute behavior, fade-out, and node cleanup.

## Production

```sh
npm run build
npm start
```

Deploy as a standard Next.js project on a compatible Node.js host. This project has not been published to a hosting service.

## Edit the site

- `app/page.jsx` and `app/layout.jsx`: route, document metadata, and viewport configuration.
- `components/IncursionExperience.jsx`: React markup for the welcome screen, title, schedule, and closing section.
- `lib/content.js`: schedule dates, text, and image crops.
- `lib/collision-audio.js`: scroll-synchronized rumble, rising air, and impact cues. Uses the same sound toggle as the rest of the site.
- `lib/experience.js`: client-only scroll, canvas, video, audio, and title animation controller. Its React effect cleans up listeners, animation frames, timers, media playback, and the audio context on unmount, including development Strict Mode remounts.
- `app/globals.css`: responsive styling and the supplied font declarations.
- `public/media/`: original media extracted from the HTML, byte-for-byte, with normal browser caching and video range requests.
- `public/fonts/avengeance.otf`: the supplied font.

## Registration

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_REGISTER_URL` to the real registration URL. Restart development or rebuild production after changing it. With no URL configured, Register takes visitors to the schedule, matching the supplied page's fallback.

The dates are retained from the source HTML, which marked the schedule as proposed. Confirm them before launch. Media resolution is unchanged; conversion does not upscale the source footage.

Next.js reference: https://nextjs.org/docs/app/getting-started/installation
