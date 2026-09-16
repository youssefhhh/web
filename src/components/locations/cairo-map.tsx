interface CairoMapProps {
  legend: { nile: string; ringRoad: string; pyramids: string; downtown: string };
}

/** Stylised night map of Greater Cairo (viewBox 600 × 420). Decorative — pins are rendered on top as buttons. */
export function CairoMap({ legend }: CairoMapProps) {
  return (
    <svg viewBox="0 0 600 420" aria-hidden className="absolute inset-0 size-full" direction="ltr">
      <defs>
        <radialGradient id="map-city-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffb238" stopOpacity=".16" />
          <stop offset="100%" stopColor="#ffb238" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Urban area */}
      <path
        d="M60 150C90 110 170 95 240 70c80-25 180 0 230 50 60 55 90 130 50 180-40 50-140 70-220 60-80-10-140-40-190-80-50-40-70-90-50-130Z"
        fill="rgb(255 255 255 / .025)"
        stroke="rgb(255 255 255 / .05)"
        strokeDasharray="3 5"
      />
      <ellipse cx="300" cy="205" rx="210" ry="150" fill="url(#map-city-glow)" />

      {/* Secondary roads */}
      <g fill="none" stroke="rgb(255 255 255 / .09)" strokeWidth="2" strokeLinecap="round">
        <path d="M40 196h60c60 0 110-4 158-18" />
        <path d="M150 150 60 58" />
        <path d="M330 172c20-3 42-4 62-4 34 0 58 12 78 32 26 10 60 14 100 16" />
        <path d="M300 318c40-38 70-98 92-150" />
        <path d="M40 272c60-8 110-10 160-22" />
        <path d="M262 176c30 10 55 22 70 40 20 25 20 60 12 100" />
      </g>

      {/* Ring Road */}
      <path
        d="M150 150c30-55 100-80 180-72 80 8 130 52 140 122 8 65-30 120-100 138-70 18-145 2-190-38-45-40-55-100-30-150Z"
        fill="none"
        stroke="#1f1f25"
        strokeWidth="9"
      />
      <path
        d="M150 150c30-55 100-80 180-72 80 8 130 52 140 122 8 65-30 120-100 138-70 18-145 2-190-38-45-40-55-100-30-150Z"
        fill="none"
        stroke="rgb(255 178 56 / .45)"
        strokeWidth="1.5"
        strokeDasharray="6 7"
      />

      {/* The Nile & the Delta */}
      <g fill="none" strokeLinecap="round">
        <path
          d="M258 420c4-40-8-70 4-110 10-35-4-70 0-105 4-35-10-65-4-105m0 0c-8-30-33-60-62-100m62 100c10-30 37-60 64-100"
          stroke="rgb(56 120 160 / .28)"
          strokeWidth="13"
        />
        <path
          d="M258 420c4-40-8-70 4-110 10-35-4-70 0-105 4-35-10-65-4-105m0 0c-8-30-33-60-62-100m62 100c10-30 37-60 64-100"
          stroke="rgb(110 180 220 / .55)"
          strokeWidth="2.5"
        />
      </g>
      <ellipse cx="260" cy="188" rx="3.5" ry="13" fill="#0c0d10" />

      {/* Pyramids of Giza */}
      <g fill="rgb(255 178 56 / .22)" stroke="rgb(255 178 56 / .7)" strokeWidth="1.2" strokeLinejoin="round">
        <path d="M150 276l12-20 12 20Z" />
        <path d="M166 280l10-16 10 16Z" />
        <path d="M181 283l7-11 7 11Z" />
      </g>

      {/* Downtown */}
      <circle cx="266" cy="170" r="4.5" fill="#0c0d10" stroke="rgb(244 239 231 / .6)" strokeWidth="1.5" />

      <g fill="rgb(244 239 231 / .42)" fontSize="11" fontWeight="500">
        <text x="276" y="166">{legend.downtown}</text>
        <text x="148" y="300">{legend.pyramids}</text>
        <text x="236" y="396" fill="rgb(120 185 225 / .7)" textAnchor="end">
          {legend.nile}
        </text>
        <text x="468" y="112" fill="rgb(255 178 56 / .6)">
          {legend.ringRoad}
        </text>
      </g>

      {/* Compass */}
      <g transform="translate(560 44)" fill="none" stroke="rgb(244 239 231 / .35)" strokeWidth="1.2">
        <circle r="16" />
        <path d="M0-10 5 6 0 2-5 6Z" fill="rgb(255 178 56 / .8)" stroke="none" />
        <text y="-22" textAnchor="middle" fill="rgb(244 239 231 / .5)" stroke="none" fontSize="10" fontWeight="700">
          N
        </text>
      </g>
    </svg>
  );
}
