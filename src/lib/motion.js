// Motion gate for the whole site.
//
// Every scripted animation goes through run(). The reduced-motion preference is
// read live at call time, so toggling it mid-session is honored by the very next
// interaction (spec: reduced-motion support, "preference enabled during session").
import { animate } from 'animejs';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

export function prefersReducedMotion() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

/**
 * Run an Anime.js v4 animation unless reduced motion is active.
 * Returns a promise that always resolves, so callers can await either path.
 */
export function run(targets, params = {}) {
  const resolved = resolveTargets(targets);
  if (resolved.length === 0) return Promise.resolve(null);

  if (prefersReducedMotion()) {
    // Instant state change: no animation, content already in its final state.
    return Promise.resolve(null);
  }

  const animation = animate(resolved, params);
  return animation.then(() => animation);
}

// Accepts a CSS selector, an element, or an array-like collection of elements.
function resolveTargets(targets) {
  if (!targets) return [];
  if (typeof targets === 'string') {
    if (typeof document === 'undefined') return [];
    return [...document.querySelectorAll(targets)];
  }
  if (targets instanceof Element) return [targets];
  return [...targets];
}
