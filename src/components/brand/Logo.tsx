import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'full' | 'wordmark' | 'symbol';
  className?: string;
  linkTo?: string;
  size?: 'sm' | 'md' | 'lg';
}

// Abstract "C" symbol - open arcs forming the letter C
function LogoSymbol({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('flex-shrink-0', className)}
      aria-hidden="true"
    >
      {/* Outer arc - largest C curve */}
      <path
        d="M 38 24 A 14 14 0 1 1 38 24.01"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
        fill="none"
        className="text-logo"
        opacity="0.5"
        transform="rotate(-30 24 24)"
      />
      {/* Second arc */}
      <path
        d="M 35 24 A 11 11 0 1 1 35 24.01"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
        fill="none"
        className="text-logo"
        opacity="0.6"
        transform="rotate(-25 24 24)"
      />
      {/* Third arc */}
      <path
        d="M 32 24 A 8 8 0 1 1 32 24.01"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
        fill="none"
        className="text-logo"
        opacity="0.75"
        transform="rotate(-20 24 24)"
      />
      {/* Inner arc - smallest C curve */}
      <path
        d="M 29 24 A 5 5 0 1 1 29 24.01"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
        fill="none"
        className="text-logo"
        opacity="0.9"
        transform="rotate(-15 24 24)"
      />
      
      {/* Amber/gold center dot */}
      <circle
        cx="24"
        cy="24"
        r="2.5"
        className="fill-logo-accent"
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
