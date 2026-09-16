import { AbstractComponent, componentsRegistryService, i18nService } from "cruzo"
import { UI_KIT } from "cruzo/ui-components/const"
import i18n from './demo-nested-rx.component.i18n.json'

export class DemoNestedRx extends AbstractComponent {
  static selector = "demo-nested-rx";

  i18n$ = i18nService.connect(this, i18n);


  data$ = this.newRx<{ user: { name: string; count: number }; tag: string }>({
    user: { name: "Alice", count: 0 },
    tag: "demo",
  });

  protected getHTML(): string {
    return `<div>
        <div class="fx mb_s">
          <button onclick="{{ root.inc() }}" class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-primary mr_s">{{ root.i18n$::rx.increment }}</button>
          <button onclick="{{ root.rename() }}" class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-secondary">{{ root.i18n$::rx.changeName }}</button>
        </div>
        <p class="mb_s">{{ root.i18n$::rx.user }}: {{ root.data$::rx.user.name }}, {{ root.i18n$::rx.count }}: {{ root.data$::rx.user.count }}</p>
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
