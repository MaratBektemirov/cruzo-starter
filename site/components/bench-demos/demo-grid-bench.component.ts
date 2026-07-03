import { AbstractComponent, componentsRegistryService, Rx } from "cruzo"
import { UI_KIT } from "cruzo/ui-components/const"
import { langService } from 'site/services/lang.service'
import i18n from './demo-grid-bench.component.i18n.json'
import styles from "./demo-grid-bench.component.module.css"

export class DemoGridBench extends AbstractComponent {
  static selector = "demo-grid-bench";

  i18n = i18n;
  lang$ = this.newRxFunc(() => langService.lang$.actual, langService.lang$);
  t$ = this.newRxFunc((lang) => this.i18n[lang], this.lang$);

  rows: Rx<any>[][] = [];

  public cells: Rx<any>[] = [];

  protected getHTML(): string {
    return `<div>
        <button onclick="{{ root.updateRandom() }}" class="${UI_KIT}_button ${UI_KIT}_button-s mb_s ${UI_KIT}_button-primary">{{ root.t$::rx.updateButtom }}</button>

        <div
          class="${styles["grid-color-container"]}"
          >
          <div
            repeat="{{ root.rows }}"
            class="${styles["grid-color-container__row"]}"
            >
            <div
              repeat="{{ this }}"
              class="${styles["grid-color-container__cell"]}"
              style="color: {{ this::rx.color }};"
              >
              <span>{{ this::rx.id }}</span>
            </div>
          </div>
        </div>
      </div>`;
  }

  connectedCallback() {
    this.createGrid();
    super.connectedCallback();
  }

  createGrid() {
    const rows: Rx<any>[][] = [];

    for (let r = 0; r < 33; r++) {
      const row: Rx<any>[] = [];
      for (let c = 0; c < 33; c++) {
        const id = this.uuid();
        row.push(this.newRx({ id, color: this.colorFrom(id) }));
      }
      rows.push(row);
    }

    this.rows = rows;
  }

  uuid(): string {
    return Math.random().toString(16).slice(2, 10);
  }

  colorFrom(s: string): string {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
    const r = (h >> 16) & 255;
    const g = (h >> 8) & 255;
    const b = h & 255;
    return `rgb(${r},${g},${b})`;
  }

  updateRandom() {
    for (let r = 0; r < 33; r++) {
      for (let c = 0; c < 33; c++) {
        if (Math.random() < 0.25) {
          const id = this.uuid();
          this.rows[r][c].update({ id, color: this.colorFrom(id) });
        }
      }
    }
  }
}

componentsRegistryService.define(DemoGridBench);
