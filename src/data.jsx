export const EMAIL = 'mehranhamza1066@gmail.com'
export const GITHUB = 'https://github.com/mehranhamza1066'
export const LINKEDIN = 'https://linkedin.com/in/mehranhamza'
export const TASKLY_REPO = 'https://github.com/mehranhamza1066/task_management_app'

export const navLinks = [
  { href: '#home', label: 'home' },
  { href: '#expertise', label: 'expertise' },
  { href: '#work', label: 'work' },
  { href: '#experience', label: 'experience' },
  { href: '#contact', label: 'contact' },
]

// Hero "Latest" list — jumps into the page or out to GitHub.
export const latest = [
  { label: 'Upthyme Station — face clock-in', href: '#work' },
  { label: 'Geofencing that survives force-close', href: '#expertise' },
  { label: 'Taskly — 17 BLoCs, 37 test files', href: TASKLY_REPO, external: true },
  { label: 'Offline-first chat on Phoenix', href: '#expertise' },
]

export const expertise = [
  {
    icon: 'flutter',
    accent: 'var(--red)',
    title: ['Flutter Dev', 'Android, iOS'],
    body: 'Three production apps live on Google Play and the App Store. Clean Architecture, BLoC and GetX, from first commit to store release.',
  },
  {
    icon: 'native',
    accent: 'var(--blue)',
    title: ['Native Platform', 'Kotlin, Swift'],
    body: 'Method channels, foreground services, WorkManager and background location — geofencing that keeps working with the app force-closed.',
  },
  {
    icon: 'realtime',
    accent: 'var(--amber)',
    title: ['Real-time Apps', 'WebSockets, Offline'],
    body: 'Offline-first chat on Phoenix Channels with read receipts, typing and presence. Local cache first, background sync after.',
  },
]

export const quote = {
  text: 'Make it work, make it right, make it fast.',
  by: 'Kent Beck',
}

export const featured = {
  name: 'Upthyme',
  image: 'upthyme-home.webp',
  href: 'https://play.google.com/store/apps/details?id=com.upthyme.employee',
}

// `cover` → a full designed cover image; `shots` → phone screenshots; neither → a styled title card.
// All images live in public/images.
export const projects = [
  {
    title: 'Upthyme — Employee App',
    category: 'Production',
    stack: 'Flutter · Kotlin · Swift · Geofencing',
    cover: 'upthyme-employee-cover.webp',
    href: 'https://play.google.com/store/apps/details?id=com.upthyme.employee',
  },
  {
    title: 'Upthyme Manager',
    category: 'Production',
    stack: 'Flutter · WebSockets · Background caching',
    cover: 'upthyme-manager-cover.webp',
    href: 'https://play.google.com/store/apps/details?id=com.upthyme.manager',
  },
  {
    title: 'Upthyme Station — Face Clock-in',
    category: 'Production',
    stack: 'Flutter · Python · AWS · Face recognition',
    cover: 'upthyme-station-cover.webp',
    href: 'https://play.google.com/store/apps/details?id=com.upthyme.station',
  },
  {
    title: 'Taskly — Tasks & Habits',
    category: 'Personal',
    stack: 'Flutter · BLoC · Hive · 37 test files',
    tint: ['#7c3aed', '#2563eb'],
    href: TASKLY_REPO,
  },
  {
    title: 'Needle — Tattoo Studio App',
    category: 'Client',
    stack: 'Flutter · GetX · Session timer billing',
    tint: ['#e11d48', '#7c2d12'],
  },
  {
    title: 'Plantify.AR',
    category: 'Personal',
    stack: 'Flutter · Firebase · AR · Stripe',
    tint: ['#059669', '#0e7490'],
  },
]

export const experience = [
  {
    role: 'Flutter Developer',
    company: 'Askus Solution',
    period: 'Dec 2024 – Present',
    location: 'Faisalabad, Pakistan',
    site: 'askussolution.tech',
    body: 'Sole Flutter developer behind the Upthyme workforce platform — three apps (employee, manager and kiosk) on both stores. I own architecture, native Android & iOS code, CI/CD pipelines and store releases, working in a Jira Scrum flow with backend and QA.',
    tags: ['Flutter', 'Dart', 'Kotlin', 'Swift', 'GetX', 'WebSockets', 'GitHub Actions'],
  },
  {
    role: 'Flutter Developer',
    company: 'Coding Clouds',
    period: 'Aug 2024 – Oct 2024',
    location: 'Remote (Lahore, Pakistan)',
    body: 'Built core features of Needle, a tattoo studio app, with Flutter and GetX in a modular architecture — including a timer-based session workflow that bills by tattoo duration.',
    tags: ['Flutter', 'GetX', 'REST'],
  },
  {
    role: 'BS Computer Science',
    company: 'National Textile University',
    period: '2020 – 2024',
    location: 'Faisalabad, Pakistan',
    body: 'Graduated with a 3.62 GPA. Final year project: Plantify.AR — real-time AR previews of 3D plant models, with Firebase auth and Stripe payments.',
    tags: ['Flutter', 'Firebase', 'AR', 'Stripe'],
  },
]

// PLACEHOLDERS — swap in real quotes, names and roles.
export const testimonials = [
  {
    text: 'Mehran owned our entire mobile layer. He took three apps from architecture to both app stores, and when Flutter wasn’t enough he went straight into Kotlin and Swift to get it done. Responsive, organised and always a step ahead on what could break in production.',
    name: 'Client name',
    role: 'Role · Company',
  },
  {
    text: 'Fast, careful and easy to work with. Highly recommended.',
    name: 'Client name',
    role: 'Role · Company',
  },
  {
    text: 'He solved the background location problem other developers had given up on — and documented it so the whole team understood it.',
    name: 'Client name',
    role: 'Role · Company',
  },
]

export const socials = [
  { label: 'LinkedIn', href: LINKEDIN },
  { label: 'GitHub', href: GITHUB },
  { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.upthyme.employee' },
  { label: 'App Store', href: 'https://apps.apple.com/us/app/upthyme/id6742220903' },
]
