import { AbstractComponent, componentsRegistryService } from "cruzo"
import { UI_KIT } from "cruzo/ui-components/const"
import { langService } from "site/services/lang.service"
import i18n from "./demo-once.component.i18n.json"

export class DemoOnceComponent extends AbstractComponent {
  static selector = "demo-once-component";

  i18n = i18n;
  lang$ = this.newRxFunc(
    () => langService.lang$.actual,
    langService.lang$
  );
  t$ = this.newRxFunc(
    (lang) => this.i18n[lang],
    this.lang$
  );

  label = this.newRx(this.i18n[langService.lang$.actual].label);

  protected getHTML(): string {
    return `<div>
        <p class="description-paragraph mb_s">
          <code class="description-inline-code">once::</code>
          {{ root.t$::rx.description }}
        </p>
        <button class="${UI_KIT}_button ${UI_KIT}_button-s mb_s ${UI_KIT}_button-primary"
          onclick="{{ root.label.update(root.t$::rx.afterClick) }}">
          {{ root.t$::rx.updateButton }}
        </button>
        <div class="mb_s">
          <code class="description-inline-code">once::</code>
          <span>{{ once::root.label::rx }}</span>
        </div>
        <div class="mt_s">
          <code class="description-inline-code">::rx</code>
          <code>{{ root.label::rx }}</code>
        </div>
      </div>`;
  }
}

componentsRegistryService.define(DemoOnceComponent);