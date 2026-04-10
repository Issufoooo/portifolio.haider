import React from 'react';

// ============================================================
// MOBILE MOCKUP FRAME
// Adapted component — dark theme, CSS-only frame,
// supports image or video, fully responsive.
// ============================================================

interface MobileMockupFrameProps {
  src?: string;
  type?: 'image' | 'video';
  alt?: string;
  className?: string;
  /** Renders a placeholder if no src is provided */
  placeholder?: string;
}

const MobileMockupFrame: React.FC<MobileMockupFrameProps> = ({
  src,
  type = 'image',
  alt = 'Website preview',
  className = '',
  placeholder = 'Preview',
}) => {
  return (
    <div className={`phone-frame ${className}`} role="img" aria-label={alt}>
      <div className="phone-screen">
        {src ? (
          type === 'video' ? (
            <video
              src={src}
              autoPlay
              muted
              loop
              playsInline
              aria-label={alt}
            />
          ) : (
            <img
              src={src}
              alt={alt}
              loading="lazy"
            />
          )
        ) : (
          <div
            className="w-full h-full placeholder-img"
            aria-hidden="true"
          >
            <span
              style={{
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                letterSpacing: '0.15em',
              }}
            >
              {placeholder}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMockupFrame;
