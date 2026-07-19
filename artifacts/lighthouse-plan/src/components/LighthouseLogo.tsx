interface LighthouseLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  animate?: boolean;
}

export function LighthouseLogo({ className = '', size = 36, showText = false, animate = true }: LighthouseLogoProps) {
  const id = `lh-${size}`;
  return (
    <div className={`flex items-center gap-2.5 ${className}`} style={{ lineHeight: 1 }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0, overflow: 'visible' }}
      >
        <defs>
          {/* Sky gradient */}
          <radialGradient id={`${id}-sky`} cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#B8DCFF" />
            <stop offset="40%" stopColor="#5EB3F5" />
            <stop offset="100%" stopColor="#1A6EC2" />
          </radialGradient>
          {/* Sea gradient */}
          <linearGradient id={`${id}-sea`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2A8FE8" />
            <stop offset="100%" stopColor="#1255A0" />
          </linearGradient>
          {/* Beam gradient */}
          <radialGradient id={`${id}-beam`} cx="50%" cy="100%" r="100%">
            <stop offset="0%" stopColor="#FFF8D6" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#FFDF7A" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#FFC845" stopOpacity="0" />
          </radialGradient>
          {/* Glow for lantern */}
          <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF8D6" stopOpacity="1" />
            <stop offset="50%" stopColor="#FFD86A" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#FFC845" stopOpacity="0" />
          </radialGradient>
          {/* Path gradient (gold road) */}
          <linearGradient id={`${id}-road`} x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="#C8E8FF" />
            <stop offset="50%" stopColor="#A0D0F5" />
            <stop offset="100%" stopColor="#6EB8ED" />
          </linearGradient>
          {/* Outer ring gradient */}
          <linearGradient id={`${id}-ring`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFC845" />
            <stop offset="40%" stopColor="#4DA6F7" />
            <stop offset="100%" stopColor="#3CC6C2" />
          </linearGradient>
          {/* Clip circle */}
          <clipPath id={`${id}-clip`}>
            <circle cx="60" cy="60" r="53" />
          </clipPath>
        </defs>

        {/* ── Outer animated glow ring ── */}
        {animate && (
          <>
            <circle cx="60" cy="60" r="58" stroke="#4DA6F7" strokeWidth="1.5" strokeOpacity="0.3" fill="none">
              <animate attributeName="r" values="58;61;58" dur="3s" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.3;0.6;0.3" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="60" cy="60" r="56" stroke={`url(#${id}-ring)`} strokeWidth="2.5" strokeOpacity="0.9" fill="none"
              strokeDasharray="185 175" strokeLinecap="round">
              <animateTransform attributeName="transform" type="rotate" from="0 60 60" to="360 60 60" dur="8s" repeatCount="indefinite" />
            </circle>
          </>
        )}
        {!animate && (
          <circle cx="60" cy="60" r="56" stroke={`url(#${id}-ring)`} strokeWidth="2.5" fill="none"
            strokeDasharray="185 175" strokeLinecap="round" />
        )}

        {/* ── Main circle background ── */}
        <circle cx="60" cy="60" r="53" fill={`url(#${id}-sky)`} />

        {/* ── Clipped content ── */}
        <g clipPath={`url(#${id}-clip)`}>

          {/* Horizon glow / sun */}
          <ellipse cx="60" cy="70" rx="30" ry="14" fill="#FFF3C0" opacity="0.55" />
          <ellipse cx="60" cy="70" rx="18" ry="8" fill="#FFE785" opacity="0.6" />

          {/* City skyline silhouette */}
          <g fill="#1A5EA8" opacity="0.4">
            <rect x="6"  y="72" width="6"  height="10" />
            <rect x="4"  y="68" width="4"  height="14" />
            <rect x="10" y="74" width="5"  height="8" />
            <rect x="15" y="70" width="4"  height="12" />
            <rect x="97" y="72" width="6"  height="10" />
            <rect x="101" y="67" width="5" height="15" />
            <rect x="107" y="70" width="6" height="12" />
            <rect x="88" y="74" width="8"  height="8" />
          </g>

          {/* Sea */}
          <rect x="0" y="80" width="120" height="40" fill={`url(#${id}-sea)`} />

          {/* Winding path */}
          <path
            d="M60 80 C 58 78, 50 76, 44 85 C 38 94, 32 105, 20 113"
            stroke={`url(#${id}-road)`} strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.75"
          />
          <path
            d="M60 80 C 62 78, 70 76, 76 85 C 82 94, 88 105, 100 113"
            stroke={`url(#${id}-road)`} strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.75"
          />
          {/* Path sparkle dots */}
          <circle cx="48" cy="88" r="1.8" fill="#FFD86A" opacity="0.9" />
          <circle cx="40" cy="97" r="1.4" fill="#FFD86A" opacity="0.7" />
          <circle cx="72" cy="88" r="1.8" fill="#FFD86A" opacity="0.9" />
          <circle cx="80" cy="97" r="1.4" fill="#FFD86A" opacity="0.7" />

          {/* ── Light beams ── */}
          <g opacity="0.85">
            {/* Wide left beam */}
            <path d="M57 48 L 4 16 L 26 14 Z" fill={`url(#${id}-beam)`} />
            {/* Wide right beam */}
            <path d="M63 48 L 116 16 L 94 14 Z" fill={`url(#${id}-beam)`} />
            {/* Center beam */}
            <path d="M58 46 L 46 6 L 74 6 Z" fill={`url(#${id}-beam)`} />
            {/* Narrow left beam */}
            <path d="M57.5 47 L 18 24 L 26 22 Z" fill="#FFEF9A" opacity="0.5" />
            {/* Narrow right beam */}
            <path d="M62.5 47 L 102 24 L 94 22 Z" fill="#FFEF9A" opacity="0.5" />
          </g>
          {/* Beam animation pulse */}
          {animate && (
            <ellipse cx="60" cy="44" rx="22" ry="8" fill="#FFF8D6" opacity="0.0">
              <animate attributeName="opacity" values="0;0.4;0" dur="2.5s" repeatCount="indefinite" />
              <animate attributeName="ry" values="8;14;8" dur="2.5s" repeatCount="indefinite" />
            </ellipse>
          )}

          {/* ── Lighthouse base / platform ── */}
          <ellipse cx="60" cy="82" rx="14" ry="4" fill="#1A5EA8" opacity="0.6" />
          <rect x="50" y="76" width="20" height="8" rx="2" fill="#1E6EC8" />

          {/* ── Lighthouse body ── */}
          {/* Main tower */}
          <path d="M53 76 L 67 76 L 64 44 L 56 44 Z" fill="#EEF5FF" />
          {/* Tower shading */}
          <path d="M64 76 L 67 76 L 64 44 Z" fill="#C8DDF5" opacity="0.7" />
          {/* Horizontal bands */}
          <rect x="56" y="58" width="8" height="3" fill="#4DA6F7" opacity="0.6" rx="0.5" />
          <rect x="56.5" y="67" width="7" height="2.5" fill="#4DA6F7" opacity="0.5" rx="0.5" />
          <rect x="57" y="50" width="6" height="2" fill="#4DA6F7" opacity="0.4" rx="0.5" />

          {/* Lamp room */}
          <rect x="55.5" y="40" width="9" height="6" rx="1.5" fill="#2A7ED4" />
          <rect x="56.5" y="41" width="7" height="4" rx="1" fill="#FFF3C0" opacity="0.95" />

          {/* Roof cap */}
          <path d="M54.5 40 L 65.5 40 L 62 35 L 58 35 Z" fill="#1A5EA8" />
          {/* Tip finial */}
          <circle cx="60" cy="34" r="1.8" fill="#FFC845" />
          <line x1="60" y1="32" x2="60" y2="29" stroke="#FFC845" strokeWidth="1.5" strokeLinecap="round" />

          {/* Lantern glow halo */}
          <ellipse cx="60" cy="43" rx="10" ry="6" fill={`url(#${id}-glow)`} opacity="0.9">
            {animate && (
              <animate attributeName="opacity" values="0.9;1;0.7;1;0.9" dur="2s" repeatCount="indefinite" />
            )}
          </ellipse>

          {/* Balcony railing */}
          <rect x="54" y="39.5" width="12" height="1" rx="0.5" fill="#EEF5FF" opacity="0.8" />

          {/* Sea wave lines */}
          <path d="M14 87 Q 22 84, 30 87 T 46 87" stroke="#6EC8F5" strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round" />
          <path d="M74 87 Q 82 84, 90 87 T 106 87" stroke="#6EC8F5" strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round" />
          <path d="M6 93 Q 18 90, 30 93 T 54 93" stroke="#5BB8F0" strokeWidth="1.2" fill="none" opacity="0.45" strokeLinecap="round" />
          <path d="M66 93 Q 78 90, 90 93 T 114 93" stroke="#5BB8F0" strokeWidth="1.2" fill="none" opacity="0.45" strokeLinecap="round" />
        </g>

        {/* ── Sparkle stars ── */}
        {/* Top-left star */}
        <g transform="translate(28, 22)" opacity="0.95">
          <path d="M0,-5 L1.2,-1.2 L5,0 L1.2,1.2 L0,5 L-1.2,1.2 L-5,0 L-1.2,-1.2 Z" fill="#FFD86A" />
          {animate && (
            <animateTransform attributeName="transform" type="scale" values="1;1.35;1" dur="2.2s" repeatCount="indefinite" additive="sum" />
          )}
        </g>
        {/* Top-right star */}
        <g transform="translate(92, 18)" opacity="0.9">
          <path d="M0,-4 L0.9,-0.9 L4,0 L0.9,0.9 L0,4 L-0.9,0.9 L-4,0 L-0.9,-0.9 Z" fill="#FFD86A" />
          {animate && (
            <animateTransform attributeName="transform" type="scale" values="1;1.4;1" dur="1.8s" repeatCount="indefinite" additive="sum" />
          )}
        </g>
        {/* Small top star */}
        <g transform="translate(60, 10)" opacity="0.8">
          <path d="M0,-3 L0.7,-0.7 L3,0 L0.7,0.7 L0,3 L-0.7,0.7 L-3,0 L-0.7,-0.7 Z" fill="#FFF0A0" />
          {animate && (
            <animateTransform attributeName="transform" type="scale" values="1;1.5;1" dur="2.8s" repeatCount="indefinite" additive="sum" />
          )}
        </g>
        {/* Small left star */}
        <g transform="translate(18, 38)" opacity="0.7">
          <path d="M0,-2.5 L0.6,-0.6 L2.5,0 L0.6,0.6 L0,2.5 L-0.6,0.6 L-2.5,0 L-0.6,-0.6 Z" fill="#FFD86A" />
          {animate && (
            <animateTransform attributeName="transform" type="scale" values="1;1.3;1" dur="3.2s" repeatCount="indefinite" additive="sum" />
          )}
        </g>
        {/* Small right star */}
        <g transform="translate(102, 38)" opacity="0.7">
          <path d="M0,-2.5 L0.6,-0.6 L2.5,0 L0.6,0.6 L0,2.5 L-0.6,0.6 L-2.5,0 L-0.6,-0.6 Z" fill="#FFD86A" />
          {animate && (
            <animateTransform attributeName="transform" type="scale" values="1;1.3;1" dur="2.6s" repeatCount="indefinite" additive="sum" />
          )}
        </g>

        {/* ── Inner circle border ── */}
        <circle cx="60" cy="60" r="53" stroke="#4DA6F7" strokeWidth="1.5" fill="none" strokeOpacity="0.6" />

      </svg>

      {showText && (
        <div className="flex flex-col leading-tight">
          <span
            className="font-extrabold tracking-wide"
            style={{
              fontSize: size * 0.52,
              background: 'linear-gradient(135deg, #1A5EA8 0%, #4DA6F7 60%, #3CC6C2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            灯塔计划
          </span>
          <span
            className="font-medium tracking-widest text-amber-500"
            style={{ fontSize: size * 0.18, letterSpacing: '0.12em' }}
          >
            Lighthouse Plan
          </span>
        </div>
      )}
    </div>
  );
}
