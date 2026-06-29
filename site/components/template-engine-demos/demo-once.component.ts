import { AbstractComponent, componentsRegistryService } from "cruzo"
import { UI_KIT } from "cruzo/ui-components/const"
import { langService } from "site/services/lang.service"

export class DemoOnceComponent extends AbstractComponent {
  static selector = "demo-once-component";

  label_ru = this.newRx("значение при монтировании");
  label_en = this.newRx("value at mount time");

  lang$ = this.newRxFunc(
    () => langService.lang$.actual,
    langService.lang$
  );

  protected getHTML(): string {
    return `<div>
        <p class="description-paragraph mb_s">
          <code class="description-inline-code">once::</code>
          {{ root.lang$::rx === "ru"
            ? "— выражение выполняется и обновляется только один раз."
            : "— the expression is evaluated and updated only once." }}
        </p>
        <button class="${UI_KIT}_button ${UI_KIT}_button-s mb_s ${UI_KIT}_button-primary"
          onclick="{{ root.lang$::rx === 'ru' ? root.label_ru.update('после клика') : root.label_en.update('after click') }}">
          {{ root.lang$::rx === "ru" ? "Обновить label" : "Update label" }}
        </button>
        <div class="mb_s">
          <code class="description-inline-code">once::</code>
          <span>{{ once::root.lang$::rx === "ru" ? root.label_ru::rx : root.label_en::rx }}</span>
        </div>
        <div class="mt_s">
          <code class="description-inline-code">::rx</code>
          <code>{{ root.lang$::rx === "ru" ? root.label_ru::rx : root.label_en::rx }}</code>
        </div>
      </div>`;
  }
}

componentsRegistryService.define(DemoOnceComponent);