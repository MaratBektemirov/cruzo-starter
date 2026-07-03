import { secretAuthProofDemo } from "site/content/secret-auth-proof-type"
import { SectionIds } from "site/sections"

export enum Lang {
  'ru' = 'ru',
  'en' = 'en',
}

type TranslateVariants = {
  one: string;
  two: string;
  five: string;
}

type Translate = { [key in Lang]: {
  sections: Partial<{ [key in SectionIds]: {
    title: string; 
    description?: string; 
    demos?: { [k: number]: string },
    labels?: { [k: string]: string },
  } }>,
} };

const trsSections: Translate = {
  [Lang.ru]: {
    sections: {
      [SectionIds.home]: {
        title: "Cruzo",
        description: `<p class="description-paragraph">
            Создание простых и сложных веб-приложений, без ущерба производительности и размеру бандла.
          </p>`,
        labels: {
          bundleSize: "~14 KB gzip (без ui-components)",
          start: "Начать",
        }
      },
      [SectionIds["template-engine"]]: {
        title: "Template",
        description: `<p class="description-paragraph">
            Главная идея при разработке шаблонизатора — «меньше значит лучше». В основе лежит полностью нативный HTML, а поверх него добавлен самый минимальный набор возможностей:
          </p>

          <ul class="description-list">
            <li class="description-list-item">
              вставки выражений прямо в текст и атрибуты
            </li>
            <li class="description-list-item">
              атрибуты <code class="description-inline-code">attached</code>, <code class="description-inline-code">repeat</code>, <code class="description-inline-code">inner-html</code>
            </li>
            <li class="description-list-item">
              <code class="description-inline-code">::rx</code> — доступ к реактивным значениям
            </li>
            <li class="description-list-item">
              <code class="description-inline-code">once::</code> — единоразовое вычисление и обновление
            </li>
            <li class="description-list-item">
              <code class="description-inline-code">let-name-of-variable</code> — объявление переменных в шаблоне
            </li>
          </ul>

          <p class="description-paragraph">
            Нам не хотелось изобретать новый синтаксис — хотелось аккуратно дополнить то, что уже существует. Любой «новый язык» в шаблонах почти всегда означает время на изучение, а времени на это у людей сейчас, как правило, нет.
          </p>

          <p class="description-paragraph">
            В отличие от популярных фреймворков, где требуется изучать JSX, специальные директивы или сложные системы шаблонов,
            здесь используется обычный HTML с минимальными дополнениями.
          </p>
        `,
      },
      [SectionIds["router"]]: {
        title: "Router",
        description: ``,
      },
      [SectionIds.docs]: {
        title: "Docs",
      },
      [SectionIds.tests]: {
        title: "Тесты",
        labels: {
          run: "Run",
          destroy: "Destroy"
        },
        description: `<p class="description-paragraph">
            Демо запускаются по кнопке "Run" и останавливаются по кнопке "Destroy".
          </p>`,
      },
      [SectionIds.web3]: {
        title: "Web3",
      },
      [SectionIds["web3-intro"]]: {
        title: "Overview",
        description: `<p class="description-paragraph">
            Дополнительные компоненты и <code class="description-inline-code">web3Service</code> для Cruzo: подключение кошельков, подпись и верификация. 
            Есть возможность подключения новых приложений, посредством реализации интерфейса через <code class="description-inline-code">Web3Provider</code>. 
          </p>`,
        demos: {
          1: `<h2 class="mt_xl mb_s">Установка</h2>
            <div class="block mb_xl"><pre style="margin:0;font-family:var(--mono);font-size:13px;line-height:1.6;white-space:pre-wrap;">npm install cruzo cruzo-web3</pre></div>

            <h2 class="mb_s">Быстрый старт</h2>
            <div class="block mb_m"><pre style="margin:0;font-family:var(--mono);font-size:13px;line-height:1.6;white-space:pre-wrap;">import { web3Service } from "cruzo-web3";

const tonManifestUrl = new URL("/tonconnect-manifest.json", window.location.href).href;
web3Service.setWalletConnectProjectId(projectId);
web3Service.setTonManifestUrl(tonManifestUrl);</pre></div>

            <h2 class="mb_s">Настройка mobile-кошельков</h2>
            <ul class="description-list">
              <li class="description-list-item"><b>Ethereum (WalletConnect)</b> — Project ID с <a href="https://cloud.walletconnect.com" target="_blank" rel="noopener">cloud.walletconnect.com</a>, переменная <code class="description-inline-code">VITE_WALLETCONNECT_PROJECT_ID</code></li>
              <li class="description-list-item"><b>TON</b> — публичный <code class="description-inline-code">tonconnect-manifest.json</code> (url, name, iconUrl) и <code class="description-inline-code">setTonManifestUrl</code></li>
            </ul>`,
        },
      },
      [SectionIds["web3-sign"]]: {
        title: "Sign",
        description: `<p class="description-paragraph">
            Демо подписи контента через популярные кошельки.
          </p>`,
        demos: {
          1: `<p class="description-paragraph">
            </p>`,
        },
      },
      [SectionIds["web3-secret-auth"]]: {
        title: "SecretAuth",
        description: `<p class="description-paragraph">
            SecretAuth — это UX-решение для авторизации через криптографический ключ. Вместо пароля пользователь
            подтверждает владение ключом, который у него уже есть: в кошельке, passkey или локально. Для сервера это
            обычная проверка подписи, а для пользователя — вход без отдельного пароля и без передачи чувствительных
            данных.
          </p>
          <p class="description-paragraph">
            Результат — подписанные данные, которые клиент отправляет на сервер. Сервер проверяет подпись,
            убеждается, что публичный ключ разрешён для этого пользователя, а затем выдаёт привычную для приложения
            сессию: JWT, cookie или любой другой session token.
          </p>`,
        demos: {
          1: `<h2 class="mt_xl">Что это</h2>
<p class="description-paragraph">С точки зрения криптографии SecretAuth — та же проверка подписи, что и в разделе <b>Sign</b>: сервер получает сообщение, подпись и публичный ключ, и убеждается, что подпись верна. Новизны в verify нет.</p>
<p class="description-paragraph">SecretAuth нужен потому, что сейчас у пользователей уже есть криптокошельки — MetaMask, Tonkeeper, Phantom и другие. Протокол опирается на эту реальность: challenge подписывается через привычный кошелёк, без пароля и без копирования ключей. Для сценариев вне кошелька — режим с сырым ключом или passkey (WebAuthn).</p>
<p class="description-paragraph">Поверх обычной подписи SecretAuth добавляет стандартизированный challenge (<code class="description-inline-code">domain</code>, <code class="description-inline-code">nonce</code>, <code class="description-inline-code">exp</code>) и единый формат proof для бэкенда. Как выдаёте сессию после успешной проверки — JWT, cookie и т.д. — остаётся на вашей стороне.</p>

<h2>Как работает</h2>
<ol class="description-list">
<li class="description-list-item">Сервер генерирует challenge, сохраняет <code class="description-inline-code">nonce</code>, отдаёт клиенту текст сообщения</li>
<li class="description-list-item">Клиент подписывает сообщение (Wallet, Key или Passkey в компоненте ниже)</li>
<li class="description-list-item">Клиент отправляет <b>proof</b> на API</li>
<li class="description-list-item">Сервер вызывает <code class="description-inline-code">verifySecretAuthProof</code> — проверяет подпись, домен и срок действия</li>
<li class="description-list-item">При успехе — выдаёте свою сессию</li>
</ol>

<h2>Формат challenge</h2>
<div class="block"><pre style="margin:0;font-family:var(--mono);font-size:13px;line-height:1.6;white-space:pre-wrap;">example.com wants you to prove your signing key:

nonce: k8f3m2x9
exp: 1719667500</pre></div>
<p class="description-paragraph">Собирается через <code class="description-inline-code">formatSecretAuthChallenge</code>; <code class="description-inline-code">nonce</code> — <code class="description-inline-code">generateSecretAuthNonce()</code>.</p>

<h2>Формат proof</h2>
<div class="block"><pre style="margin:0;font-family:var(--mono);font-size:13px;line-height:1.6;white-space:pre-wrap;">{
  "message": "example.com wants you to prove…",
  "signature": { "value": "0x…" },
  "pubKey": {
    "algorithm": "secp256k1",
    "source": "ethereum",
    "value": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    "encoding": "hex"
  }
}</pre></div>
<p class="description-paragraph"><code class="description-inline-code">algorithm</code> — криптография (<code class="description-inline-code">secp256k1</code>, <code class="description-inline-code">Ed25519</code>, <code class="description-inline-code">ES256</code>). <code class="description-inline-code">source</code> — откуда ключ: сеть кошелька, <code class="description-inline-code">raw</code> (сырой ключ) или <code class="description-inline-code">webauthn</code> (passkey). <code class="description-inline-code">signature</code> — объект с <code class="description-inline-code">value</code>; для WebAuthn дополнительно <code class="description-inline-code">signature.extension</code> с <code class="description-inline-code">authenticatorData</code> и <code class="description-inline-code">clientDataJSON</code>.</p>
<ul class="description-list">
<li class="description-list-item"><code class="description-inline-code">secp256k1</code> + <code class="description-inline-code">ethereum</code> — EIP-191 / address</li>
<li class="description-list-item"><code class="description-inline-code">secp256k1</code> + <code class="description-inline-code">tron</code> — Tron address</li>
<li class="description-list-item"><code class="description-inline-code">secp256k1</code> + <code class="description-inline-code">raw</code> — сырой secp256k1 (EIP-191)</li>
<li class="description-list-item"><code class="description-inline-code">Ed25519</code> + <code class="description-inline-code">ton</code> / <code class="description-inline-code">solana</code> — кошелёк</li>
<li class="description-list-item"><code class="description-inline-code">Ed25519</code> + <code class="description-inline-code">raw</code> — сырой ключ</li>
<li class="description-list-item"><code class="description-inline-code">ES256</code> + <code class="description-inline-code">webauthn</code> — passkey; на сервере нужен публичный ключ credential после регистрации</li>
</ul>

<h2>Сервер</h2>
<div class="block"><pre style="margin:0;font-family:var(--mono);font-size:13px;line-height:1.6;white-space:pre-wrap;">import {
  formatSecretAuthChallenge,
  generateSecretAuthNonce,
  verifySecretAuthProof,
} from "cruzo-web3/secret-auth";

const challenge = {
  domain: "example.com",
  nonce: generateSecretAuthNonce(),
  exp: Math.floor(Date.now() / 1000) + 300,
};

const message = formatSecretAuthChallenge(challenge);

const ok = await verifySecretAuthProof(proof, { domain: challenge.domain });</pre></div>`,
          2: `<h2>Компонент</h2>
<p class="description-paragraph">Ниже — <code class="description-inline-code">secret-auth-component</code> из пакета <code class="description-inline-code">cruzo-web3</code>: подключение кошелька, ввод ключа или passkey, подпись challenge и сбор proof в state bucket. Режимы <b>Wallet</b>, <b>Key</b> и <b>Passkey</b>; <code class="description-inline-code">signed</code> в state означает «proof готов», а не ответ сервера.</p>

<h2>Подключение</h2>
<div class="block"><pre style="margin:0;font-family:var(--mono);font-size:13px;line-height:1.6;white-space:pre-wrap;">import { RxBucket, componentsRegistryService } from "cruzo";
import "cruzo-web3/components/secret-auth";

const authBucket = new RxBucket({
  secretAuth: {
    config: { title: "Sign in" },
  },
});

componentsRegistryService.connectBucket(authBucket);

authBucket.setState("secretAuth", {
  challenge: { domain: "example.com", nonce: "...", exp: 1719667500 },
  proof: null,
  signed: false,
  pubKey: null,
  mode: null,
  wallet: null,
  passkey: null,
});

const current = authBucket.getState("secretAuth") ?? {};
authBucket.setState("secretAuth", {
  ...current,
  challenge,
  proof: null,
  signed: false,
  pubKey: null,
  wallet: null,
});</pre></div>
<div class="block"><pre style="margin:0;font-family:var(--mono);font-size:13px;line-height:1.6;white-space:pre-wrap;">&lt;secret-auth-component
  component-id="secretAuth"
  bucket-id="myAuthBucket"&gt;
&lt;/secret-auth-component&gt;</pre></div>
<p class="description-paragraph">Challenge — в <code class="description-inline-code">state</code> bucket (<code class="description-inline-code">setState</code>), заголовок — в <code class="description-inline-code">config</code>. Готовый proof: <code class="description-inline-code">authBucket.getState("secretAuth")?.proof</code> — отправьте на ваш API и вызовите <code class="description-inline-code">verifySecretAuthProof</code>.</p>`,
          3: secretAuthProofDemo(),
        },
      },
      [SectionIds["ui-components"]]: {
        title: "UI-компоненты",
        description: `<p class="description-paragraph">
            Все компоненты работают через <code class="description-inline-code">RxBucket</code> для value/state
            и читают настройки из реактивного <code class="description-inline-code">config$</code> (descriptor / <code class="description-inline-code">setConfig</code>).
          </p>
          <p class="description-paragraph">
            Компоненты следуют принципам чистого дизайна и используют единую систему стилей.
          </p>
          <p class="description-paragraph">
            Примитивы вёрстки и префикс классов — в подразделе <b>CSS классы</b> внизу списка.
          </p>`,
      },
      [SectionIds.http]: {
        title: "HTTP",
        description: `<p class="description-paragraph">
            <code class="description-inline-code">HttpClient</code> — это клиент для HTTP-запросов с единым API (<code class="description-inline-code">request/get/post/put/patch/delete</code>), интерцепторами, кешированием и поддержкой <code class="description-inline-code">AbortSignal</code>.
          </p>`,
        demos: {
          1: `<h2 class="mt_xl">HttpClient API</h2>
            <p class="description-paragraph">
              Основной сценарий: создать экземпляр клиента и использовать методы <code class="description-inline-code">get/post/put/patch/delete</code> или универсальный <code class="description-inline-code">request</code>.
            </p>
            <ul class="description-list">
              <li class="description-list-item"><b>constructor</b> <code class="description-inline-code">(rootUrl, interceptors?, withCredentials?, cacheTime?)</code></li>
              <li class="description-list-item"><b>request/get/post/put/patch/delete</b> <code class="description-inline-code">(...)</code> — методы запросов</li>
              <li class="description-list-item"><b>clearCache</b> <code class="description-inline-code">(method, path, options?)</code> — очищает конкретную запись кеша</li>
              <li class="description-list-item"><b>factory</b> <code class="description-inline-code">(signal)</code> — создаёт клиент с авто-отменой запросов, для работы в компонентах. Может быть полезно, когда компонент уничтожается, тогда запросы отменятся</li>
            </ul>`,
          2: `<div class="description-note">
              Для объекта в <code class="description-inline-code">body</code> клиент автоматически сериализует JSON. Интерцепторы применяются ко всем запросам экземпляра и удобны для токена, логирования и общей обработки ошибок.
            </div>`,
        },
      },
      [SectionIds.component]: {
        title: "Component",
        description: `<p class="description-paragraph">
            <code class="description-inline-code">AbstractComponent</code> — базовый класс UI-компонента в Cruzo.
          </p>`,
        demos: {
          1: `<h2 class="mt_xl">AbstractComponent</h2>
            <p class="description-paragraph">
              В примере ниже показан типичный компонент: локальный <code class="description-inline-code">newRx</code>, вычисляемый <code class="description-inline-code">newRxFunc</code>, обработчик события и шаблон через <code class="description-inline-code">getHTML()</code>.
            </p>`,
          2: `<div class="description-note">
              Используйте <code class="description-inline-code">AbstractComponent</code>, когда нужен UI и работа с DOM.
            </div>
            <h3 class="mt_m">Lifecycle</h3>
            <div class="lifecycle-grid mt_s">
              <article class="lifecycle-card">
                <div class="lifecycle-phase">Registration</div>
                <div class="lifecycle-method"><code class="description-inline-code">componentsRegistryService.define(...)</code></div>
                <p class="lifecycle-summary">Регистрирует компонент по selector.</p>
              </article>
              <article class="lifecycle-card">
                <div class="lifecycle-phase">Creation</div>
                <div class="lifecycle-method"><code class="description-inline-code">new Component()</code></div>
                <p class="lifecycle-summary">Создает инстанс и привязывает DOM node.</p>
              </article>
              <article class="lifecycle-card">
                <div class="lifecycle-phase">Connection</div>
                <div class="lifecycle-method"><code class="description-inline-code">connectedCallback(params)</code></div>
                <p class="lifecycle-summary">Синхронизирует id/index, scope/config и запускает template.</p>
              </article>
              <article class="lifecycle-card">
                <div class="lifecycle-phase">Rendering</div>
                <div class="lifecycle-method"><code class="description-inline-code">getHTML() / initTemplate()</code></div>
                <p class="lifecycle-summary">Парсит <code class="description-inline-code">{{ }}</code>, события и reactive-связи <code class="description-inline-code">::rx</code>.</p>
              </article>
              <article class="lifecycle-card">
                <div class="lifecycle-phase">Reactive Updates</div>
                <div class="lifecycle-method"><code class="description-inline-code">Rx / RxFunc / Template</code></div>
                <p class="lifecycle-summary">Точечно обновляет DOM при изменениях Rx.</p>
              </article>
              <article class="lifecycle-card">
                <div class="lifecycle-phase">Destruction</div>
                <div class="lifecycle-method"><code class="description-inline-code">disconnectedCallback()</code></div>
                <p class="lifecycle-summary">Очистка template, unsubscribe всех Rx и отключение зависимостей.</p>
              </article>
            </div>`,
        },
      },
      [SectionIds.service]: {
        title: "Service",
        description: `<p class="description-paragraph">
            <code class="description-inline-code">AbstractService</code> — базовый класс для общей логики и состояния приложения без UI.
          </p>`,
        demos: {
          1: `<h2 class="mt_xl">AbstractService</h2>
            <p class="description-paragraph">
              В примере показаны <code class="description-inline-code">newRx</code> для исходных значений и <code class="description-inline-code">newRxFunc</code> для производного состояния.
            </p>`,
          2: `<div class="description-note">
              Сервисы удобно использовать для shared state между несколькими компонентами, чтобы не дублировать вычисления и правила.
            </div>`,
        },
      },
      [SectionIds["cmp-interaction"]]: {
        title: "RxBucket",
        description: `<p class="description-paragraph">
            <code class="description-inline-code">RxBucket</code> — контейнер именованного состояния для связанных компонентов. Компоненты подключаются через <code class="description-inline-code">bucket-id</code> и <code class="description-inline-code">component-id</code>, читают/обновляют значения, конфигурацию и события внутри одного bucket.
          </p>`,
        demos: {
          1: `<h2 class="mt_xl">RxBucket API</h2>
            <p class="description-paragraph">
              Базовый сценарий: создать <code class="description-inline-code">new RxBucket(...)</code>, подключить компоненты и управлять значениями через <code class="description-inline-code">getValue/setValue</code>.
            </p>
            <ul class="description-list">
              <li class="description-list-item"><b>constructor</b> <code class="description-inline-code">(descriptors)</code></li>
              <li class="description-list-item"><b>config</b> — конфигурация для компонентов с одним id, обновление — <code class="description-inline-code">setConfig(id, value)</code></li>
              <li class="description-list-item"><b>getValue / setValue</b> <code class="description-inline-code">(id, index?)</code></li>
              <li class="description-list-item"><b>setValues / setValuesAtIndex</b>, <b>setStates / setStatesAtIndex</b> — пакетное обновление value/state</li>
              <li class="description-list-item"><b>emitEvent</b> <code class="description-inline-code">(id, name, payload)</code> — события bucket; подписка — <code class="description-inline-code">newRxEventFromBucket</code> / <code class="description-inline-code">newRxEventFromBucketByIndex</code></li>
              <li class="description-list-item"><b>newRxValue / newRxState / newRxEvent</b> <code class="description-inline-code">(на bucket, с rxList)</code> — низкоуровневые подписки</li>
            </ul>`,
          2: `<div class="description-note">
              Рекомендуемый подход: объявляйте <code class="description-inline-code">RxBucket</code> как контейнер, а в логике компонентов/сервисов используйте <code class="description-inline-code">newRx...</code> методы из <code class="description-inline-code">AbstractComponent</code> и <code class="description-inline-code">AbstractService</code>. Прямую работу с <code class="description-inline-code">bucket.newRx...</code> оставляйте только для низкоуровневых случаев.
            </div>
            <div class="description-note mt_s">
              Внутри bucket данные адресуются парой <code class="description-inline-code">(id, index)</code>. Индекс по умолчанию — <code class="description-inline-code">'0'</code>, что удобно и для одиночных, и для повторяющихся компонентов.
            </div>`,
        },
      },
      [SectionIds["template-engine-rx"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">::rx — реактивные значения</h2>

            <p class="description-paragraph">
              Реактивные значения позволяют автоматически обновлять шаблон при изменении
              данных, без явного вызова
              <code class="description-inline-code">detectChanges()</code>.
            </p>

            <p class="description-paragraph">
              Оператор <code class="description-inline-code">::rx</code> используется для
              чтения текущего значения и одновременно создаёт подписку между выражением
              и конкретным DOM-узлом.
            </p>`,
          2: `<p class="description-paragraph">
              При вызове
              <code class="description-inline-code">update()</code> у <code class="description-inline-code">Rx</code>
              пересчитываются только те выражения, которые зависят от изменённого
              реактивного значения, поэтому обновление DOM требует
              меньше вычислений.
            </p>

            <p class="description-paragraph">
              За счёт хранения подписок такой подход требует немного больше памяти,
              но взамен снижает нагрузку на CPU по сравнению с полным пересчётом
              шаблона. Это особенно заметно в приложениях с большим количеством UI-элементов.
            </p>`,
        },
      },
      [SectionIds["template-engine-js-subset"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">JS-like expression subset + VM</h2>

            <p class="description-paragraph">
              Для выражений используется
              <b>JS-like expression subset</b> — подмножество JavaScript-выражений,
              которое компилируется в байткод и исполняется в VM.
            </p>

            <p class="description-paragraph">
              Поддерживается привычный синтаксис выражений: операторы, тернарный,
              <code class="description-inline-code">??</code>,
              <code class="description-inline-code">?.</code>,
              индексация, вызовы функций/методов, массивы и объекты (включая shorthand).
              При этом выражения намеренно ограничены и остаются «вычислениями», а не программой.
              В отличие от решений, где можно писать практически любой код,
              здесь выражения остаются безопасными и предсказуемыми.
            </p>`,
          2: `<div class="description-note" style="margin-top:10px">
              <b>Поддерживается:</b>
              литералы (<code class="description-inline-code">"str"</code>, <code class="description-inline-code">123</code>,
              <code class="description-inline-code">true/false/null/undefined</code>),
              операторы (<code class="description-inline-code">+ - * / %</code>,
              <code class="description-inline-code">=== !== &lt;= &gt;=</code>,
              <code class="description-inline-code">&& || !</code>,
              <code class="description-inline-code">?:</code>,
              <code class="description-inline-code">??</code>,
              <code class="description-inline-code">?.</code>),
              доступ к свойствам/индексам, вызовы функций/методов,
              массивы и объекты (включая shorthand).
            </div>

            <div class="description-note" style="margin-top:8px">
              <b>Ограничения:</b>
              нельзя объявлять функции или использовать <code class="description-inline-code">=&gt;</code>,
              нельзя создавать объекты через <code class="description-inline-code">new</code>,
              нет присваиваний (<code class="description-inline-code">=</code>, <code class="description-inline-code">++</code>),
              нет операторов/инструкций вроде <code class="description-inline-code">if</code>,
              <code class="description-inline-code">for</code>, <code class="description-inline-code">try</code>.
              Для нетривиальной логики используйте методы компонента и вызывайте их из шаблона.
            </div>`,
        },
      },
      [SectionIds["template-engine-attached"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">attached="{{ ... }}"</h2>

            <p class="description-paragraph">
              Атрибут <code class="description-inline-code">attached</code> управляет
              физическим присутствием элемента в DOM-дереве.
            </p>
            <p class="description-paragraph">
              Такой подход позволяет экономить ресурсы: отключённые элементы не участвуют в вычислениях.
              В отличие от решений, где скрытые элементы остаются в DOM и продолжают потреблять ресурсы,
              здесь элементы полностью удаляются из дерева, что особенно важно для больших списков
              и сложных интерфейсов.
            </p>`,
        },
      },
      [SectionIds["template-engine-events"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">События как в HTML</h2>

            <p class="description-paragraph">
              Обработчики событий задаются напрямую через HTML-атрибуты —
              <code class="description-inline-code">onclick</code>,
              <code class="description-inline-code">oninput</code>,
              <code class="description-inline-code">onchange</code> и т.д.
              Синтаксис полностью совпадает с нативным HTML. В отличие от многих современных фреймворков,
              где требуется изучать специальные директивы или синтаксис для событий, здесь всё работает
              точно так же, как в обычном HTML — никакой дополнительной кривой обучения.
            </p>

            <p class="description-paragraph">
              Внутри обработчиков доступен объект
              <code class="description-inline-code">event</code>.
            </p>

            <p class="description-paragraph">
              События остаются простыми функциями.
            </p>`,
        },
      },
      [SectionIds["template-engine-let"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">let-*="..."</h2>

            <p class="description-paragraph">
              Атрибуты вида <code class="description-inline-code">let-*</code> позволяют
              объявлять локальные переменные прямо в шаблоне. Значение вычисляется один раз
              за цикл обновления и доступно во всех дочерних выражениях.
            </p>

            <p class="description-paragraph">
              <code class="description-inline-code">let-*</code> можно строить цепочкой:
              один <code class="description-inline-code">let</code> может использовать переменные,
              объявленные выше по дереву. Если вложенный <code class="description-inline-code">let</code>
              не читает <code class="description-inline-code">::rx</code> напрямую, он остаётся
              «обычным» вычислением на базе уже готовых значений.
            </p><div class="description-note">
              <b>Важно:</b> если выражение внутри
              <code class="description-inline-code">let-*</code>
              читает
              <code class="description-inline-code">::rx</code>,
              то при обновлении реактивного значения выполняется пересчёт блока, где объявлен
              этот <code class="description-inline-code">let</code> (и его потомков). Поэтому
              имеет смысл выносить чтение <code class="description-inline-code">::rx</code>
              как можно ниже.
            </div>`,
        },
      },
      [SectionIds["template-engine-inner-html"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">inner-html="{{ ... }}"</h2>

            <p class="description-paragraph">
              Атрибут <code class="description-inline-code">inner-html</code> задаёт содержимое элемента как HTML (поддерживается <code class="description-inline-code">::rx</code> в самом атрибуте).
              Дочерние узлы элемента удаляются при монтировании и заменяются результатом выражения.
              Выражения <code class="description-inline-code">{{ }}</code> <b>внутри</b> вставляемой строки не компилируются — для кнопок и событий используйте дочерний компонент (см. Modal).
            </p>`,
        },
      },
      [SectionIds["template-engine-once"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">once::</h2>`,
        },
      },
      [SectionIds["template-engine-repeat"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">repeat="{{ ... }}"</h2>

            <p class="description-paragraph">
              Атрибут <code class="description-inline-code">repeat</code> клонирует элемент
              для каждого элемента массива. Внутри повторяющегося блока доступны:
              <code class="description-inline-code">this</code> — текущий элемент массива,
              и <code class="description-inline-code">index</code> — его индекс.
            </p>

            <p class="description-paragraph">
              Если элементы массива — реактивные значения, то через
              <code class="description-inline-code">this::rx</code>
              можно подписываться на конкретные поля, и обновления будут точечными:
              меняется только тот клон, где изменились данные.
            </p>
`,
          2: `<div class="description-note">
              <b>Важно:</b> <code class="description-inline-code">this</code> — текущий элемент массива в данной итерации.
              При <code class="description-inline-code">repeat</code> по числу <code class="description-inline-code">this</code> равен индексу.
              Используется для отображения данных элемента (<code class="description-inline-code">{{ this::rx.name }}</code>)
              и передачи в обработчики (<code class="description-inline-code">onclick="{{ root.select(this) }}"</code>).
            </div>

            <div class="description-note">
              <b>Важно:</b> <code class="description-inline-code">root</code> — экземпляр компонента (корень шаблона).
              Через <code class="description-inline-code">root</code> доступны свойства и методы компонента:
              массив для <code class="description-inline-code">repeat</code> (<code class="description-inline-code">root.items</code>),
              вызов методов (<code class="description-inline-code">root.select(...)</code>),
              другие реактивные данные (<code class="description-inline-code">root.selected$::rx</code>).
            </div>

            <div class="description-note">
              <b>Важно:</b> <code class="description-inline-code">repeat</code> работает с массивом или числом.
              Если выражение возвращает число, создаётся указанное количество элементов
              (в этом случае <code class="description-inline-code">this</code> будет равен индексу).
            </div>`,
        },
      },
      [SectionIds["home-simple"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Простое объявление компонента</h2>`,
        },
      },
      [SectionIds["home-native"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Максимальная приближенность к нативному HTML</h2>
            <p class="description-paragraph">
              Мы убрали всё лишнее. Нет виртуального DOM — есть прямое обновление реального.
              Нет JSX — есть обычный HTML с минимальными дополнениями. Нет сложных систем
              управления состоянием — есть простой scope, где всё на виду.
            </p>`,
        },
      },
      [SectionIds["home-targeted"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Технологическая простота</h2>
            <p class="description-paragraph">
              Выражения компилируются в байткод и выполняются в виртуальной машине —
              не потому что это модно, а потому что это безопаснее и предсказуемее.
              Виртуальная машина обеспечивает инкапсуляцию: выражения остаются вычислениями,
              а не изменением состояния. Обновления DOM происходят точечно — меняется только то,
              что действительно изменилось.
            </p>`,
        },
      },
      [SectionIds["home-syntax"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Осознанный минимализм</h2>
            <p class="description-paragraph">
              Размер бандла измеряется не мегабайтами, а десятками килобайт. Синтаксис не требует
              изучения нового языка — достаточно знать HTML и немного JavaScript. Философия проста:
              если что-то можно сделать проще, значит, так и нужно делать. Простота — это не
              упрощение, это удаление всего ненужного до тех пор, пока не останется только суть.
            </p>`,
        },
      },
      [SectionIds["home-docs"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Возможности</h2>
            <ul class="description-list">
              <li class="description-list-item"><b>{{ }}</b> — в шаблонах компилируются в байткод и выполняются в стековой VM</li>
              <li class="description-list-item"><b>Rx / RxFunc</b> — реактивные значения</li>
              <li class="description-list-item"><b>RxBucket</b> — именованные «buckets» состояния для компонентов</li>
              <li class="description-list-item"><b>Роутер</b> — декларативные маршруты, параметры, редиректы</li>
              <li class="description-list-item"><b>HttpClient</b> — кэш, интерцепторы, AbortSignal</li>
              <li class="description-list-item"><b>UI-набор</b> — Input, Select, ButtonGroup, Upload, Spinner, Modal, RouterLink в <code class="description-inline-code">cruzo/ui-components</code></li>
            </ul>`,
        },
      },
      [SectionIds["home-template-simple"]]: {
        title: "",
        demos: {
          1: `<h3 class="mt_xl">Обычный шаблонизатор</h3>
            <p class="description-paragraph">
              Подстановки <code class="description-inline-code">{{ expression }}</code> — выражение вычисляется при <code class="description-inline-code">this.template.detectChanges</code>, в данном случае это происходит при инициализации компонента.
            </p>`,
          2: ``,
        },
      },
      [SectionIds["home-template-rx"]]: {
        title: "",
        demos: {
          1: `<h3 class="mt_l mb_s">Шаблонизатор с Rx</h3>
            <p class="description-paragraph">
              Модификатор <code class="description-inline-code">::rx</code> подписывает узел на реактивное значение — DOM обновляется при <code class="description-inline-code">.update()</code>.
            </p>`,
          2: ``,
        },
      },
      [SectionIds["home-template-rxfunc"]]: {
        title: "",
        demos: {
          1: `<h3 class="mt_l mb_s">RxFunc — производное состояние</h3>
            <p class="description-paragraph">
              <code class="description-inline-code">newRxFunc(fn, ...deps)</code> создаёт реактивное значение, которое пересчитывается при изменении любой из зависимостей. Зависимостей может быть несколько — в шаблоне тот же <code class="description-inline-code">::rx</code>.
            </p>`,
          2: ``,
        },
      },
      [SectionIds["home-install"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Установка</h2>`,
        },
      },
      [SectionIds["home-bootstrap"]]: {
        title: "",
        demos: {
          1: `<h3 class="mt_xl">Инициализация</h3>`,
        },
      },
      [SectionIds["home-example-1"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Примеры различных конструкций в шаблоне</h2>
            <p class="description-paragraph">
              Списки, условия для показа блока, <code class="description-inline-code">once::</code>, <code class="description-inline-code">let-*</code>, события, <code class="description-inline-code">::rx</code>.
            </p>`,
          2: ``,
        },
      },
      [SectionIds["home-example-2"]]: {
        title: "",
        demos: {
          1: `<h3 class="mt_l mb_s">let-*, методы, ?., ??, shorthand, inner-html</h3>
            <p class="description-paragraph">
              В <code class="description-inline-code">{{ }}</code>: методы компонента, optional chaining, nullish coalescing, shorthand объектов.
            </p>`,
          2: ``,
        },
      },
      [SectionIds["home-router-code"]]: {
        title: "",
        demos: {
          1: `<h3 class="mt_l mb_s">Асинхронная подгрузка компонентов в роутере</h3>
            <p class="description-paragraph">
              Маршрут <code class="description-inline-code">/lazy-demo</code> подгружает компонент асинхронно.
              <code class="description-inline-code">routerService.resourcesLoading$</code> управляет спиннером поверх <code class="description-inline-code">.section</code>.
            </p>`,
          2: ``,
        },
      },
      [SectionIds["home-http-code"]]: {
        title: "",
        demos: {
          1: `<h3 class="mt_l mb_s">HTTP: интерцепторы и кэш</h3>`,
          2: ``,
        },
      },
      [SectionIds["home-scope"]]: {
        title: "",
        demos: {
          1: `<h3 class="mt_xl">RxBucket</h3>
            <p class="description-paragraph">
              Компоненты не передают друг другу данные по цепочке — они подключаются к общему bucket по <code class="description-inline-code">component-id</code> и <code class="description-inline-code">bucket-id</code>.
            </p>`,
          2: `<p class="description-paragraph">
              В отличие от фреймворков, где данные прокидываются через множество уровней и любое изменение заставляет трогать десятки компонентов, здесь достаточно обновить bucket — все подключённые компоненты реагируют сами. Меньше кода и меньше связей.
            </p>`,
        },
      },
      [SectionIds["tests-intro"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Tests</h2>
            <p class="description-paragraph">
              Тесты на работу фреймворка: производительность и edge cases (пустой repeat, null/undefined, условный рендер, вложенный Rx). Grid updates — без изменений.
            </p>`,
        },
      },
      [SectionIds["benchmark-grid"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Grid updates</h2>
            <p class="description-paragraph">
              Большая сетка (~4K Rx-ячеек). Кнопка обновляет около 1K случайных нод. Смотрим скорость диффа и массовых обновлений.
            </p>`,
        },
      },
      [SectionIds["tests-text"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Text updates</h2>
            <p class="description-paragraph">
              Много строк с интерполяцией (id, value, label) и условным отображением статуса (ok / pending / done). Кнопки «Update many» и «Rotate status» — массовое обновление и смена статусов.
            </p>`,
        },
      },
      [SectionIds["tests-list"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">List updates</h2>
            <p class="description-paragraph">
              Большой список строк с полями id, name, value, tag и флагом active. Кнопки «Update many» (частичное обновление) и «Toggle active» (инверсия флага по всем строкам).
            </p>`,
        },
      },
      [SectionIds["tests-mount"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Mount / unmount subtree</h2>
            <p class="description-paragraph">
              Тест на создание/удаление большого поддерева: mount создаёт ~3K элементов, unmount очищает список. Смотрим стоимость (re)render.
            </p>`,
        },
      },
      [SectionIds["tests-events"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Events (1K counters)</h2>
            <p class="description-paragraph">
              1K строк с кнопкой "+1". Кликаем по разным строкам — проверяем, что обработчики событий и точечные обновления не тормозят.
            </p>`,
        },
      },
      [SectionIds["tests-empty"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Empty repeat</h2>
            <p class="description-paragraph">
              Edge case: repeat по пустому массиву, затем добавление элементов. Проверка, что пустой repeat не ломает, а добавление рендерится.
            </p>`,
        },
      },
      [SectionIds["tests-null"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Null / undefined</h2>
            <p class="description-paragraph">
              Edge case: displaying null/undefined in the template. The framework should not crash; the value is shown as empty.
            </p>`,
        },
      },
      [SectionIds["tests-conditional"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Conditional (attached)</h2>
            <p class="description-paragraph">
              Edge case: conditional render via attached — toggling true/false shows/hides blocks.
              The active button is highlighted as <code class="description-inline-code">primary</code> based on <code class="description-inline-code">showA$</code> / <code class="description-inline-code">showB$</code> state.
            </p>`,
        },
      },
      [SectionIds["tests-nested"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Nested Rx</h2>
            <p class="description-paragraph">
              Edge case: nested object in Rx — updating nested fields and displaying them in the template.
            </p>`,
        },
      },
      [SectionIds["router-bucket"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">RouteUrlBucket</h2>`,
          2: `<div class="description-note">
              Use <code class="description-inline-code">buildUrl(name, params)</code> to get route links.
            </div>`,
        },
      },
      [SectionIds["router-navigation"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">routerService</h2>
            <p class="description-paragraph">
              Navigation and URL state synchronization service. Useful for transitions, checking active links, and manual router updates.
            </p>
            <ul class="description-list">
              <li class="description-list-item"><b>pushHistory</b> / <b>pushHistoryLink</b> — navigate to URL</li>
              <li class="description-list-item"><b>hrefIsActive</b> <code class="description-inline-code">(href, options?)</code> — check if a link is active</li>
              <li class="description-list-item"><b>update</b> <code class="description-inline-code">(ignoreRedirectRules?)</code> — recalculate routing</li>
              <li class="description-list-item"><b>pathname$</b> / <b>search$</b> / <b>resourcesLoading$</b> — path, query and <code class="description-inline-code">loadResources</code> loading flag</li>
            </ul>`,
          2: ``,
        },
      },
      [SectionIds["router-hash-mode"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Hash mode</h2>
            <p class="description-paragraph">
              Также можно включать hash mode (чаще всего для статического хостинга).
            </p>
            <ul class="description-list">
              <li class="description-list-item"><b>setHashMode(true)</b> — включить режим; вызывайте до первого осмысленного <code class="description-inline-code">update()</code> (обычно при старте приложения).</li>
            </ul>`,
          2: ``,
        },
      },
      [SectionIds["router-load-resources"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Подгрузка ресурсов перед переходом на роут</h2>
            <p class="description-paragraph">
              Перед монтированием страницы роутер ждёт <code class="description-inline-code">loadResources</code> (для компонентов можно вставить dynamic <code class="description-inline-code">import()</code>)
            </p>`,
          2: ``,
        },
      },
      [SectionIds["router-routes"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Хуки</h2>
            <p class="description-paragraph">
              Для каждого маршрута можно описать <code class="description-inline-code">onLoadRoute</code> и <code class="description-inline-code">onUnloadRoute</code> — это удобно для аналитики, загрузки данных и очистки ресурсов.
            </p>`,
          2: ``,
        },
      },
      [SectionIds["http-interceptors"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Интерцепторы</h2>
            <p class="description-paragraph">
              Передаются вторым аргументом в <code class="description-inline-code">new HttpClient(...)</code> и применяются к каждому запросу экземпляра.
            </p>
            <ul class="description-list">
              <li class="description-list-item"><b>params</b> — изменить опции перед отправкой запроса (например, токен)</li>
              <li class="description-list-item"><b>success</b> — общий post-processing успешного ответа</li>
              <li class="description-list-item"><b>error</b> — централизованная обработка ошибок</li>
            </ul>`,
          2: ``,
        },
      },
      [SectionIds["http-cache"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Кеш</h2>
            <p class="description-paragraph">
              Кеш работает на уровне экземпляра <code class="description-inline-code">HttpClient</code>. Используйте <code class="description-inline-code">cacheTime</code> в конструкторе или <code class="description-inline-code">useCache</code> в конкретном запросе.
            </p>
            <ul class="description-list">
              <li class="description-list-item"><b>cacheTime</b> <code class="description-inline-code">number</code> — TTL записи в миллисекундах</li>
              <li class="description-list-item"><b>useCache</b> <code class="description-inline-code">boolean</code> — принудительно кешировать отдельный запрос</li>
              <li class="description-list-item"><b>clearCache</b> <code class="description-inline-code">(method, path, options?)</code> — очистка нужной записи</li>
            </ul>`,
          2: ``,
        },
      },
      [SectionIds["cmp-interaction-attributes"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Подписки и события</h2>
            <p class="description-paragraph">
              В компонентах удобнее <code class="description-inline-code">AbstractComponent</code>: <code class="description-inline-code">newRxValueFromBucket</code>, <code class="description-inline-code">newRxStateFromBucket</code>, <code class="description-inline-code">newRxEventFromBucket</code> — одна пара <code class="description-inline-code">(id, index)</code>; для событий по всем индексам сразу — <code class="description-inline-code">newRxEventFromBucketByIndex</code> (объект <code class="description-inline-code">{ [index]: event }</code>).
            </p>
            <div class="description-note">
              <b>config</b> общий на <code class="description-inline-code">component-id</code> (не на index); <b>value</b> и <b>state</b> — на <code class="description-inline-code">(id, index)</code>.
            </div>`,
        },
      },
      [SectionIds["cmp-interaction-advantages"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Плюсы индексов в RxBucket</h2>
            <p class="description-paragraph">
              Индекс в паре <code class="description-inline-code">(id, index)</code> даёт стабильную адресацию конкретного экземпляра поля или компонента внутри одного bucket.
            </p>
            <ul class="description-list">
              <li class="description-list-item"><b>Масштабирование без новых id:</b> один <code class="description-inline-code">id</code> обслуживает много однотипных элементов (<code class="description-inline-code">'0'</code>, <code class="description-inline-code">'1'</code>, ...)</li>
              <li class="description-list-item"><b>Точное обновление:</b> меняется только нужный индекс, а не весь bucket</li>
              <li class="description-list-item"><b>Удобный batch:</b> <code class="description-inline-code">setValuesAtIndex</code> обновляет несколько id для одной строки/элемента</li>
              <li class="description-list-item"><b>Гибкие ключи:</b> индекс строковый, поэтому можно использовать составные ключи (<code class="description-inline-code">row-2-col-3</code>, <code class="description-inline-code">user-42</code>)</li>
              <li class="description-list-item"><b>Переиспользование конфигов:</b> один <code class="description-inline-code">config</code> в descriptor автоматически подхватывается всеми однотипными компонентами группы</li>
            </ul>`,
          2: `<div class="description-note">
              Этот блок в демо ниже показывает работу индексов на практике: несколько компонентов с одинаковым <code class="description-inline-code">component-id</code> независимы за счёт разных <code class="description-inline-code">component-index</code>.
            </div>`,
        },
      },
      [SectionIds["ui-components-input"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Input</h2>`,
        },
      },
      [SectionIds["ui-components-button-group"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Button Group</h2>`,
        },
      },
      [SectionIds["ui-components-upload"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Upload</h2>`,
        },
      },
      [SectionIds["ui-components-select"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Select</h2>`,
        },
      },
      [SectionIds["ui-components-spinner"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Spinner</h2>`,
        },
      },
      [SectionIds["ui-components-modal"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Modal</h2>`,
        },
      },
      [SectionIds["ui-components-css-classes"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">CSS классы</h2>`,
        },
      },
    },
  },
  [Lang.en]: {
    sections: {
      [SectionIds.home]: {
        title: "Cruzo",
        description: `<p class="description-paragraph">
            Build simple and complex web applications without sacrificing performance or bundle size.
          </p>`,
        labels: {
          bundleSize: "~14 KB gzip (without ui-components)",
          start: "Get started",
        }
      },
      [SectionIds.docs]: {
        title: "Docs",
      },
      [SectionIds.tests]: {
        title: "Tests",
        labels: { run: "Run", destroy: "Destroy" },
        description: `<p class="description-paragraph">
            Demos start on "Run" and stop on "Destroy".
          </p>`,
      },
      [SectionIds.web3]: { title: "Web3" },
      [SectionIds.router]: { title: "Router", description: `` },
      [SectionIds.http]: {
        title: "HTTP",
        description: `<p class="description-paragraph">
          <code class="description-inline-code">HttpClient</code> is an HTTP request client with a unified API (<code class="description-inline-code">request/get/post/put/patch/delete</code>), interceptors, caching, and support for <code class="description-inline-code">AbortSignal</code>.
          </p>
        `,
        demos: {
          1: `<h2 class="mt_xl">HttpClient API</h2>
            <p class="description-paragraph">
              Main use case: create a client instance and use <code class="description-inline-code">get/post/put/patch/delete</code> or the universal <code class="description-inline-code">request</code> method.
            </p>
            <ul class="description-list">
              <li class="description-list-item"><b>constructor</b> <code class="description-inline-code">(rootUrl, interceptors?, withCredentials?, cacheTime?)</code></li>
              <li class="description-list-item"><b>request/get/post/put/patch/delete</b> <code class="description-inline-code">(...)</code> — request methods</li>
              <li class="description-list-item"><b>clearCache</b> <code class="description-inline-code">(method, path, options?)</code> — clears a specific cache entry</li>
              <li class="description-list-item"><b>factory</b> <code class="description-inline-code">(signal)</code> — creates a client with auto-cancel for use in components</li>
            </ul>`,
          2: `<div class="description-note">
              For objects in <code class="description-inline-code">body</code>, the client automatically serializes JSON. Interceptors apply to all requests of the instance and are useful for tokens, logging, and error handling.
            </div>`,
        },
      },
      [SectionIds.component]: {
        title: "Component",
        description: `<p class="description-paragraph">
            <code class="description-inline-code">AbstractComponent</code> — base class for UI components in Cruzo.
          </p>`,
        demos: {
          1: `<h2 class="mt_xl">AbstractComponent</h2>
            <p class="description-paragraph">
              The example below shows a typical component: local <code class="description-inline-code">newRx</code>, computed <code class="description-inline-code">newRxFunc</code>, event handler and template via <code class="description-inline-code">getHTML()</code>.
            </p>`,
        },
      },
      [SectionIds["template-engine"]]: {
        title: "Template",
        description: `<p class="description-paragraph">
          The main idea when designing the templating engine is "less is better." It is built on pure native HTML, with a very small set of features added on top:
          </p>

          <ul class="description-list">
          <li class="description-list-item">
          embedding expressions directly in text and attributes
          </li>
          <li class="description-list-item">
          attributes <code class="description-inline-code">attached</code>, <code class="description-inline-code">repeat</code>, <code class="description-inline-code">inner-html</code>
          </li>
          <li class="description-list-item">
          <code class="description-inline-code">::rx</code> — access to reactive values
          </li>
          <li class="description-list-item">
          <code class="description-inline-code">once::</code> — one-time evaluation and update
          </li>
          <li class="description-list-item">
          <code class="description-inline-code">let-name-of-variable</code> — declaring variables in the template
          </li>
          </ul>

          <p class="description-paragraph">
          We didn't want to invent a new syntax — we aimed to carefully extend what already exists. Any "new language" in templates usually means time spent learning it, and people generally don't have that time.
          </p>

          <p class="description-paragraph">
          Unlike popular frameworks that require learning JSX, special directives, or complex templating systems, this approach uses plain HTML with minimal additions.
          </p>
        `,
      },
      [SectionIds["template-engine-js-subset"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">JS subset in expressions</h2>
            <p class="description-paragraph">
              Expressions support a safe JS subset: property access, method calls, ternary, nullish coalescing, optional chaining, template literals, and object/array literals.
            </p>`,
          2: ``,
        },
      },
      [SectionIds["template-engine-attached"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">attached</h2>
            <p class="description-paragraph">
              The <code class="description-inline-code">attached</code> attribute controls whether an element is present in the DOM. When the expression is falsy, the element is removed; when truthy, it is inserted back.
            </p>`,
          2: ``,
        },
      },
      [SectionIds["template-engine-events"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Events</h2>
            <p class="description-paragraph">
              Native DOM events are used directly: <code class="description-inline-code">onclick</code>, <code class="description-inline-code">oninput</code>, <code class="description-inline-code">onchange</code>, etc. The expression has access to <code class="description-inline-code">event</code>, <code class="description-inline-code">root</code>, <code class="description-inline-code">this</code>, and <code class="description-inline-code">index</code>.
            </p>`,
          2: ``,
        },
      },
      [SectionIds["template-engine-let"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">let-*</h2>
            <p class="description-paragraph">
              <code class="description-inline-code">let-name="{{ expr }}"</code> declares a local variable in the template scope. Useful to avoid repeating long expressions.
            </p>`,
          2: ``,
        },
      },
      [SectionIds["template-engine-inner-html"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">inner-html</h2>
            <p class="description-paragraph">
              The <code class="description-inline-code">inner-html</code> attribute sets the element's innerHTML from an expression. Useful for rendering HTML strings.
            </p>`,
          2: ``,
        },
      },
      [SectionIds["template-engine-once"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">once::</h2>
            <p class="description-paragraph">
              <code class="description-inline-code">once::</code> — the expression is evaluated and updated only once, at mount time. No subscription to reactive updates.
            </p>`,
          2: ``,
        },
      },
      [SectionIds["template-engine-repeat"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">repeat</h2>
            <p class="description-paragraph">
              <code class="description-inline-code">repeat="{{ list }}"</code> renders the element for each item in the array. Inside: <code class="description-inline-code">this</code> — current item, <code class="description-inline-code">index</code> — current index.
            </p>`,
          2: ``,
        },
      },
      [SectionIds["template-engine-rx"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">::rx</h2>
            <p class="description-paragraph">
              <code class="description-inline-code">::rx</code> subscribes the node to reactive updates. When the <code class="description-inline-code">Rx</code> value changes, only the dependent nodes are updated.
            </p>`,
          2: ``,
        },
      },
      [SectionIds["ui-components"]]: {
        title: "UI Components",
        description: `<p class="description-paragraph">
            All components work via <code class="description-inline-code">RxBucket</code> for value/state and read settings from reactive <code class="description-inline-code">config$</code>.
          </p>
          <p class="description-paragraph">
            Components follow clean design principles and use a unified style system.
          </p>
          <p class="description-paragraph">
            Layout primitives and class prefix — in the <b>CSS classes</b> subsection at the bottom.
          </p>`,
      },
      [SectionIds["ui-components-input"]]: { title: "", demos: { 1: `<h2 class="mt_xl">Input</h2>` } },
      [SectionIds["ui-components-textarea"]]: { title: "", demos: { 1: `<h2 class="mt_xl">Textarea</h2>` } },
      [SectionIds["ui-components-button-group"]]: { title: "", demos: { 1: `<h2 class="mt_xl">Button Group</h2>` } },
      [SectionIds["ui-components-upload"]]: { title: "", demos: { 1: `<h2 class="mt_xl">Upload</h2>` } },
      [SectionIds["ui-components-select"]]: { title: "", demos: { 1: `<h2 class="mt_xl">Select</h2>` } },
      [SectionIds["ui-components-spinner"]]: { title: "", demos: { 1: `<h2 class="mt_xl">Spinner</h2>` } },
      [SectionIds["ui-components-modal"]]: { title: "", demos: { 1: `<h2 class="mt_xl">Modal</h2>` } },
      [SectionIds["ui-components-css-classes"]]: { title: "", demos: { 1: `<h2 class="mt_xl">CSS classes</h2>` } },
      [SectionIds["web3-intro"]]: {
        title: "Overview",
        description: `<p class="description-paragraph">
            Additional components and <code class="description-inline-code">web3Service</code> for Cruzo: wallet connection, signing and verification.
          </p>`,
        demos: {
          1: `<h2 class="mt_xl mb_s">Installation</h2>
            <div class="block mb_xl"><pre style="margin:0;font-family:var(--mono);font-size:13px;line-height:1.6;white-space:pre-wrap;">npm install cruzo cruzo-web3</pre></div>
            <h2 class="mb_s">Quick start</h2>
            <div class="block mb_m"><pre style="margin:0;font-family:var(--mono);font-size:13px;line-height:1.6;white-space:pre-wrap;">import { web3Service } from "cruzo-web3";

  const tonManifestUrl = new URL("/tonconnect-manifest.json", window.location.href).href;
  web3Service.setWalletConnectProjectId(projectId);
  web3Service.setTonManifestUrl(tonManifestUrl);</pre></div>
            <h2 class="mb_s">Mobile wallet setup</h2>
            <ul class="description-list">
              <li class="description-list-item"><b>Ethereum (WalletConnect)</b> — Project ID from <a href="https://cloud.walletconnect.com" target="_blank" rel="noopener">cloud.walletconnect.com</a>, variable <code class="description-inline-code">VITE_WALLETCONNECT_PROJECT_ID</code></li>
              <li class="description-list-item"><b>TON</b> — public <code class="description-inline-code">tonconnect-manifest.json</code> (url, name, iconUrl) and <code class="description-inline-code">setTonManifestUrl</code></li>
            </ul>`,
        },
      },
      [SectionIds["web3-sign"]]: {
        title: "Sign",
        description: `<p class="description-paragraph">
            Demo of content signing via popular wallets.
          </p>`,
        demos: {
          1: `<p class="description-paragraph"></p>`,
        },
      },
      [SectionIds["cmp-interaction"]]: {
        title: "RxBucket",
        description: `<p class="description-paragraph">
          <code class="description-inline-code">RxBucket</code> is a named-state container for related components. Components connect using a <code class="description-inline-code">bucket-id</code> and a <code class="description-inline-code">component-id</code>, and they read/update values, configuration, and events within the same bucket.
          </p>
        `,
      },
      [SectionIds["cmp-interaction-attributes"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Subscriptions and events</h2>
            <p class="description-paragraph">
              In components: <code class="description-inline-code">newRxValueFromBucket</code>, <code class="description-inline-code">newRxStateFromBucket</code>, <code class="description-inline-code">newRxEventFromBucket</code> — one pair <code class="description-inline-code">(id, index)</code>; for events across all indices — <code class="description-inline-code">newRxEventFromBucketByIndex</code>.
            </p>
            <div class="description-note">
              <b>config</b> is shared per <code class="description-inline-code">component-id</code> (not per index); <b>value</b> and <b>state</b> — per <code class="description-inline-code">(id, index)</code>.
            </div>`,
        },
      },
      [SectionIds["cmp-interaction-advantages"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Benefits of indices in RxBucket</h2>
            <p class="description-paragraph">
              The index in <code class="description-inline-code">(id, index)</code> gives stable addressing of a specific field or component instance within one bucket.
            </p>
            <ul class="description-list">
              <li class="description-list-item"><b>Scale without new ids:</b> one <code class="description-inline-code">id</code> serves many similar elements</li>
              <li class="description-list-item"><b>Precise updates:</b> only the needed index changes</li>
              <li class="description-list-item"><b>Convenient batch:</b> <code class="description-inline-code">setValuesAtIndex</code> updates multiple ids for one row/element</li>
              <li class="description-list-item"><b>Flexible keys:</b> index is a string, so composite keys work (<code class="description-inline-code">row-2-col-3</code>)</li>
              <li class="description-list-item"><b>Config reuse:</b> one <code class="description-inline-code">config</code> in descriptor is picked up by all components of the group</li>
            </ul>`,
          2: `<div class="description-note">
              The demo below shows indices in practice: multiple components with the same <code class="description-inline-code">component-id</code> are independent due to different <code class="description-inline-code">component-index</code>.
            </div>`,
        },
      },
      [SectionIds["http-interceptors"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Interceptors</h2>
            <p class="description-paragraph">
              Passed as the second argument to <code class="description-inline-code">new HttpClient(...)</code> and applied to every request of the instance.
            </p>
            <ul class="description-list">
              <li class="description-list-item"><b>params</b> — modify options before sending (e.g. token)</li>
              <li class="description-list-item"><b>success</b> — common post-processing of a successful response</li>
              <li class="description-list-item"><b>error</b> — centralized error handling</li>
            </ul>`,
          2: ``,
        },
      },
      [SectionIds["http-cache"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Cache</h2>
            <p class="description-paragraph">
              Cache works at the <code class="description-inline-code">HttpClient</code> instance level. Use <code class="description-inline-code">cacheTime</code> in the constructor or <code class="description-inline-code">useCache</code> per request.
            </p>
            <ul class="description-list">
              <li class="description-list-item"><b>cacheTime</b> <code class="description-inline-code">number</code> — TTL in milliseconds</li>
              <li class="description-list-item"><b>useCache</b> <code class="description-inline-code">boolean</code> — force cache a specific request</li>
              <li class="description-list-item"><b>clearCache</b> <code class="description-inline-code">(method, path, options?)</code> — clear a specific entry</li>
            </ul>`,
          2: ``,
        },
      },
      [SectionIds["router-routes"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Hooks</h2>
            <p class="description-paragraph">
              Each route can define <code class="description-inline-code">onLoadRoute</code> and <code class="description-inline-code">onUnloadRoute</code> — useful for analytics, data loading, and resource cleanup.
            </p>`,
          2: ``,
        },
      },
      [SectionIds["router-navigation"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">routerService</h2>
            <p class="description-paragraph">
              Navigation and URL state synchronization service. Useful for transitions, checking active links, and manual router updates.
            </p>
            <ul class="description-list">
              <li class="description-list-item"><b>pushHistory</b> / <b>pushHistoryLink</b> — navigate to URL</li>
              <li class="description-list-item"><b>hrefIsActive</b> <code class="description-inline-code">(href, options?)</code> — check if a link is active</li>
              <li class="description-list-item"><b>update</b> <code class="description-inline-code">(ignoreRedirectRules?)</code> — recalculate routing</li>
              <li class="description-list-item"><b>pathname$</b> / <b>search$</b> / <b>resourcesLoading$</b> — path, query and <code class="description-inline-code">loadResources</code> loading flag</li>
            </ul>`,
          2: ``,
        },
      },
      [SectionIds["router-bucket"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">RouteUrlBucket</h2>`,
          2: `<div class="description-note">
              Use <code class="description-inline-code">buildUrl(name, params)</code> to get route links.
            </div>`,
        },
      },
      [SectionIds["router-hash-mode"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Hash mode</h2>
            <p class="description-paragraph">
              Hash mode can also be enabled (most commonly for static hosting).
            </p>
            <ul class="description-list">
              <li class="description-list-item"><b>setHashMode(true)</b> — enable the mode; call before the first meaningful <code class="description-inline-code">update()</code> (usually at app startup).</li>
            </ul>`,
          2: ``,
        },
      },
      [SectionIds["router-load-resources"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Loading resources before route transition</h2>
            <p class="description-paragraph">
              Before mounting the page, the router waits for <code class="description-inline-code">loadResources</code> (you can use dynamic <code class="description-inline-code">import()</code> for components).
            </p>`,
          2: ``,
        },
      },
      [SectionIds["benchmark-grid"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Grid updates</h2>
            <p class="description-paragraph">
              Large grid (~4K Rx cells). The button updates ~1K random nodes. We measure diff speed and bulk update performance.
            </p>`,
        },
      },
      [SectionIds["tests-intro"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Tests</h2>
            <p class="description-paragraph">
              Framework tests: performance and edge cases (empty repeat, null/undefined, conditional render, nested Rx). Grid updates — no changes.
            </p>`,
        },
      },
      [SectionIds["tests-text"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Text updates</h2>
            <p class="description-paragraph">
              Many rows with interpolation (id, value, label) and conditional status display (ok / pending / done). "Update many" and "Rotate status" buttons — bulk update and status rotation.
            </p>`,
        },
      },
      [SectionIds["tests-list"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">List updates</h2>
            <p class="description-paragraph">
              Large list of rows with id, name, value, tag fields and an active flag. "Update many" (partial update) and "Toggle active" (flip flag on all rows) buttons.
            </p>`,
        },
      },
      [SectionIds["tests-mount"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Mount / unmount subtree</h2>
            <p class="description-paragraph">
              Test for creating/removing a large subtree: mount creates ~3K elements, unmount clears the list. We measure (re)render cost.
            </p>`,
        },
      },
      [SectionIds["tests-events"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Events (1K counters)</h2>
            <p class="description-paragraph">
              1K rows with a "+1" button. Click different rows — verify that event handlers and targeted updates don't lag.
            </p>`,
        },
      },
      [SectionIds["tests-empty"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Empty repeat</h2>
            <p class="description-paragraph">
              Edge case: repeat over an empty array, then adding elements. Verify that empty repeat doesn't break, and additions render correctly.
            </p>`,
        },
      },
      [SectionIds["tests-null"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Null / undefined</h2>
            <p class="description-paragraph">
              Edge case: displaying null/undefined in the template. The framework should not crash; the value is shown as empty.
            </p>`,
        },
      },
      [SectionIds["tests-conditional"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Conditional (attached)</h2>
            <p class="description-paragraph">
              Edge case: conditional render via attached — toggling true/false shows/hides blocks.
              The active button is highlighted as <code class="description-inline-code">primary</code> based on <code class="description-inline-code">showA$</code> / <code class="description-inline-code">showB$</code> state.
            </p>`,
        },
      },
      [SectionIds["tests-nested"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Nested Rx</h2>
            <p class="description-paragraph">
              Edge case: nested object in Rx — updating nested fields and displaying them in the template.
            </p>`,
        },
      },
      [SectionIds["demo-lazy-page"]]: { title: "", demos: { 1: ``, 2: `` } },
      [SectionIds["service"]]: {
        title: "Service",
        description: `<p class="description-paragraph">
            <code class="description-inline-code">AbstractService</code> — base class for shared logic and application state without UI.
          </p>`,
        demos: {
          1: `<h2 class="mt_xl">AbstractService</h2>
            <p class="description-paragraph">
              The example shows <code class="description-inline-code">newRx</code> for source values and <code class="description-inline-code">newRxFunc</code> for derived state.
            </p>`,
          2: `<div class="description-note">
              Services are convenient for shared state between multiple components, to avoid duplicating computations and rules.
            </div>`,
        },
      },
      [SectionIds["home-docs"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Features</h2>
            <ul class="description-list">
              <li class="description-list-item"><b>{{ }}</b> — compiled to bytecode and executed in a stack VM</li>
              <li class="description-list-item"><b>Rx / RxFunc</b> — reactive values</li>
              <li class="description-list-item"><b>RxBucket</b> — named state buckets for components</li>
              <li class="description-list-item"><b>Router</b> — declarative routes, params, redirects</li>
              <li class="description-list-item"><b>HttpClient</b> — cache, interceptors, AbortSignal</li>
              <li class="description-list-item"><b>UI kit</b> — Input, Select, ButtonGroup, Upload, Spinner, Modal, RouterLink in <code class="description-inline-code">cruzo/ui-components</code></li>
            </ul>`,
          2: ``,
        },
      },
      [SectionIds["home-install"]]: {
        title: "",
        demos: { 1: `<h2 class="mt_xl">Installation</h2>` },
      },
      [SectionIds["home-template-rx"]]: {
        title: "",
        demos: {
          1: `<h3 class="mt_l mb_s">Templating with Rx</h3>
            <p class="description-paragraph">
              The <code class="description-inline-code">::rx</code> modifier subscribes the node to a reactive value — the DOM updates on <code class="description-inline-code">.update()</code>.
            </p>`,
          2: ``,
        },
      },
      [SectionIds["home-template-simple"]]: {
        title: "",
        demos: {
          1: `<h3 class="mt_xl">Basic templating</h3>
            <p class="description-paragraph">
              <code class="description-inline-code">{{ expression }}</code> substitutions — the expression is evaluated on <code class="description-inline-code">this.template.detectChanges</code>, which happens during component initialization.
            </p>`,
          2: ``,
        },
      },
      [SectionIds["home-template-rxfunc"]]: {
        title: "",
        demos: {
          1: `<h3 class="mt_l mb_s">RxFunc — derived state</h3>
            <p class="description-paragraph">
              <code class="description-inline-code">newRxFunc(fn, ...deps)</code> creates a reactive value that recalculates when any dependency changes. Multiple dependencies are supported — same <code class="description-inline-code">::rx</code> in the template.
            </p>`,
          2: ``,
        },
      },
      [SectionIds["home-example-1"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Template syntax examples</h2>
            <p class="description-paragraph">
              Lists, conditional rendering, <code class="description-inline-code">once::</code>, <code class="description-inline-code">let-*</code>, events, <code class="description-inline-code">::rx</code>.
            </p>`,
          2: ``,
        },
      },
      [SectionIds["home-example-2"]]: {
        title: "",
        demos: {
          1: `<h3 class="mt_l mb_s">let-*, methods, ?., ??, shorthand, inner-html</h3>
            <p class="description-paragraph">
              Inside <code class="description-inline-code">{{ }}</code>: component methods, optional chaining, nullish coalescing, object shorthand.
            </p>`,
          2: ``,
        },
      },
      [SectionIds["home-scope"]]: {
        title: "",
        demos: {
          1: `<h3 class="mt_xl">RxBucket</h3>
            <p class="description-paragraph">
              Components don't pass data to each other in a chain — they connect to a shared bucket via <code class="description-inline-code">component-id</code> and <code class="description-inline-code">bucket-id</code>.
            </p>`,
          2: `<p class="description-paragraph">
              Unlike frameworks where data is drilled through many levels and any change forces touching dozens of components, here it's enough to update the bucket — all connected components react automatically. Less code and fewer dependencies.
            </p>`,
        },
      },
      [SectionIds["home-bootstrap"]]: {
        title: "",
        demos: { 1: `<h3 class="mt_xl">Initialization</h3>` },
      },
      [SectionIds["home-router-code"]]: {
        title: "",
        demos: {
          1: `<h3 class="mt_l mb_s">Async component loading in the router</h3>
            <p class="description-paragraph">
              The <code class="description-inline-code">/lazy-demo</code> route loads the component asynchronously.
              <code class="description-inline-code">routerService.resourcesLoading$</code> controls the spinner over <code class="description-inline-code">.section</code>.
            </p>`,
          2: ``,
        },
      },
      [SectionIds["home-http-code"]]: {
        title: "",
        demos: { 1: `<h3 class="mt_l mb_s">HTTP: interceptors and cache</h3>`, 2: `` },
      },
      [SectionIds["home-simple"]]: {
        title: "",
        demos: { 1: `<h2 class="mt_xl">Simple component declaration</h2>` },
      },
      [SectionIds["home-native"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">As close to native HTML as possible</h2>
            <p class="description-paragraph">
              We removed everything unnecessary. No virtual DOM — just direct updates to the real one.
              No JSX — just plain HTML with minimal additions. No complex state management —
              just a simple scope where everything is visible.
            </p>`,
        },
      },
      [SectionIds["home-targeted"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Technological simplicity</h2>
            <p class="description-paragraph">
              Expressions are compiled to bytecode and executed in a virtual machine —
              not because it's trendy, but because it's safer and more predictable.
              DOM updates are targeted — only what actually changed gets updated.
            </p>`,
        },
      },
      [SectionIds["home-syntax"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Intentional minimalism</h2>
            <p class="description-paragraph">
              Bundle size is measured in tens of kilobytes, not megabytes. The syntax doesn't require
              learning a new language — just HTML and a bit of JavaScript. The philosophy is simple:
              if something can be done simpler, then it should be. Simplicity is not simplification,
              it's removing everything unnecessary until only the essence remains.
            </p>`,
        },
      },
    },
  },
};

export const trs = Object.assign({
  [Lang.ru]: {
    days: { one: "день", two: "дня", five: "дней" },
    daysLeft: { one: "остался %% день", two: "осталось %% дня", five: "осталось %% дней" },
    seconds: { one: "секунда", two: "секунды", five: "секунд" },
    hours: { one: "час", two: "часа", five: "часов" },
    minutes: { one: "минута", two: "минуты", five: "минут" },
  },
  [Lang.en]: {
    days: { one: "day", two: "days", five: "days" },
    daysLeft: { one: "%% day left", two: "%% days left", five: "%% days left" },
    seconds: { one: "second", two: "seconds", five: "seconds" },
    hours: { one: "hour", two: "hours", five: "hours" },
    minutes: { one: "minute", two: "minutes", five: "minutes" },
  },
}, trsSections);