import { type MouseEvent, useEffect, useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TocItem } from '@/lib/article-toc';

interface TableOfContentsProps {
  items: TocItem[];
  className?: string;
}

const DEFAULT_SCROLL_OFFSET_PX = 112;
const ARTICLE_ANCHOR_OFFSET_VAR = '--article-anchor-offset';
const OBSERVER_BOTTOM_ROOT_MARGIN = '-65%';

const getScrollOffsetPx = () => {
  const rawOffset = getComputedStyle(document.documentElement).getPropertyValue(ARTICLE_ANCHOR_OFFSET_VAR).trim();
  if (!rawOffset) return DEFAULT_SCROLL_OFFSET_PX;

  if (rawOffset.endsWith('rem')) {
    const remValue = Number.parseFloat(rawOffset);
    if (Number.isFinite(remValue)) {
      const rootFontSize = Number.parseFloat(getComputedStyle(document.documentElement).fontSize);
      return remValue * (Number.isFinite(rootFontSize) ? rootFontSize : 16);
    }
  }

  const pxValue = Number.parseFloat(rawOffset);
  return Number.isFinite(pxValue) ? pxValue : DEFAULT_SCROLL_OFFSET_PX;
};

export function TableOfContents({ items, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '');

  const headingIds = useMemo(() => items.map((item) => item.id), [items]);

  useEffect(() => {
    setActiveId(items[0]?.id ?? '');
  }, [items]);

  useEffect(() => {
    if (!headingIds.length) return;

    const headings = headingIds
      .map((id) => document.getElementById(id))
      .filter((heading): heading is HTMLElement => Boolean(heading));

    if (!headings.length) return;

    const scrollOffset = getScrollOffsetPx();

    const updateActiveHeading = () => {
      const passed = headings.filter((heading) => heading.getBoundingClientRect().top - scrollOffset <= 0);
      const nextActive = passed.length ? passed[passed.length - 1].id : headings[0].id;
      setActiveId(nextActive);
    };

    const observer = new IntersectionObserver(
      () => updateActiveHeading(),
      {
        root: null,
        rootMargin: `${-scrollOffset}px 0px ${OBSERVER_BOTTOM_ROOT_MARGIN} 0px`,
        threshold: [0, 0.5, 1],
      }
    );

    headings.forEach((heading) => observer.observe(heading));
    updateActiveHeading();

    return () => observer.disconnect();
  }, [headingIds]);

  const handleNavigate = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    const heading = document.getElementById(id);
    if (!heading) return;

    event.preventDefault();
    heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.pushState(null, '', `#${id}`);
    setActiveId(id);
  };

  const navList = (
    <ol className="space-y-1">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            onClick={(event) => handleNavigate(event, item.id)}
            className={cn(
              'block rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
              item.level === 3 && 'ml-3 text-xs',
              activeId === item.id && 'text-primary'
            )}
            aria-current={activeId === item.id ? 'location' : undefined}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <div className={className}>
      <details className="group xl:hidden rounded-xl border border-border/60 bg-card/40">
        <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-medium text-foreground [&::-webkit-details-marker]:hidden">
          <span>On this page</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
        </summary>
        <nav aria-label="Table of contents" className="border-t border-border/60 px-3 py-3">
          {navList}
        </nav>
      </details>

      <aside className="hidden xl:block sticky top-28 self-start h-fit border-r border-border/60">
  <nav
    aria-label="Table of contents"
    className="pr-4"
  >
    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
      On this page
    </p>

    {navList}
  </nav>
</aside>
    </div>
  );
}
