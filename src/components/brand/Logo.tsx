import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'full' | 'wordmark' | 'symbol';
  className?: string;
  linkTo?: string;
  size?: 'sm' | 'md' | 'lg';
}

// Orbital symbol SVG component
function LogoSymbol({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('flex-shrink-0', className)}
      aria-hidden="true"
    >
      {/* Orbital rings - cream/off-white strokes */}
      <ellipse
        cx="24"
        cy="24"
        rx="22"
        ry="22"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity="0.6"
        className="text-logo"
      />
      <ellipse
        cx="24"
        cy="24"
        rx="18"
        ry="18"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity="0.7"
        className="text-logo"
      />
      <ellipse
        cx="24"
        cy="24"
        rx="14"
        ry="14"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity="0.8"
        className="text-logo"
      />
      <ellipse
        cx="24"
        cy="24"
        rx="10"
        ry="10"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity="0.9"
        className="text-logo"
      />
      
      {/* Inner dark circle */}
      <circle
        cx="24"
        cy="24"
        r="7"
        className="fill-background"
      />
      
      {/* Amber/gold center glow */}
      <circle
        cx="24"
        cy="24"
        r="3.5"
        className="fill-logo-accent"
      />
      {/* Subtle glow effect */}
      <circle
        cx="24"
        cy="24"
        r="4.5"
        className="fill-logo-accent/30"
      />
    </svg>
  );
}

// Editorial serif wordmark
function LogoWordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'font-logo text-logo tracking-tight',
        className
      )}
    >
      CuriosityFields
    </span>
  );
}

export function Logo({
  variant = 'full',
  className,
  linkTo = '/',
  size = 'md',
}: LogoProps) {
  const sizeClasses = {
    sm: {
      symbol: 'w-7 h-7',
      wordmark: 'text-lg',
      gap: 'gap-2',
    },
    md: {
      symbol: 'w-9 h-9',
      wordmark: 'text-xl',
      gap: 'gap-2.5',
    },
    lg: {
      symbol: 'w-11 h-11',
      wordmark: 'text-2xl',
      gap: 'gap-3',
    },
  };

  const sizes = sizeClasses[size];

  const content = (
    <>
      {(variant === 'full' || variant === 'symbol') && (
        <LogoSymbol className={sizes.symbol} />
      )}
      {(variant === 'full' || variant === 'wordmark') && (
        <LogoWordmark className={sizes.wordmark} />
      )}
    </>
  );

  if (linkTo) {
    return (
      <Link
        to={linkTo}
        className={cn(
          'flex items-center group transition-opacity hover:opacity-80',
          sizes.gap,
          className
        )}
      >
        {content}
      </Link>
    );
  }

  return (
    <div className={cn('flex items-center', sizes.gap, className)}>
      {content}
    </div>
  );
}

// Export individual components for flexibility
export { LogoSymbol, LogoWordmark };
