export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface ArticleTocResult {
  contentHtml: string;
  tocItems: TocItem[];
  eligibleH2Count: number;
}

const slugifyHeading = (text: string) =>
  text
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

const getUniqueId = (baseSlug: string, slugCounts: Map<string, number>) => {
  const safeBase = baseSlug || 'section';
  const seen = slugCounts.get(safeBase) ?? 0;
  slugCounts.set(safeBase, seen + 1);
  return seen === 0 ? safeBase : `${safeBase}-${seen + 1}`;
};

const isFaqContainerHeading = (heading: Element) =>
  Boolean(heading.closest('[id*="faq" i], [class*="faq" i]'));

const isFaqQuestionHeading = (heading: HTMLHeadingElement) =>
  heading.tagName === 'H3' && /\?\s*$/.test((heading.textContent ?? '').replace(/\s+/g, ' ').trim());

export const buildArticleToc = (content: string): ArticleTocResult => {
  if (typeof window === 'undefined') {
    return { contentHtml: content, tocItems: [], eligibleH2Count: 0 };
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(`<div>${content}</div>`, 'text/html');
  const root = doc.body.firstElementChild as HTMLElement | null;

  if (!root) {
    return { contentHtml: content, tocItems: [], eligibleH2Count: 0 };
  }

  const slugCounts = new Map<string, number>();
  const tocItems: TocItem[] = [];
  const headings = Array.from(root.querySelectorAll('h2, h3')) as HTMLHeadingElement[];
  const faqQuestionHeadings = new Set<HTMLHeadingElement>();
  let currentH2Seen = false;
  let eligibleH2Count = 0;

  headings.forEach((heading, index) => {
    if (heading.tagName !== 'H2') return;

    const siblingH3Headings: HTMLHeadingElement[] = [];
    for (let i = index + 1; i < headings.length && headings[i].tagName !== 'H2'; i += 1) {
      if (headings[i].tagName === 'H3') {
        siblingH3Headings.push(headings[i]);
      }
    }

    if (!siblingH3Headings.length) return;

    const isFaqBlock =
      isFaqContainerHeading(heading) ||
      (siblingH3Headings.length >= 2 && siblingH3Headings.every((siblingH3) => isFaqQuestionHeading(siblingH3)));

    if (!isFaqBlock) return;

    siblingH3Headings.forEach((faqHeading) => faqQuestionHeadings.add(faqHeading));
  });

  headings.forEach((heading) => {
    const rawText = heading.textContent ?? '';
    const text = rawText.replace(/\s+/g, ' ').trim();

    if (!text) return;

    const level = heading.tagName === 'H2' ? 2 : 3;

    if (level === 3 && !currentH2Seen) {
      return;
    }

    const id = getUniqueId(slugifyHeading(text), slugCounts);
    heading.id = id;

    if (level === 2) {
      currentH2Seen = true;
      eligibleH2Count += 1;
    }

    if (faqQuestionHeadings.has(heading)) {
      return;
    }

    tocItems.push({ id, text, level });
  });

  return {
    contentHtml: root.innerHTML,
    tocItems,
    eligibleH2Count,
  };
};
