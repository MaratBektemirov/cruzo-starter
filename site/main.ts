import "./css/colors.css";
import "./css/font.css";
import "./css/common.css";
import "./css/typography.css";
import "./css/margin.css";
import "./css/fx.css";
import "./css/description.css";

import { Template, componentsRegistryService, routerService } from "cruzo";
import "cruzo/ui-components/input.css";
import "cruzo/ui-components/button-group.css";
import "cruzo/ui-components/select.css";
import "cruzo/ui-components/spinner.css";
import "cruzo/ui-components/modal.css";
import "cruzo/ui-components/upload.css";

import "site/components/header/header.component";
import "site/components/sidebar/sidebar.component";
import "site/components/tests/tests.component";

function initApp() {
  Template.setAppVariables({});
  componentsRegistryService.initApp();
  routerService.update();
}

initApp();
