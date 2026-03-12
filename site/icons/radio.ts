import { AbstractIcon } from './abstract';
import { componentsRegistryService } from "cruzo";

export class RadioIcon extends AbstractIcon {
  static selector = "radio-icon";
  getHTML() {
    return `<svg id="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
        <path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,26A12,12,0,1,1,28,16,12,12,0,0,1,16,28Z"/>
      </svg>`;
  }
}

componentsRegistryService.define(RadioIcon);