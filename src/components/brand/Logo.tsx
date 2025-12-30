import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import logoSymbol from '@/assets/logo-symbol.png';

interface LogoProps {
  variant?: 'full' | 'wordmark' | 'symbol';
  className?: string;
  linkTo?: string;
  size?: 'sm' | 'md' | 'lg';
}

// Logo symbol using uploaded image
function LogoSymbol({ className }: { className?: string }) {
  return (
    <img
      src={logoSymbol}
      alt="CuriosityFields"
      className={cn('flex-shrink-0 object-contain', className)}
    />
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
      symbol: 'w-9 h-9',
      wordmark: 'text-lg',
      gap: 'gap-2',
    },
    md: {
      symbol: 'w-11 h-11',
      wordmark: 'text-xl',
      gap: 'gap-2.5',
    },
    lg: {
      symbol: 'w-14 h-14',
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
