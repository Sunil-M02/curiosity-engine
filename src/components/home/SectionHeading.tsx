import { motion } from 'framer-motion';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

/**
 * Editorial section heading with thin vertical rule + 11px uppercase eyebrow.
 */
export function SectionHeading({ eyebrow, title, description, align = 'left' }: SectionHeadingProps) {
  const isCenter = align === 'center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={isCenter ? 'flex justify-center mb-12' : 'mb-12'}
    >
      <div className="flex items-stretch gap-4">
        {/* Thin vertical rule */}
        <span
          aria-hidden
          className="w-px bg-border/80 self-stretch min-h-[3.5rem]"
        />
        <div className={isCenter ? 'text-left' : ''}>
          <span
            className="block text-foreground/70 uppercase tracking-[0.18em] mb-2"
            style={{ fontSize: '11px', letterSpacing: '0.18em', fontWeight: 600 }}
          >
            {eyebrow}
          </span>
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-foreground leading-tight">
            {title}
          </h2>
          {description && (
            <p className="text-muted-foreground text-lg mt-3 max-w-2xl">
              {description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}