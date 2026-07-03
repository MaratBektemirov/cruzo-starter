import { SIDEBAR_SECTIONS } from "site/components/sidebar/sidebar.component";
import { SectionIds } from "site/sections";
import { routerUrlBucket } from "site/urls";

export type Breadcrumb = {
  label: string;
  href?: string;
};

type SectionMeta = {
  title?: string;
};

function findSectionLabel(id: string) {
  for (const section of SIDEBAR_SECTIONS) {
    if (section.id === id) return section.title;

    for (const child of section.children ?? []) {
      if (child.id === id) return child.title;

      for (const sub of child.sub ?? []) {
        if (sub.id === id) return sub.title;
      }
    }

    for (const sub of section.sub ?? []) {
      if (sub.id === id) return sub.title;
    }
  }

  return null;
}

function finalizeCrumbs(crumbs: Breadcrumb[]) {
  if (crumbs.length) crumbs[crumbs.length - 1].href = undefined;
  return crumbs;
}

export function parseDocsSection(pathname: string) {
  const match = pathname.match(/\/docs\/([^/]+)/);
  return match?.[1] ?? null;
}

function parseTestsRoute(pathname: string) {
  return /(?:^|\/)tests\/?$/.test(pathname);
}

function parseWeb3Section(pathname: string) {
  const match = pathname.match(/\/web3\/([^/]+)/);
  return match?.[1] ?? null;
}

function buildDocsBreadcrumbs(
  routeSection: string,
  sections: Record<string, SectionMeta> | null,
): Breadcrumb[] {
  const sectionId = routeSection as SectionIds;
  const crumbs: Breadcrumb[] = [
    {
      label: "Docs",
      href: routerUrlBucket.buildUrl("docsDefault"),
    },
  ];

  const mainTitle = sections?.[sectionId]?.title || findSectionLabel(sectionId);
  if (!mainTitle) return crumbs;

  crumbs.push({
    label: mainTitle,
    href: routerUrlBucket.buildUrl("docs", { section: routeSection }),
  });

  return finalizeCrumbs(crumbs);
}

function buildTestsBreadcrumbs(sections: Record<string, SectionMeta> | null): Breadcrumb[] {
  const title = sections?.[SectionIds.tests]?.title || findSectionLabel(SectionIds.tests) || "Tests";
  return finalizeCrumbs([{ label: title, href: routerUrlBucket.buildUrl("tests") }]);
}

const WEB3_PAGES: Record<string, { sectionId: SectionIds; routeKey: "web3Sign" | "secretAuth" | "web3Overview" }> = {
  sign: { sectionId: SectionIds["web3-sign"], routeKey: "web3Sign" },
  auth: { sectionId: SectionIds["web3-secret-auth"], routeKey: "secretAuth" },
};

const WEB3_INTRO = {
  sectionId: SectionIds["web3-intro"],
  routeKey: "web3Overview" as const,
};

function sectionTitle(
  id: SectionIds,
  sections: Record<string, SectionMeta> | null,
  fallback?: string,
) {
  return sections?.[id]?.title || findSectionLabel(id) || fallback;
}

function buildWeb3Breadcrumbs(
  routeSection: string,
  sections: Record<string, SectionMeta> | null,
): Breadcrumb[] {
  const { sectionId, routeKey } = WEB3_PAGES[routeSection] ?? WEB3_INTRO;

  return finalizeCrumbs([
    {
      label: sectionTitle(SectionIds.web3, sections, "Web3"),
      href: routerUrlBucket.buildUrl("web3Default"),
    },
    {
      label: sectionTitle(sectionId, sections, routeSection),
      href: routerUrlBucket.buildUrl(routeKey),
    },
  ]);
}

export function buildBreadcrumbs(
  pathname: string,
  sections: Record<string, SectionMeta> | null,
): Breadcrumb[] {
  const docsSection = parseDocsSection(pathname);
  if (docsSection) return buildDocsBreadcrumbs(docsSection, sections);

  if (parseTestsRoute(pathname)) return buildTestsBreadcrumbs(sections);

  const web3Section = parseWeb3Section(pathname);
  if (web3Section) return buildWeb3Breadcrumbs(web3Section, sections);

  return [];
}
