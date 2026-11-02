# Incursion

A responsive Next.js App Router site for the Incursion GDG on Campus hackathon. The original intro preloader remains, followed by a Doom mask hero using the attached interactive 3D model and the Fractured Timeline schedule.

## Run locally

Use Node.js 20.9 or newer.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Enter with or without sound, optionally skip the intro, and explore the hero and timeline.

## Production

```sh
npm run build
npm start
```

Deploy as a standard Next.js project on a compatible Node.js host.

## Edit the site

- `app/page.jsx` and `app/layout.jsx`: route, document metadata, and viewport configuration.
- `components/IncursionExperience.jsx`: page, preloader, hero copy, schedule, and closing section.
- `components/DoomMaskHero.jsx`: interactive Three.js rendering and torchlight controls for the Doom mask model.
- `lib/content.js`: schedule dates, text, and image crops.
- `lib/experience.js`: intro playback, sound control, and timeline reveal interactions.
- `app/globals.css`: responsive styling and the supplied font declarations.
- `public/media/`: site images, videos, audio, and the Doom mask model.

## Registration

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_REGISTER_URL` to the registration form. Restart development or rebuild production after changing it. With no URL configured, Register links to the schedule.

## 3D asset credit

“Doctor Doom’s Mask” by Nicolas_Laube, sourced from Sketchfab and licensed under CC BY 4.0. Attribution and license links are displayed in the hero.
