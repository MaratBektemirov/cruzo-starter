import { componentsRegistryService } from 'cruzo';
import { AbstractIcon } from './abstract';

export class CloseIcon extends AbstractIcon {
  static selector = "close-icon";

  getHTML() {
    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="8 8 16 16" xml:space="preserve">
        <polyline points="14.4,16 9,10.6 10.6,9 16,14.4 21.4,9 23,10.6 17.6,16 23,21.4 21.4,23 16,17.6
          10.6,23 9,21.4 14.4,16 "/>
        </svg>`
  }
}

componentsRegistryService.define(CloseIcon);
