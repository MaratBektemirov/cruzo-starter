import { AbstractService } from "cruzo"
import { SectionIds } from "site/sections"
import { langService } from "site/services/lang.service"
import { trs } from "site/translate"

class AppService extends AbstractService {
  trs$ = this.newRx(trs);

  currentSectionId$ = this.newRx<SectionIds>(null);

  section$ = this.newRxFunc(
    (trs, lang, sectionId) => {
      if (!trs || !lang || !sectionId) return null;
      return trs[lang].sections[sectionId];
    },
    this.trs$ as any,
    langService.lang$ as any,
    this.currentSectionId$ as any
  );

  sections$ = this.newRxFunc(
    (trs, lang) => {
      if (!trs || !lang) return null;
      return trs[lang].sections;
    },
    this.trs$ as any,
    langService.lang$ as any,
  );

  constructor() {
    super();
  }
}

export const appService = new AppService();