// Hand-drawn "Mehran" signature with a sweeping underline. Original paths.
// Every stroke has pathLength="1" so the CSS draw timings in Signature.css
// are independent of real path length.
const MAIN =
  // M
  'M 26 114 C 26 92 30 64 36 42 C 42 24 54 30 50 64 ' +
  'C 48 88 46 106 49 112 C 52 118 58 100 64 76 C 69 56 76 46 82 60 ' +
  'C 87 72 82 104 87 112 ' +
  // e
  'C 91 118 94 108 100 102 C 104 98 108 84 116 82 C 124 80 126 88 118 92 ' +
  'C 110 96 104 98 106 104 C 108 110 120 110 128 102 ' +
  // h (tall ascender loop, then arch)
  'C 134 94 138 40 150 18 C 154 6 166 10 160 34 C 156 54 150 90 150 112 ' +
  'C 150 118 152 100 160 84 C 166 72 178 70 178 86 C 178 100 172 108 176 112 ' +
  // r
  'C 180 116 184 104 190 90 C 193 84 200 82 204 88 C 206 94 204 102 208 104 ' +
  // a (closed bowl, then stem)
  'C 212 92 218 84 228 86 C 218 88 212 104 222 108 C 232 112 240 100 238 90 ' +
  'C 238 100 238 106 242 110 ' +
  // n
  'C 246 114 248 100 254 88 C 258 80 268 80 268 92 C 268 102 264 108 268 112 ' +
  'C 272 116 276 100 282 90 C 286 82 296 82 294 92 ' +
  // finishing stroke
  'C 300 100 308 104 312 100'

const FLOURISH = 'M 302 124 C 236 112 142 122 52 138 C 112 133 196 132 250 136'

export default function Signature({ className = '' }) {
  return (
    <svg
      className={`signature-art ${className}`.trim()}
      viewBox="0 0 330 155"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="Mehran's signature"
    >
      <path className="sig-stroke sig-main" pathLength="1" d={MAIN} />
      <path className="sig-stroke sig-flourish" pathLength="1" d={FLOURISH} />
    </svg>
  )
}
