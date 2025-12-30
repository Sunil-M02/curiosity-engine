/**
 * Production Environment Guard
 * Ensures builder/editor elements are stripped in production
 */

const isProduction = import.meta.env.PROD;

/**
 * Removes any residual builder UI elements from the DOM
 */
export function cleanBuilderElements(): void {
  if (!isProduction) return;
  
  const builderSelectors = [
    '[data-lovable-edit]',
    '[data-lovable-component]',
    '.lovable-overlay',
    '.lovable-badge',
    '#lovable-editor-root',
  ];
  
  builderSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => el.remove());
  });
}

/**
 * Blocks builder postMessage events in production
 */
export function blockBuilderMessages(): void {
  if (!isProduction) return;
  
  const allowedOrigins = [window.location.origin];
  
  window.addEventListener('message', (event) => {
    if (!allowedOrigins.includes(event.origin)) {
      // Silently ignore non-allowed origins in production
      return;
    }
  }, { capture: true });
}

/**
 * Initialize production hardening
 */
export function initProductionGuard(): void {
  if (!isProduction) return;
  
  // Clean on load
  cleanBuilderElements();
  
  // Block unauthorized messages
  blockBuilderMessages();
  
  // Observe and clean any dynamically added builder elements
  const observer = new MutationObserver(() => {
    cleanBuilderElements();
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}
