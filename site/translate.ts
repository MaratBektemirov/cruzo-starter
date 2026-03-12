import { SectionIds } from "site/sections";

export enum Lang {
  'ru' = 'ru',
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
            Реактивный UI-фреймворк без зависимостей, основные принципы которого техно-минимализм, гибкость и интуитивность.
          </p>`,
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
        description: `<p class="description-paragraph">
            Сущность <code class="description-inline-code">Router</code> в Cruzo состоит из <code class="description-inline-code">routerService</code> и <code class="description-inline-code">RouteUrlBucket</code>. Она синхронизирует UI с URL, монтирует/размонтирует компоненты и поддерживает параметры маршрута.
          </p>`,
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
      [SectionIds["ui-components"]]: {
        title: "UI-компоненты",
        description: `<p class="description-paragraph">
            Все компоненты работают через <code class="description-inline-code">RxScope</code> для управления состоянием
            и поддерживают типизированную конфигурацию.
          </p>
          <p class="description-paragraph">
            Компоненты следуют принципам чистого дизайна и используют единую систему стилей.
          </p>`,
      },
      [SectionIds.http]: {
        title: "HTTP",
        description: `<p class="description-paragraph">
            Сущность <code class="description-inline-code">HttpClient</code> — это клиент для HTTP-запросов с единым API (<code class="description-inline-code">request/get/post/put/patch/delete</code>), интерцепторами, кешированием и поддержкой <code class="description-inline-code">AbortSignal</code>.
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
              <li class="description-list-item"><b>factory</b> <code class="description-inline-code">(signal)</code> — создаёт клиент с авто-отменой запросов</li>
            </ul>`,
          2: `<div class="description-note">
              Для объекта в <code class="description-inline-code">body</code> клиент автоматически сериализует JSON. Интерцепторы применяются ко всем запросам экземпляра и удобны для токена, логирования и общей обработки ошибок.
            </div>`,
        },
      },
      [SectionIds.component]: {
        title: "Component",
        description: `<p class="description-paragraph">
            <code class="description-inline-code">AbstractComponent</code> — базовый класс UI-компонента в Cruzo: шаблон, реактивные значения, жизненный цикл и подключение зависимостей.
          </p>`,
        demos: {
          1: `<h2 class="mt_xl">AbstractComponent</h2>
            <p class="description-paragraph">
              В примере ниже показан типичный компонент: локальный <code class="description-inline-code">newRx</code>, вычисляемый <code class="description-inline-code">newRxFunc</code>, обработчик события и шаблон через <code class="description-inline-code">getHTML()</code>.
            </p>`,
          2: `<div class="description-note">
              Используйте <code class="description-inline-code">AbstractComponent</code>, когда нужен UI и работа с DOM. Для общей бизнес-логики без разметки используйте <code class="description-inline-code">AbstractService</code>.
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
        title: "RxScope",
        description: `<p class="description-paragraph">
            Сущность <code class="description-inline-code">RxScope</code> — контейнер именованного состояния для связанных компонентов. Компоненты подключаются через <code class="description-inline-code">scope-id</code> и <code class="description-inline-code">component-id</code>, читают/обновляют значения и события внутри одного scope.
          </p>`,
        demos: {
          1: `<h2 class="mt_xl">RxScope API</h2>
            <p class="description-paragraph">
              Базовый сценарий: создать <code class="description-inline-code">new RxScope(...)</code>, подключить компоненты и управлять значениями через <code class="description-inline-code">getValue/setValue</code>.
            </p>
            <ul class="description-list">
              <li class="description-list-item"><b>constructor</b> <code class="description-inline-code">(descriptors)</code> — регистрация id и конфигов</li>
              <li class="description-list-item"><b>getValue / setValue</b> <code class="description-inline-code">(id, ...)</code> — чтение и запись значения</li>
              <li class="description-list-item"><b>setValues / setValuesAtIndex</b> <code class="description-inline-code">(...)</code> — пакетное обновление</li>
              <li class="description-list-item"><b>newRxValue / newRxEvent / newRxAllValues</b> — подписки на изменения и события</li>
            </ul>`,
          2: `<div class="description-note">
              Рекомендуемый подход: объявляйте <code class="description-inline-code">RxScope</code> как контейнер, а в логике компонентов/сервисов используйте <code class="description-inline-code">newRx...</code> методы из <code class="description-inline-code">AbstractComponent</code> и <code class="description-inline-code">AbstractService</code>. Прямую работу с <code class="description-inline-code">scope.newRx...</code> оставляйте только для низкоуровневых случаев.
            </div>
            <div class="description-note mt_s">
              Внутри scope данные адресуются парой <code class="description-inline-code">(id, index)</code>. Индекс по умолчанию — <code class="description-inline-code">'0'</code>, что удобно и для одиночных, и для повторяющихся компонентов.
            </div>`,
        },
      },
      [SectionIds["template-engine-interpolation"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Свобода выбора</h2><p class="description-paragraph">
              Шаблонизатор можно использовать и без реактивных значений. В этом случае
              пересчёт шаблона выполняется вручную — через вызов
              <code class="description-inline-code">this.template.detectChanges()</code>.
            </p>

            <p class="description-paragraph">
              В некоторых сценариях такой подход может ускорить разработку и снизить потребление памяти, однако увеличивает нагрузку на CPU, так как пересчитываются все данные шаблона.
            </p>

            <p class="description-paragraph">
              Несмотря на это, работа с DOM-деревом точечная — обновятся
              только те узлы, для которых данные изменились.
            </p>`,
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
              Атрибут <code class="description-inline-code">inner-html</code> задаёт содержимое элемента как HTML (поддерживается <code class="description-inline-code">::rx</code>).
              Дочерние узлы элемента удаляются при монтировании и заменяются результатом выражения.
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
              <li class="description-list-item"><b>RxScope</b> — именованные «buckets» состояния для компонентов</li>
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
          1: `<h2 class="mt_xl">Примеры</h2>
            <p class="description-paragraph">
              Ниже — примеры с живым компонентом и кодом. Списки, условный DOM, <code class="description-inline-code">once::</code>, <code class="description-inline-code">let-*</code>, события, <code class="description-inline-code">::rx</code>.
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
          1: `<h3 class="mt_l mb_s">Роутер</h3>`,
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
          1: `<h3 class="mt_xl">Связь без лишнего</h3>
            <p class="description-paragraph">
              Компоненты не передают друг другу данные по цепочке — они подключаются к общему scope по <code class="description-inline-code">component-id</code> и <code class="description-inline-code">scope-id</code>.
            </p>`,
          2: `<p class="description-paragraph">
              В отличие от фреймворков, где данные прокидываются через множество уровней и любое изменение заставляет трогать десятки компонентов, здесь достаточно обновить scope — все подключённые компоненты реагируют сами. Меньше кода и меньше связей.
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
              Edge case: отображение null/undefined в шаблоне. Фреймворк не должен падать, значение показывается как пустое.
            </p>`,
        },
      },
      [SectionIds["tests-conditional"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Conditional (attached)</h2>
            <p class="description-paragraph">
              Edge case: условный рендер через attached — переключение true/false показывает/скрывает блоки.
            </p>`,
        },
      },
      [SectionIds["tests-nested"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Nested Rx</h2>
            <p class="description-paragraph">
              Edge case: вложенный объект в Rx — обновление вложенных полей и отображение в шаблоне.
            </p>`,
        },
      },
      [SectionIds["router-bucket"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">RouteUrlBucket</h2>
            <p class="description-paragraph">
              Декларативный список маршрутов приложения: URL-шаблон, контейнер, компонент и опциональные lifecycle-хуки.
            </p>
            <ul class="description-list">
              <li class="description-list-item"><b>url</b> — путь с параметрами, например <code class="description-inline-code">/docs/:section</code></li>
              <li class="description-list-item"><b>componentSelectorUnbox</b> — какой компонент монтировать</li>
              <li class="description-list-item"><b>routeSelectorUnbox</b> — куда монтировать компонент</li>
              <li class="description-list-item"><b>redirectTo / onLoadRoute / onUnloadRoute</b> — опциональные правила</li>
            </ul>`,
          2: `<div class="description-note">
              Используйте <code class="description-inline-code">buildUrl(name, params)</code>, чтобы собирать ссылки из имени маршрута и не дублировать строки пути в коде.
            </div>`
        },
      },
      [SectionIds["router-navigation"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">routerService</h2>
            <p class="description-paragraph">
              Сервис навигации и синхронизации состояния URL. Подходит для переходов, проверки активных ссылок и ручного обновления роутера.
            </p>
            <ul class="description-list">
              <li class="description-list-item"><b>pushHistory</b> <code class="description-inline-code">(href)</code> — перейти на новый URL</li>
              <li class="description-list-item"><b>hrefIsActive</b> <code class="description-inline-code">(href, options?)</code> — проверить активность ссылки</li>
              <li class="description-list-item"><b>update</b> <code class="description-inline-code">(ignoreRedirectRules?)</code> — пересчитать роутинг</li>
              <li class="description-list-item"><b>scrollToHashElement</b> <code class="description-inline-code">()</code> — скролл к элементу по hash</li>
            </ul>`,
          2: ``,
        },
      },
      [SectionIds["router-routes"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Lifecycle маршрута</h2>
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
              Через <code class="description-inline-code">newRxValue</code>, <code class="description-inline-code">newRxEvent</code> и <code class="description-inline-code">newRxAllValues</code> можно получать реактивные обновления и связывать их с UI-логикой компонента.
            </p>
            <ul class="description-list">
              <li class="description-list-item"><b>newRxValue</b> callback: <code class="description-inline-code">(value, index, byUser)</code></li>
              <li class="description-list-item"><b>newRxEvent</b> callback: <code class="description-inline-code">(event, index)</code></li>
              <li class="description-list-item"><b>newRxAllValues</b> callback: <code class="description-inline-code">(valuesById)</code></li>
            </ul>
            <div class="description-note">
              Тот же принцип работает с конфигами: один descriptor в <code class="description-inline-code">RxScope</code> на конкретный <code class="description-inline-code">component-id</code> автоматически применяется ко всем компонентам этой группы (по разным <code class="description-inline-code">component-index</code>).
            </div>`,
          2: `<div class="description-note">
              В примере кода ниже сначала показаны все <code class="description-inline-code">this.newRx...</code> методы из <code class="description-inline-code">AbstractComponent</code>, а затем отдельный пример для <code class="description-inline-code">AbstractService</code> с <code class="description-inline-code">newRx</code> и <code class="description-inline-code">newRxFunc</code>.
            </div>`,
        },
      },
      [SectionIds["cmp-interaction-advantages"]]: {
        title: "",
        demos: {
          1: `<h2 class="mt_xl">Плюсы индексов в RxScope</h2>
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
            </div>
            <h3 class="mt_l mb_s">Почему лучше через newRx... из базовых классов</h3>
            <ul class="description-list">
              <li class="description-list-item"><b>Плюсы:</b> меньше boilerplate, единый стиль по проекту, автоматическое подключение к жизненному циклу компонента/сервиса, проще сопровождать код</li>
              <li class="description-list-item"><b>Плюсы:</b> удобнее читать — видно намерение на уровне API компонента, а не низкоуровневого scope</li>
              <li class="description-list-item"><b>Минусы:</b> меньше контроля над низкоуровневой подпиской в нестандартных сценариях</li>
              <li class="description-list-item"><b>Минусы:</b> при отладке сложных edge-case иногда нужно опускаться до прямого API <code class="description-inline-code">RxScope</code></li>
            </ul>
            <div class="description-note">
              Практическое правило: <code class="description-inline-code">RxScope</code> — для объявления структуры и значений, <code class="description-inline-code">newRx...</code> из базовых классов — для подписок и реактивной логики.
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
    },
  },
};

export const trs = Object.assign({
  [Lang.ru]: {
    days: {
      one: "день",
      two: "дня",
      five: "дней",
    },
    daysLeft: {
      one: "остался %% день",
      two: "осталось %% дня",
      five: "осталось %% дней",
    },
    seconds: {
      one: "секунда",
      two: "секунды",
      five: "секунд",
    },
    hours: {
      one: "час",
      two: "часа",
      five: "часов",
    },
    minutes: {
      one: "минута",
      two: "минуты",
      five: "минут",
    },
  }
}, trsSections);