import type { ReactNode } from "react"
import { notFound } from "next/navigation"
import { ComponentPage, createComponentMetadata, type ComponentProp } from "@/components/docs/component-page"
import {
  BadgePreview,
  ButtonPreview,
  CardPreview,
  ChipPreview,
  InputPreview,
  ProgressPreview,
  SliderPreview,
  TogglePreview,
} from "@/components/docs/component-previews"

type ComponentDoc = {
  name: string
  title: string
  description: string
  preview: ReactNode
  usageText: ReactNode
  usageCode: string
  setupText: ReactNode
  setupCode?: string
  props: readonly ComponentProp[]
}

const colorType = '"pink" | "blue" | "green" | "yellow" | "orange" | "red"'

const docs: Record<string, ComponentDoc> = {
  button: {
    name: "Jelly Button",
    title: "jelly button",
    description: "A squishy React and Tailwind CSS button component with pastel colors, outlined variants, sizes, and jelly click animation.",
    preview: <ButtonPreview />,
    usageText: <>Copy the component, add the jelly keyframe to the global stylesheet, and render it wherever an HTML button would be used.</>,
    usageCode: `import { JellyButton } from "@/components/jelly/jelly-button"

export function SaveButton() {
  return (
    <JellyButton color="pink" size="md">
      save changes
    </JellyButton>
  )
}`,
    setupText: <><p>Requires React, TypeScript, Tailwind CSS, and the small <code className="font-code">cn</code> class-name helper included by the copy action.</p><p>Add this animation to the global stylesheet for the click response:</p></>,
    setupCode: `@keyframes jelly-bounce {
  0%   { transform: scale(1, 1); opacity: 1; }
  20%  { transform: scale(0.92, 1.08); }
  40%  { transform: scale(1.05, 0.95); }
  60%  { transform: scale(0.98, 1.02); }
  80%  { transform: scale(1.01, 0.99); }
  100% { transform: scale(1, 1); opacity: 1; }
}`,
    props: [
      { name: "color", type: colorType, defaultValue: '"pink"', description: "Sets the jelly tint and shadow color." },
      { name: "size", type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: "Controls padding, text size, and radius." },
      { name: "outlined", type: "boolean", defaultValue: "false", description: "Uses the transparent outlined style." },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "Disables interaction and lowers emphasis." },
    ],
  },
  badge: {
    name: "Jelly Badge",
    title: "jelly badge",
    description: "A pastel React and Tailwind CSS badge component with optional animated status indicator for labels and live states.",
    preview: <BadgePreview />,
    usageText: <>Use a badge for short labels or enable the pulse dot for a live status.</>,
    usageCode: `import { JellyBadge } from "@/components/jelly/jelly-badge"

export function OnlineBadge() {
  return <JellyBadge color="green" pulse>online</JellyBadge>
}`,
    setupText: <p>Requires React, TypeScript, Tailwind CSS, and the included <code className="font-code">cn</code> helper. It accepts normal span attributes.</p>,
    props: [
      { name: "color", type: colorType, defaultValue: '"pink"', description: "Sets the pastel badge color." },
      { name: "pulse", type: "boolean", defaultValue: "false", description: "Shows an animated status dot." },
      { name: "children", type: "ReactNode", defaultValue: "-", description: "Sets the badge label." },
    ],
  },
  toggle: {
    name: "Jelly Toggle",
    title: "jelly toggle",
    description: "A glossy React and Tailwind CSS toggle switch component with controlled and uncontrolled states and pastel colors.",
    preview: <TogglePreview />,
    usageText: <>Provide a label for an accessible switch, then use controlled or default state depending on the form.</>,
    usageCode: `import { JellyToggle } from "@/components/jelly/jelly-toggle"

export function NotificationsToggle() {
  return <JellyToggle color="green" label="notifications" defaultChecked />
}`,
    setupText: <p>Requires React, TypeScript, Tailwind CSS, and the included <code className="font-code">cn</code> helper. No additional animation setup is required.</p>,
    props: [
      { name: "color", type: colorType, defaultValue: '"green"', description: "Sets the active track color." },
      { name: "checked", type: "boolean", defaultValue: "-", description: "Controls the switch state." },
      { name: "defaultChecked", type: "boolean", defaultValue: "false", description: "Sets its initial uncontrolled state." },
      { name: "onChange", type: "(checked: boolean) => void", defaultValue: "-", description: "Receives state changes." },
      { name: "label", type: "string", defaultValue: "-", description: "Renders and labels the switch." },
    ],
  },
  slider: {
    name: "Jelly Slider",
    title: "jelly slider",
    description: "A colorful React and Tailwind CSS range slider component with glossy custom thumb, value display, and accessible labeling.",
    preview: <SliderPreview />,
    usageText: <>Choose a default value for an uncontrolled range or provide value and onChange for controlled input.</>,
    usageCode: `import { JellySlider } from "@/components/jelly/jelly-slider"

export function VolumeSlider() {
  return <JellySlider color="blue" label="volume" defaultValue={65} />
}`,
    setupText: <p>Requires React, TypeScript, Tailwind CSS, and the included <code className="font-code">cn</code> helper. It uses a native range input underneath the custom surface.</p>,
    props: [
      { name: "color", type: colorType, defaultValue: '"blue"', description: "Sets the fill and thumb color." },
      { name: "min / max", type: "number", defaultValue: "0 / 100", description: "Sets the selectable range." },
      { name: "defaultValue", type: "number", defaultValue: "50", description: "Sets the uncontrolled initial value." },
      { name: "value / onChange", type: "number / (value) => void", defaultValue: "-", description: "Controls the current value." },
      { name: "showValue", type: "boolean", defaultValue: "true", description: "Shows the current number." },
    ],
  },
  progress: {
    name: "Jelly Progress",
    title: "jelly progress",
    description: "A glossy React and Tailwind CSS progress component with percentage labels, pastel fills, and optional moving stripe animation.",
    preview: <ProgressPreview />,
    usageText: <>Pass current progress and optionally animate the stripe overlay for an active operation.</>,
    usageCode: `import { JellyProgress } from "@/components/jelly/jelly-progress"

export function UploadProgress() {
  return <JellyProgress color="blue" value={64} label="uploading" animated />
}`,
    setupText: <><p>Requires React, TypeScript, Tailwind CSS, and the included <code className="font-code">cn</code> helper.</p><p>Add this keyframe when using the animated stripe option:</p></>,
    setupCode: `@keyframes slide {
  0% { background-position: 0 0; }
  100% { background-position: 32px 0; }
}`,
    props: [
      { name: "value", type: "number", defaultValue: "-", description: "Sets the current completed value." },
      { name: "max", type: "number", defaultValue: "100", description: "Sets the completed total." },
      { name: "color", type: colorType, defaultValue: '"pink"', description: "Sets the fill and track tint." },
      { name: "label", type: "string", defaultValue: "-", description: "Displays a progress label." },
      { name: "animated", type: "boolean", defaultValue: "false", description: "Animates moving stripes in the fill." },
    ],
  },
  chip: {
    name: "Jelly Chip",
    title: "jelly chip",
    description: "A squishy React and Tailwind CSS chip component with removable and selectable states plus a playful wiggle animation.",
    preview: <ChipPreview />,
    usageText: <>Use selected chips for filters or removable chips for a lightweight list of tags.</>,
    usageCode: `import { JellyChip } from "@/components/jelly/jelly-chip"

export function DesignFilter() {
  return <JellyChip color="pink" selected onClick={() => {}}>design</JellyChip>
}`,
    setupText: <><p>Requires React, TypeScript, Tailwind CSS, and the included <code className="font-code">cn</code> helper.</p><p>Add the wiggle animation for clickable chips:</p></>,
    setupCode: `@keyframes jelly-wiggle {
  0%   { transform: rotate(0deg) scale(1); }
  15%  { transform: rotate(-4deg) scale(1.04); }
  30%  { transform: rotate(3deg) scale(0.97); }
  45%  { transform: rotate(-2deg) scale(1.02); }
  60%  { transform: rotate(1deg) scale(0.99); }
  100% { transform: rotate(0deg) scale(1); }
}`,
    props: [
      { name: "color", type: colorType, defaultValue: '"blue"', description: "Sets the chip color." },
      { name: "selected", type: "boolean", defaultValue: "false", description: "Applies selected styling." },
      { name: "removable", type: "boolean", defaultValue: "false", description: "Shows a remove action." },
      { name: "onClick", type: "() => void", defaultValue: "-", description: "Makes the chip selectable." },
      { name: "onRemove", type: "() => void", defaultValue: "-", description: "Handles its remove action." },
    ],
  },
  input: {
    name: "Jelly Input",
    title: "jelly input",
    description: "A soft React and Tailwind CSS text input component with optional label, glossy highlight, and pastel focus surfaces.",
    preview: <InputPreview />,
    usageText: <>Set an optional pastel tint while retaining normal input attributes and ref forwarding.</>,
    usageCode: `import { JellyInput } from "@/components/jelly/jelly-input"

export function EmailField() {
  return <JellyInput color="blue" label="email" type="email" placeholder="hello@jelly.ui" />
}`,
    setupText: <p>Requires React, TypeScript, Tailwind CSS, and the included <code className="font-code">cn</code> helper. It forwards standard input attributes and refs.</p>,
    props: [
      { name: "color", type: `${colorType} | "clear"`, defaultValue: '"clear"', description: "Sets the surface and focus tint." },
      { name: "label", type: "string", defaultValue: "-", description: "Renders a linked input label." },
      { name: "placeholder", type: "string", defaultValue: "-", description: "Provides placeholder text." },
      { name: "type", type: "HTMLInputTypeAttribute", defaultValue: '"text"', description: "Sets the native input type." },
    ],
  },
  card: {
    name: "Jelly Card",
    title: "jelly card",
    description: "A pastel React and Tailwind CSS card component with glossy surfaces, optional hover lift, title, and description helpers.",
    preview: <CardPreview />,
    usageText: <>Compose card title and description helpers inside a tinted container for small feature panels.</>,
    usageCode: `import { JellyCard, JellyCardDescription, JellyCardTitle } from "@/components/jelly/jelly-card"

export function FlavorCard() {
  return (
    <JellyCard color="blue" hoverable>
      <JellyCardTitle>blueberry</JellyCardTitle>
      <JellyCardDescription>sweet and delicious</JellyCardDescription>
    </JellyCard>
  )
}`,
    setupText: <p>Requires React, TypeScript, Tailwind CSS, and the included <code className="font-code">cn</code> helper. No additional animation setup is required.</p>,
    props: [
      { name: "color", type: `${colorType} | "clear"`, defaultValue: '"clear"', description: "Sets the pastel surface tint." },
      { name: "hoverable", type: "boolean", defaultValue: "false", description: "Enables a subtle lift on hover." },
      { name: "children", type: "ReactNode", defaultValue: "-", description: "Sets the card contents." },
    ],
  },
}

export function generateStaticParams() {
  return Object.keys(docs).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = docs[slug]
  if (!doc) return {}

  return createComponentMetadata({ name: doc.name, slug, description: doc.description })
}

export default async function JellyComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = docs[slug]
  if (!doc) notFound()

  return (
    <ComponentPage
      title={doc.title}
      preview={doc.preview}
      usageText={doc.usageText}
      usageCode={doc.usageCode}
      setupText={doc.setupText}
      setupCode={doc.setupCode}
      props={doc.props}
    />
  )
}
