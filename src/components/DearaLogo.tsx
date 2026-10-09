import React from 'react';

interface DearaLogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
  variant?: 'gold' | 'white' | 'dark';
}

export const DearaLogo: React.FC<DearaLogoProps> = ({
  className = '',
  size = 48,
  showText = true,
  variant = 'gold',
}) => {
  const strokeColor =
    variant === 'white'
      ? '#FFFFFF'
      : variant === 'dark'
      ? '#242120'
      : '#C19F26';

  const textColor =
    variant === 'white'
      ? '#FFFFFF'
      : variant === 'dark'
      ? '#242120'
      : '#BFA028';

  const subtextColor =
    variant === 'white'
      ? '#E8E2D9'
      : variant === 'dark'
      ? '#5C554E'
      : '#C19F26';

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* SVG Icon: Elegant Woman Profile with Hair & Tulip in Gold Circle */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
        aria-label="Logo Deara Beauty Salon"
      >
        {/* Outer Circular Frame */}
        <circle
          cx="120"
          cy="110"
          r="86"
          stroke={strokeColor}
          strokeWidth="4.8"
          strokeLinecap="round"
        />

        {/* Woman's Facial Profile (Forehead, Nose, Lips, Chin, Neck) */}
        <path
          d="M 134 76 
             C 136 84, 137 92, 133 97 
             C 134 100, 142 104, 143 107 
             C 144 110, 139 112, 137 114 
             C 142 116, 143 121, 140 123 
             C 137 125, 134 126, 138 128 
             C 142 130, 141 133, 136 137 
             C 130 142, 125 145, 124 156
             C 123 167, 126 178, 128 188"
          stroke={strokeColor}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Ear & Jawline */}
        <path
          d="M 112 108 
             C 117 107, 122 113, 118 120 
             C 115 125, 110 126, 117 136 
             C 121 142, 125 146, 129 148"
          stroke={strokeColor}
          strokeWidth="3.8"
          strokeLinecap="round"
        />

        {/* Inner Hair Strands & Flowing Bangs */}
        <path
          d="M 124 74 
             C 132 85, 136 100, 130 112"
          stroke={strokeColor}
          strokeWidth="3.8"
          strokeLinecap="round"
        />
        <path
          d="M 124 74 
             C 115 90, 115 106, 122 115"
          stroke={strokeColor}
          strokeWidth="3.8"
          strokeLinecap="round"
        />

        {/* Outer Top Hair Wave */}
        <path
          d="M 76 96 
             C 90 92, 108 72, 128 72 
             C 145 72, 155 86, 160 102"
          stroke={strokeColor}
          strokeWidth="4.2"
          strokeLinecap="round"
        />

        {/* Flowing Back Hair Strands Left Layer 1 */}
        <path
          d="M 70 109 
             C 86 108, 102 96, 116 104"
          stroke={strokeColor}
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Flowing Back Hair Strands Left Layer 2 */}
        <path
          d="M 70 125 
             C 84 125, 104 116, 116 128 
             C 120 133, 114 142, 113 150 
             C 111 162, 115 174, 121 182"
          stroke={strokeColor}
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Flowing Back Hair Strands Left Layer 3 */}
        <path
          d="M 74 141 
             C 88 142, 100 134, 106 148 
             C 109 157, 106 168, 112 178"
          stroke={strokeColor}
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Bottom Hair Wave Arc */}
        <path
          d="M 83 156 
             C 98 168, 110 162, 114 186"
          stroke={strokeColor}
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Hair Strands Under Chin & Right Side */}
        <path
          d="M 128 140 
             C 134 147, 142 153, 148 166 
             C 152 175, 149 184, 144 190"
          stroke={strokeColor}
          strokeWidth="3.8"
          strokeLinecap="round"
        />
        <path
          d="M 134 158 
             C 140 166, 143 175, 137 186"
          stroke={strokeColor}
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Tulip Flower on the Right */}
        {/* Tulip Stem */}
        <path
          d="M 149 156 
             C 156 146, 163 134, 168 120 
             L 170 114"
          stroke={strokeColor}
          strokeWidth="3.8"
          strokeLinecap="round"
        />
        {/* Tulip Leaf */}
        <path
          d="M 158 144 
             C 153 140, 150 130, 151 123 
             C 156 128, 160 134, 163 138"
          stroke={strokeColor}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Tulip Petals Bulb */}
        {/* Left Petal */}
        <path
          d="M 166 112 
             C 160 106, 160 95, 166 89 
             C 170 95, 172 102, 171 110 Z"
          stroke={strokeColor}
          strokeWidth="3.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Center / Right Petal */}
        <path
          d="M 169 111 
             C 176 104, 180 94, 175 88 
             C 171 94, 169 101, 169 111 Z"
          stroke={strokeColor}
          strokeWidth="3.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Back Center Tip */}
        <path
          d="M 169 89 
             L 171 85 
             L 173 90"
          stroke={strokeColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Typography: DEARA BEAUTY SALON */}
      {showText && (
        <div className="flex flex-col leading-none">
          <span
            className="font-serif-brand font-bold tracking-[0.14em] text-lg sm:text-xl uppercase transition-colors"
            style={{ color: textColor }}
          >
            DEARA
          </span>
          <span
            className="text-[9px] sm:text-[10px] tracking-[0.32em] font-medium uppercase mt-1 opacity-90 transition-colors"
            style={{ color: subtextColor }}
          >
            BEAUTY SALON
          </span>
        </div>
      )}
    </div>
  );
};
