/**
 * Контент главной страницы — README на русском (стилистика как в разделах Docs).
 */
import DemoComponentCode from "site/components/home-demos/demo-readme-1.component?raw";
import DemoExpressionsComponentCode from "site/components/home-demos/demo-readme-2.component?raw";
import DemoScopeComponentCode from "site/components/home-demos/demo-readme-scope.component?raw";

export type ReadmeBlock =
  | { type: "html"; content: string }
  | { type: "code"; code: string; lang: string };

export const readmeBlocks: ReadmeBlock[] = [
  {
    type: "html",
    content: `<h2 class="mt_xl">Возможности</h2>
      <ul class="description-list">
        <li class="description-list-item"><b>Без зависимостей</b></li>
        <li class="description-list-item"><b>VM выражений</b> — в шаблонах <code class="description-inline-code">{{ }}</code> компилируются в байткод и выполняются в стековой VM</li>
        <li class="description-list-item"><b>Rx / RxFunc</b> — реактивные значения</li>
        <li class="description-list-item"><b>RxScope</b> — именованные «buckets» состояния для компонентов</li>
        <li class="description-list-item"><b>Роутер</b> — декларативные маршруты, параметры, редиректы</li>
        <li class="description-list-item"><b>HttpClient</b> — кэш, интерцепторы, AbortSignal</li>
        <li class="description-list-item"><b>UI-набор</b> — Input, Select, ButtonGroup, Upload, Spinner, Modal, RouterLink в <code class="description-inline-code">cruzo/ui-components</code></li>
      </ul>`,
  },
  { type: "html", content: `<h2 class="mt_xl">Установка</h2>` },
  {
    type: "code",
    code: `npm install cruzo`,
    lang: "bash",
  },
  { type: "html", content: `<h2 class="mt_xl">Инициализация</h2>` },
  {
    type: "code",
    code: `import { Template, componentsRegistryService, routerService } from "cruzo";
import "cruzo/ui-components/input";
import "cruzo/ui-components/button-group";
import "cruzo/ui-components/router-link"; // и др. по необходимости

Template.setAppVariables({});
componentsRegistryService.initApp();
routerService.update();`,
    lang: "typescript",
  },
  {
    type: "html",
    content: `<h2 class="mt_xl">Примеры</h2>
      <p class="description-paragraph">
        Ниже — несколько примеров, показывающих синтаксис шаблонов и работу с Router и HTTP (интерцепторы, кэш).
      </p>
      <h3 class="mt_l mb_s">1. Шаблон: repeat, attached, once::, let-*, события, ::rx</h3>
      <p class="description-paragraph">
        Списки, условный DOM, однократное вычисление, локальные переменные, нативные события.
      </p>`,
  },
  {
    type: "code",
    code: DemoComponentCode,
    lang: "typescript",
  },
  {
    type: "html",
    content: `<h3 class="mt_l mb_s">2. Шаблон: let-*, методы, ?., ??, shorthand, inner-html</h3>
      <p class="description-paragraph">
        В <code class="description-inline-code">{{ }}</code>: методы компонента, optional chaining, nullish coalescing, shorthand объектов.
      </p>`,
  },
  {
    type: "code",
    code: DemoExpressionsComponentCode,
    lang: "typescript",
  },
  {
    type: "html",
    content: `<h3 class="mt_l mb_s">3. RxScope и дочерние компоненты</h3>
      <p class="description-paragraph">
        Один scope, несколько компонентов; родитель подписывается через <code class="description-inline-code">newRxValueFromScope</code>.
      </p>`,
  },
  {
    type: "code",
    code: DemoScopeComponentCode,
    lang: "typescript",
  },
  { type: "html", content: `<h3 class="mt_l mb_s">Роутер</h3>` },
  {
    type: "code",
    code: `import { RouteUrlBucket } from "cruzo";
import { HomeComponent } from "./home.component";
import { DocsSectionComponent } from "./docs-section.component";

const routerUrlBucket = new RouteUrlBucket({
  main: {
    url: "/",
    componentSelectorUnbox: () => HomeComponent.selector,
    routeSelectorUnbox: () => ".section",
  },
  docs: {
    url: "/docs/:section",
    componentSelectorUnbox: () => DocsSectionComponent.selector,
    routeSelectorUnbox: () => ".section",
  },
});

routerUrlBucket.buildUrl("main");
routerUrlBucket.buildUrl("docs", { section: "template-engine" });`,
    lang: "typescript",
  },
  { type: "html", content: `<h3 class="mt_l mb_s">HTTP: интерцепторы и кэш</h3>` },
  {
    type: "code",
    code: `import { HttpClient } from "cruzo";

const client = new HttpClient("https://api.example.com", {
  params: async (method, url, options) => {
    options.headers = options.headers || {};
    options.headers["Authorization"] = "Bearer " + getToken();
  },
  error: async (method, url, options, status) => {
    if (status === 401) {
      // logout
    }
  },
});

const cached = new HttpClient("https://api.example.com", {}, false, 60_000);
await cached.get("/users");
await cached.get("/users", { useCache: true });
await cached.clearCache("GET", "/users");`,
    lang: "typescript",
  },
  {
    type: "html",
    content: `<h2 class="mt_xl">Кратко о концепциях</h2>
      <ul class="description-list">
        <li class="description-list-item"><b>Шаблоны:</b> <code class="description-inline-code">{{ expression }}</code> — компиляция в байткод, выполнение в VM. Модификатор <code class="description-inline-code">::rx</code> подписывает узел на обновления.</li>
        <li class="description-list-item"><b>Атрибуты:</b> <code class="description-inline-code">repeat</code>, <code class="description-inline-code">attached</code>, <code class="description-inline-code">let-*</code>, <code class="description-inline-code">inner-html</code>, <code class="description-inline-code">onclick</code> и др.</li>
        <li class="description-list-item"><b>Rx / RxFunc:</b> <code class="description-inline-code">this.newRx(initial)</code>, <code class="description-inline-code">this.newRxFunc(fn, ...deps)</code>. В шаблоне: <code class="description-inline-code">root.foo$::rx</code>.</li>
        <li class="description-list-item"><b>RxScope:</b> именованные ведёрки состояния; у компонентов <code class="description-inline-code">scope-id</code> и <code class="description-inline-code">component-id</code>.</li>
        <li class="description-list-item"><b>Роутер:</b> <code class="description-inline-code">routerService</code>, <code class="description-inline-code">RouteUrlBucket</code>, <code class="description-inline-code">buildUrl(name, params)</code>.</li>
      </ul>`,
  },
  {
    type: "html",
    content: `<h2 class="mt_xl">API</h2>
      <p class="description-paragraph">
        <code class="description-inline-code">Template</code>, <code class="description-inline-code">AbstractComponent</code>, <code class="description-inline-code">AbstractService</code>,
        <code class="description-inline-code">RxScope</code>, <code class="description-inline-code">Rx</code> / <code class="description-inline-code">RxFunc</code>,
        <code class="description-inline-code">componentsRegistryService</code>, <code class="description-inline-code">routerService</code>,
        <code class="description-inline-code">HttpClient</code>, <code class="description-inline-code">cruzo/ui-components</code>, <code class="description-inline-code">cruzo/utils</code>.
      </p>`,
  },
  {
    type: "html",
    content: `<h2 class="mt_xl">UI-компоненты и CSS-модули</h2>
      <p class="description-paragraph">
        Подключение стилей: у каждого компонента свой CSS, например <code class="description-inline-code">import "cruzo/ui-components/select.css"</code> для Select.
        В своих компонентах можно использовать <code class="description-inline-code">*.module.css</code>: импорт по умолчанию даёт объект с классами для <code class="description-inline-code">class="\${styles.wrapper}"</code>.
      </p>`,
  },
];
