export function FlutterLogo(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M14.3 1 4 11.3l3.2 3.2L20.7 1h-6.4Z" />
      <path d="M14.3 11 8.8 16.5l3.2 3.2 2.3 2.3h6.4l-5.5-5.5 5.5-5.5h-6.4Z" opacity=".75" />
    </svg>
  )
}

export function Cursor(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true" {...props}>
      <path d="M3 2l10 5.2-4.4 1.2L6.8 13 3 2Z" strokeLinejoin="round" />
    </svg>
  )
}

const expertiseIcons = {
  flutter: <FlutterLogo />,
  native: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="6" y="2" width="12" height="20" rx="2.5" />
      <path d="M10.5 18.5h3" strokeLinecap="round" />
      <path d="m10 8-2 2.5 2 2.5M14 8l2 2.5-2 2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  realtime: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M4 5h16v10H9l-5 4V5Z" strokeLinejoin="round" />
      <path d="M8 10h.01M12 10h.01M16 10h.01" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  ),
}

export function ExpertiseIcon({ name }) {
  return <span className="exp-icon">{expertiseIcons[name]}</span>
}
