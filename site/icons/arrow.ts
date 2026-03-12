import { componentsRegistryService } from 'cruzo';
import { AbstractIcon } from './abstract';

export class ArrowIcon extends AbstractIcon {
  static selector = "arrow-icon";

  getHTML() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10.9 6.2">
        <path d="M5.4 6.2L0 .7.7 0l4.7 4.8L10.1 0l.8.7z"></path>
      </svg>`;
  }
}

componentsRegistryService.define(ArrowIcon);