import React from 'react';

// ============================================================
// SLICE BUTTON
// Adapted component — diagonal-fill animation, blue design system,
// multiple variants and sizes, accessible focus states.
// ============================================================

interface SliceButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  external?: boolean;
}

const SliceButton: React.FC<SliceButtonProps> = ({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  disabled = false,
  icon,
  iconPosition = 'right',
  external = false,
}) => {
  const classes = [
    'slice-btn',
    `variant-${variant}`,
    `size-${size}`,
    disabled ? 'opacity-50 pointer-events-none' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const inner = (
    <span className="slice-content">
      {icon && iconPosition === 'left' && (
        <span className="flex-shrink-0">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="flex-shrink-0">{icon}</span>
      )}
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        aria-disabled={disabled}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}
    >
      {inner}
    </button>
  );
};

export default SliceButton;
