import { AbstractService } from "cruzo";
import { SectionIds } from "site/sections";
import { Lang, trs } from "site/translate";

class AppService extends AbstractService {
  trs$ = this.newRx(trs);

  currentLanguage$ = this.newRx<Lang>(Lang.ru);
  currentSectionId$ = this.newRx<SectionIds>(null);

  section$ = this.newRxFunc(
    (trs, lang, sectionId) => {
      if (!trs || !lang || !sectionId) return null;
      return trs[lang].sections[sectionId];
    },
    this.trs$ as any,
    this.currentLanguage$ as any,
    this.currentSectionId$ as any
  );

  sections$ = this.newRxFunc(
    (trs, lang) => {
      if (!trs || !lang) return null;
      return trs[lang].sections;
    },
    this.trs$ as any,
    this.currentLanguage$ as any
  );

  constructor() {
    super();
  }
}

export const appService = new AppService();
