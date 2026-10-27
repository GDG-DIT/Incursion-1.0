# Incurssion — Doomsday

An immersive hackathon homepage: scroll from an enclosed, empty throne hall through an emerald rift into a ruined city, then witness two colliding realities.

## Development

Use Node.js 24 and Bun 1.4.4 (the package manager pinned in `package.json`).

```sh
bun install --frozen-lockfile
bun run dev
```

Open http://localhost:3000. For a production build, run `bun run build`, followed by `bun run start`.

## Tech stack

The repository's existing Next.js 16.4.3 App Router, React 19.3.1, TypeScript 7, Tailwind CSS 4 and Bun setup are retained, including the Geist fonts and Turbopack configuration. Three.js, React Three Fiber, Drei and GSAP provide the procedural environments and animation.

`app/page.tsx` renders `app/components/hero/HeroSection.tsx`. `Hall.tsx` builds the sanctuary; `Journey.tsx` implements the scrolling camera, portal, ruined city and colliding dimensions. Browser-dependent scene code is dynamically loaded from the client component with server rendering disabled. No external models or image assets are required.

## Controls

- Scroll to move forward or backward through the three chapters.
- Awaken the rift starts a guided camera journey into the city. Scrolling, touch or navigation keys interrupt automatic travel.
- Sanctuary, Ruins and Incursion provide conventional chapter navigation.
- Motion off uses static chapter viewpoints and disables ambient animation; system reduced-motion preferences are respected.
- Mobile reduces rendering resolution and particles.

There is no preloader or character. Registration currently opens a clearly labeled demo link to `https://example.com/register`; replace it with the event's real registration destination before launch. No information is collected.

## Visual scope

This is a procedural 3D prototype. Authored architecture, city meshes, detailed PBR textures and profiled volumetric lighting would be needed for a photorealistic finish. The scene contains original geometric imagery without Marvel logos or character assets.
