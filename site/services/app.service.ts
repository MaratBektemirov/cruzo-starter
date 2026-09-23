import { AbstractService, i18nService } from "cruzo"
import { SectionIds } from "site/sections"
import { Lang, trs } from "site/translate"

class AppService extends AbstractService {
  currentSectionId$ = this.newRx<SectionIds>(null);

  section$ = this.newRxFunc(
    (lang: string, sectionId: SectionIds) => {
      if (!sectionId) return null;
      return this.sectionsFor(lang)[sectionId] ?? null;
    },
    i18nService.lang$,
    this.currentSectionId$
  );

  sections$ = this.newRxFunc(
    (lang: string) => this.sectionsFor(lang),
    i18nService.lang$,
  );

  private sectionsFor(lang: string) {
    return (trs[lang as Lang] ?? trs.ru).sections;
  }
}

export const appService = new AppService();
