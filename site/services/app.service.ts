import { AbstractService, i18nService } from "cruzo"
import { SectionIds } from "site/sections"
import { Lang, trs } from "site/translate"

class AppService extends AbstractService {
  currentSectionId$ = this.newRx<SectionIds>(null);

  section$ = this.newRxFunc(
    (lang: string, sectionId: SectionIds) => {
      if (!lang || !sectionId) return null;
      return trs[lang as Lang]?.sections[sectionId] ?? null;
    },
    i18nService.lang$,
    this.currentSectionId$
  );

  sections$ = this.newRxFunc(
    (lang: string) => {
      if (!lang) return null;
      return trs[lang as Lang]?.sections ?? null;
    },
    i18nService.lang$,
  );
}

export const appService = new AppService();
