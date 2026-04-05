export const SECTION_QUERY = "section";

const SCROLL_OFFSET_PX = 120;

let blockScrollToSection = false;

export function withSectionQuery(routeHref: string, sectionId: string): string {
  if (!routeHref || !sectionId) return routeHref;

  if (routeHref.startsWith("#/")) {
    const body = routeHref.slice(2);
    const qIdx = body.indexOf("?");
    const pathOnly = qIdx >= 0 ? body.slice(0, qIdx) : body;
    const search = qIdx >= 0 ? body.slice(qIdx + 1) : "";
    const params = new URLSearchParams(search);
    params.set(SECTION_QUERY, sectionId);
    const q = params.toString();
    return `#/${pathOnly}?${q}`;
  }

  const u = new URL(routeHref, "http://router.invalid");
  u.searchParams.set(SECTION_QUERY, sectionId);
  return u.pathname + u.search;
}

export function getSectionSubIdFromSearch(search: string): string | null {
  if (!search) return null;
  const qs = search.startsWith("?") ? search.slice(1) : search;
  if (!qs) return null;
  const v = new URLSearchParams(qs).get(SECTION_QUERY);
  return v || null;
}

export function blockScrollToSectionElement(): () => void {
  blockScrollToSection = true;
  return () => {
    queueMicrotask(() => {
      blockScrollToSection = false;
    });
  };
}

export function scrollToSectionFromSearch(search: string): void {
  if (blockScrollToSection) return;

  const id = getSectionSubIdFromSearch(search);
  if (!id) return;

  requestAnimationFrame(() => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET_PX;
    window.scrollTo({ top: Math.max(0, top), behavior: "auto" });
  });
}
