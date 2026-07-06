import { AbstractService } from "cruzo"
import { Lang } from "site/translate"

class LangService extends AbstractService {
  lang$ = this.newRx<Lang>(Lang.ru); // дефолт - русский

  toggle() {
    const next = this.lang$.actual === Lang.ru ? Lang.en : Lang.ru;
    this.lang$.update(next);
  }
}

export const langService = new LangService();