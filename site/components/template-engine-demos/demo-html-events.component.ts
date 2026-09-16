import { AbstractComponent, componentsRegistryService, i18nService } from "cruzo"
import { UI_KIT } from "cruzo/ui-components/const"
import i18n from "./demo-html-events.component.i18n.json"

export class DemoHtmlEventsComponent extends AbstractComponent {
  static selector = "demo-html-events-component";

  text = this.newRx("");
  lastKey = this.newRx("");
  checked = this.newRx(false);

  i18n$ = i18nService.connect(this, i18n);

  protected getHTML(): string {
    return `<div>
        <div class="mt_s">
          <input
            placeholder="{{ root.i18n$::rx.placeholder }}"
            value="{{ root.text::rx }}"
            oninput="{{ root.text.update(event.target.value) }}"
            onkeydown="{{ root.lastKey.update(event.key) }}"
            class="${UI_KIT}_input"
            />
          <div class="ml_xs mt_s">
            <div>{{ root.i18n$::rx.text }}: <b>{{ root.text::rx }}</b></div>
            <div>{{ root.i18n$::rx.lastKey }}: <b>{{ root.lastKey::rx }}</b></div>
          </div>
        </div>

        <label class="${UI_KIT}_checkbox mt_m">
          <input
            type="checkbox"
            class="${UI_KIT}_checkbox-input"
            onchange="{{ root.checked.update(event.target.checked) }}"
            />
          <span>{{ root.i18n$::rx.checked }}: <b>{{ root.checked::rx }}</b></span>
        </label>

        <div class="mt_s">
          <button onclick="{{ root.reset() }}" class="${UI_KIT}_button ${UI_KIT}_button-s mb_s ${UI_KIT}_button-primary">
            {{ root.i18n$::rx.reset }}
          </button>
        </div>
      </div>`;
  }

  reset() {
    this.text.update("");
    this.lastKey.update("");
    this.checked.update(false);
  }
}

componentsRegistryService.define(DemoHtmlEventsComponent);