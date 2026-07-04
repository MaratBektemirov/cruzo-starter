import { AbstractComponent, componentsRegistryService } from "cruzo"
import { UI_KIT } from "cruzo/ui-components/const"
import { getTranslater } from 'site/utils/get-translater'
import i18n from "./demo-html-events.component.i18n.json"

export class DemoHtmlEventsComponent extends AbstractComponent {
  static selector = "demo-html-events-component";

  text = this.newRx("");
  lastKey = this.newRx("");
  checked = this.newRx(false);

  t$ = getTranslater(i18n, this)

  protected getHTML(): string {
    return `<div>
        <div class="mt_s">
          <input
            placeholder="{{ root.t$::rx?.placeholder }}"
            value="{{ root.text::rx }}"
            oninput="{{ root.text.update(event.target.value) }}"
            onkeydown="{{ root.lastKey.update(event.key) }}"
            class="${UI_KIT}_input"
            />
          <div class="ml_xs mt_s">
            <div>{{ root.t$::rx?.text }}: <b>{{ root.text::rx }}</b></div>
            <div>{{ root.t$::rx?.lastKey }}: <b>{{ root.lastKey::rx }}</b></div>
          </div>
        </div>

        <label class="${UI_KIT}_checkbox mt_m">
          <input
            type="checkbox"
            class="${UI_KIT}_checkbox-input"
            onchange="{{ root.checked.update(event.target.checked) }}"
            />
          <span>{{ root.t$::rx?.checked }}: <b>{{ root.checked::rx }}</b></span>
        </label>

        <div class="mt_s">
          <button onclick="{{ root.reset() }}" class="${UI_KIT}_button ${UI_KIT}_button-s mb_s ${UI_KIT}_button-primary">
            {{ root.t$::rx?.reset }}
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