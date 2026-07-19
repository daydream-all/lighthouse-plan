interface LighthouseLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export function LighthouseLogo({ className = '', size = 32, showText = false }: LighthouseLogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Gold arc / sunrise */}
        <path
          d="M8 44 A 26 26 0 0 1 56 44"
          stroke="#F5A623"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        {/* Light beam left */}
        <path d="M32 22 L 6 6" stroke="#F5A623" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
        {/* Light beam right */}
        <path d="M32 22 L 58 6" stroke="#F5A623" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
        {/* Light beam center */}
        <path d="M32 22 L 32 4" stroke="#F5A623" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
        {/* Lighthouse body */}
        <path d="M26 44 L 38 44 L 36 24 L 28 24 Z" fill="#1A7FE0" />
        {/* Lighthouse top cap */}
        <path d="M28 24 L 36 24 L 34.5 18 L 29.5 18 Z" fill="#1A7FE0" />
        {/* Light room */}
        <rect x="28.5" y="15" width="7" height="5" rx="1" fill="#F5A623" />
        {/* Teal growth arrow */}
        <path d="M14 54 L 26 42 L 34 48 L 50 32" stroke="#00B5C8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M45 30 L 50 32 L 48 37" stroke="#00B5C8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {/* Ocean waves */}
        <path d="M8 56 Q 16 52, 24 56 T 40 56 T 56 56" stroke="#00B5C8" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />
      </svg>
      {showText && (
        <span className="font-bold text-xl tracking-tight text-foreground">
          灯塔<span className="text-primary">计划</span>
        </span>
      )}
    </div>
  );
}
