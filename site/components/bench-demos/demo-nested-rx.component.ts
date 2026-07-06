import { AbstractComponent, componentsRegistryService } from "cruzo"
import { UI_KIT } from "cruzo/ui-components/const"
import { getTranslater } from 'site/utils/get-translater'
import i18n from './demo-nested-rx.component.i18n.json'

export class DemoNestedRx extends AbstractComponent {
  static selector = "demo-nested-rx";

  t$ = getTranslater(i18n, this)


  data$ = this.newRx<{ user: { name: string; count: number }; tag: string }>({
    user: { name: "Alice", count: 0 },
    tag: "demo",
  });

  protected getHTML(): string {
    return `<div>
        <div class="fx mb_s">
          <button onclick="{{ root.inc() }}" class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-primary mr_s">{{ root.t$::rx?.increment }}</button>
          <button onclick="{{ root.rename() }}" class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-secondary">{{ root.t$::rx?.changeName }}</button>
        </div>
        <p class="mb_s">{{ root.t$::rx?.user }}: {{ root.data$::rx.user.name }}, {{ root.t$::rx?.count }}: {{ root.data$::rx.user.count }}</p>
        <p>Tag: {{ root.data$::rx.tag }}</p>
      </div>`;
  }

  inc() {
    const d = this.data$.actual;
    this.data$.update({
      ...d,
      user: { ...d.user, count: d.user.count + 1 },
    });
  }

  rename() {
    const d = this.data$.actual;
    this.data$.update({
      ...d,
      user: { ...d.user, name: d.user.name === "Alice" ? "Bob" : "Alice" },
    });
  }
}

componentsRegistryService.define(DemoNestedRx);
