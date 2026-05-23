# jelly ui

a copy-paste set of react/tailwind components. the demo is a next.js app, but the components are plain tsx and tailwind classes, so they can be used in next.js or vite projects.

## what is included

- `JellyButton`
- `JellyBadge`
- `JellyCard`
- `JellyToggle`
- `JellySlider`
- `JellyProgress`
- `JellyChip`
- `JellyInput`

Each component lives in `components/jelly`. The homepage also has a `copy code` action that returns a paste-ready version of each component with the small `cn` helper included.

## Requirements

- React 19
- Tailwind CSS 4
- TypeScript
- `lucide-react` for chips and demo icons

Animated components also need the keyframes from `app/globals.css`. The copy action includes the relevant CSS note for components that use an animation.

## Run The Demo

```bash
pnpm install
pnpm dev
```

If `pnpm` is not available through Corepack, enable it first:

```bash
corepack enable
```

## Use In Your App

Copy the component you want from `components/jelly`, then make sure your project has a `cn` helper. This repo uses:

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

Add the jelly keyframes from `app/globals.css` if you use `JellyButton`, `JellyChip`, or animated `JellyProgress`.

## Trust Notes

- Components are typed with TypeScript and support controlled/uncontrolled usage where appropriate.
- Form controls expose accessible labels or fallback labels.
- The demo build does not ignore TypeScript errors.
- The project is MIT licensed. See `LICENSE`.

## Project Checks

```bash
pnpm typecheck
pnpm build
```
