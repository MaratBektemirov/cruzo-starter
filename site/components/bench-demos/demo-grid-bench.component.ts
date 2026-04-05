import { AbstractComponent, componentsRegistryService, Rx } from "cruzo";
import styles from "./demo-grid-bench.component.module.css";

export class DemoGridBench extends AbstractComponent {
  static selector = "demo-grid-bench";

  rows: Rx<any>[][] = [];

  public cells: Rx<any>[] = [];

  protected getHTML(): string {
    return `<div>
        <button onclick="{{ root.updateRandom() }}" class="cruzo-ui-component_button cruzo-ui-component_button-s mb_s cruzo-ui-component_button-primary">Update ~1K random nodes from 4K</button>

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
    super.connectedCallback();
    this.build();
  }

  build() {
    const rows: Rx<any>[][] = [];

    for (let r = 0; r < 65; r++) {
      const row: Rx<any>[] = [];
      for (let c = 0; c < 65; c++) {
        const id = this.uuid();
        row.push(this.newRx({ id, color: this.colorFrom(id) }));
      }
      rows.push(row);
    }

    this.rows = rows;
    this.template.detectChanges();
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
    for (let r = 0; r < 65; r++) {
      for (let c = 0; c < 65; c++) {
        if (Math.random() < 0.25) {
          const id = this.uuid();
          this.rows[r][c].update({ id, color: this.colorFrom(id) });
        }
      }
    }
  }
}

componentsRegistryService.define(DemoGridBench);
