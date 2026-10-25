export const EMAIL = 'mehranhamza1066@gmail.com'
export const GITHUB = 'https://github.com/mehranhamza1066'
export const LINKEDIN = 'https://linkedin.com/in/mehranhamza'

export const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#apps', label: 'Apps' },
  { href: '#engineering', label: 'Engineering' },
  { href: '#taskly', label: 'Taskly' },
]

export const fanShots = [
  { src: 'employee-2.png', alt: 'Upthyme schedule screen' },
  { src: 'manager-1.png', alt: 'Upthyme Manager dashboard' },
  { src: 'employee-1.png', alt: 'Upthyme home screen', eager: true },
  { src: 'employee-3.png', alt: 'Upthyme clock-in screen' },
  { src: 'station-1.png', alt: 'Upthyme Station kiosk' },
]

export const stats = [
  { value: '3', label: 'Apps live on both stores' },
  { value: '5,000+', label: 'Google Play downloads' },
  { value: 'iOS + Android', label: 'Native code on both' },
  { value: 'UTC+5', label: '4h US ET · full EU overlap' },
]

export const apps = [
  {
    name: 'Upthyme',
    description: (
      <>
        The employee app. Shift schedules, clock in and out, breaks, time-off requests and team chat. The one with
        5,000+ downloads — and the one with the hardest problem in it: clocking someone out automatically when they
        leave a worksite, <strong>even with the app force-closed.</strong>
      </>
    ),
    chips: ['Flutter', 'Kotlin', 'Swift', 'Geofencing', 'Phoenix Channels', 'Offline-first'],
    play: 'https://play.google.com/store/apps/details?id=com.upthyme.employee',
    appStore: 'https://apps.apple.com/us/app/upthyme/id6742220903',
    shots: [
      { src: 'employee-1.png', alt: 'Upthyme schedule' },
      { src: 'employee-4.png', alt: 'Upthyme shift detail' },
    ],
  },
  {
    name: 'Upthyme Manager',
    description: (
      <>
        The manager side. Create and assign shifts, watch daily attendance live, approve time-off, override clock-ins.
        Weekly schedules are pre-cached in the background so approvals never wait on the network, and WebSocket updates
        keep it in sync with the employee app in real time.
      </>
    ),
    chips: ['Flutter', 'WebSockets', 'Clean Architecture', 'Background caching', 'REST'],
    play: 'https://play.google.com/store/apps/details?id=com.upthyme.manager',
    appStore: 'https://apps.apple.com/us/app/upthyme-manager/id6742194735',
    shots: [
      { src: 'manager-1.png', alt: 'Manager dashboard' },
      { src: 'manager-3.png', alt: 'Manager scheduling' },
    ],
  },
  {
    name: 'Upthyme Station',
    description: (
      <>
        A kiosk app for shared workplace devices — employees clock in <strong>by face</strong>, matched against their
        scheduled shift, with no personal login on the device. I owned this one end to end: I built the
        cosine-similarity face-recognition model in Python, deployed it on AWS, and wired it into the Flutter client
        myself.
      </>
    ),
    chips: ['Flutter', 'Python', 'AWS', 'Face recognition', 'Camera'],
    play: 'https://play.google.com/store/apps/details?id=com.upthyme.station',
    appStore: 'https://apps.apple.com/us/app/upthyme-station/id6756040245',
    shots: [
      { src: 'station-1.png', alt: 'Station kiosk welcome' },
      { src: 'station-2.png', alt: 'Station face clock-in' },
    ],
  },
]

export const engineering = [
  {
    tag: 'Native Android + iOS',
    title: 'Geofencing that survives force-close',
    body: (
      <>
        Automatic clock-out when an employee leaves a worksite — working around Android's background-execution limits
        with a foreground service, WorkManager and AlarmManager, and iOS background-location restrictions. Written in
        Kotlin and Swift behind Flutter method channels. Apple's own listing documents the background location use.
      </>
    ),
  },
  {
    tag: 'Real-time',
    title: 'Offline-first chat on Phoenix Channels',
    body: (
      <>
        Threaded replies, read receipts, typing indicators, presence, voice messages and compressed media. Reads are
        served from a local cache and reconcile in the background, so conversations open instantly and stay correct on
        a bad connection.
      </>
    ),
  },
  {
    tag: 'Platform',
    title: 'Notifications like a native app',
    body: (
      <>
        Android <code>MessagingStyle</code> notifications with inline reply, mark-as-read and mute handled in Kotlin via{' '}
        <code>RemoteInput</code> — the same API WhatsApp uses — plus an iOS Notification Service Extension in Swift for
        rich chat notifications.
      </>
    ),
  },
  {
    tag: 'ML + Cloud',
    title: 'Face recognition, model to client',
    body: (
      <>
        A cosine-similarity face-recognition service written in Python and deployed on AWS, then integrated into the
        kiosk app. Built the model and the mobile integration — not just the Flutter half.
      </>
    ),
  },
  {
    tag: 'Release',
    title: 'CI/CD for two stores',
    body: (
      <>
        GitHub Actions pipelines for Android and iOS including code signing, replacing manual release builds. I ship
        the releases to Google Play and App Store Connect myself.
      </>
    ),
  },
  {
    tag: 'Architecture',
    title: 'Feature-first Clean Architecture',
    body: (
      <>
        Strict data / domain / presentation separation with repositories and use cases, dependency injection, and
        functional error handling at the domain boundary — across three apps sharing one backend.
      </>
    ),
  },
]

export const tasklyNums = [
  { value: '17', label: 'Features, clean architecture' },
  { value: '17', label: 'BLoCs with event transformers' },
  { value: '37', label: 'Test files — unit, widget, BLoC' },
  { value: '6', label: 'Custom painter layers' },
]

export const skills = [
  'Flutter', 'Dart', 'Kotlin', 'Swift', 'Python', 'BLoC', 'GetX', 'Clean Architecture', 'REST APIs',
  'WebSockets', 'Phoenix Channels', 'Firebase', 'FCM', 'Hive', 'SQLite', 'Method channels', 'WorkManager',
  'Geolocation', 'Unit & widget testing', 'GitHub Actions', 'Code signing', 'AWS', 'Git', 'Jira · Scrum',
]
