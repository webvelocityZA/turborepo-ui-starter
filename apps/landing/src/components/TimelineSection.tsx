import { BoxIcon, HardDrive, TvMinimal } from "lucide-react";
import type React from "react";
import { useState } from "react";
import ReactHtmlParser from "react-html-parser";

import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import {
  Timeline,
  TimelineContent,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@workspace/ui/components/timeline";
import { cn } from "@workspace/ui/lib/utils";

const timelineClassnames =
  "md:w-[calc(50%-1.5rem)] md:odd:ms-auto md:even:text-right md:even:group-data-[orientation=vertical]/timeline:ms-0 md:even:group-data-[orientation=vertical]/timeline:me-8 md:even:group-data-[orientation=vertical]/timeline:[&_[data-slot=timeline-indicator]]:-right-6 md:even:group-data-[orientation=vertical]/timeline:[&_[data-slot=timeline-indicator]]:left-auto md:even:group-data-[orientation=vertical]/timeline:[&_[data-slot=timeline-indicator]]:translate-x-1/2 md:even:group-data-[orientation=vertical]/timeline:[&_[data-slot=timeline-separator]]:-right-6 md:even:group-data-[orientation=vertical]/timeline:[&_[data-slot=timeline-separator]]:left-auto md:even:group-data-[orientation=vertical]/timeline:[&_[data-slot=timeline-separator]]:translate-x-1/2 md:even:group-data-[orientation=vertical]/timeline:[&_[data-slot=timeline-title]]:flex-row-reverse";

const items0 = [
  {
    id: 1,
    title: "Постановка задачи",
    titleIcon: "&#x1F4CB;",
    texts: [
      "Изначально, прочитав ТЗ, мне показалось, что задание достаточно примитивное, даже подозрительно простое.",
      "Сходить в Notion, забрать строки, отобразить картинки. Какая может быть сложность?",
      "Но, как оказалось, это было не так. Все оказалось сложнее, чем казалось на первый взгляд.",
    ],
  },
  {
    id: 2,
    title: "Краткий ресерч",
    titleIcon: "&#x1F50D;",
    texts: [
      "Работать с контентом страницы Notion через Notion API — это что-то новое.",
      "Гуглим, читаем документацию, пытаемся понять, как это все работает.",
      "Чтобы взаимодействовать с API, нужно иметь токен, а для этого — авторизоваться.",
      "Взаимодействие происходит через специальные ID страниц и блоков.",
      "Дальше понятно: ходим в блокчейн за инфой и отображаем. Класс!",
    ],
  },
  {
    id: 3,
    title: "Вопросики",
    titleIcon: "&#x2753;",
    texts: [
      "Я сформулировал ряд вопросов. И, к счастью, мне ответили на них. Спасибо за помощь!",
      "Что по дизайн системе, какие цвета, шрифты, отступы?",
      "Страничка-то под сабдоменом ton-org, а токен дадите?",
      "Пагинация в целом понятна, но на десктоп как будто не особо ложится...",
    ],
  },
  {
    id: 4,
    title: "Ответики",
    titleIcon: "&#x1F64B;",
    texts: [
      "Приложение должно быть Telegram WebApp!",
      "Мне приходилось работать с различными Telegram WebApp, однако в этом случае конкретных требований не было.",
      "Поэтому я решил ограничиться тем, что закрою фронт от внешнего браузера, сделаю его доступным только для внутреннего браузера Telegram.",
      "Дизайн-система — непринципиально. Токен — неа, работай со своим Notion.",
    ],
  },
];

const items1 = [
  {
    id: 1,
    title: "Дизайн",
    titleIcon: "&#x1F3A8;",
    texts: [
      "Я не дизайнер.",
      "И не претендую на это. Однако, я умею определить красиво или некрасиво.",
      "Мне нравится стиль Vercel и всей экосистемы их продуктов, так что я опирался на их дизайн-систему.",
    ],
  },
  {
    id: 2,
    title: "Подготовка проекта",
    titleIcon: "&#x2699;",
    texts: [
      "Я достаточно долго думал над выбором технологического стека.",
      "Вскоре стало понятно, что должно быть как минимум три основных компонента: фронт, бэк и uikit с компонентами.",
      "Зачем бэк? Как оказалось, с клиента нельзя ходить в Notion API напрямую, соответственно, нужен прокси-сервер.",
      "Для фронта я выбрал Vite. Для бэка — Nest.js. Для uikit — Tailwind + Radix компоненты.",
      "Почему?",
      "Я долго пытался найти причины использовать Next.js, SSR, но конкретно для этого проекта так и не нашел.",
      "К тому же я прохожу собеседование на позицию Fullstack-разработчика, а значит для меня выгодно показать, что я умею работать с разными технологиями независимо.",
    ],
  },
  {
    id: 3,
    title: "Фронтенд",
    titleIcon: "&#x1F4FA;",
    texts: [
      "Конечно, я выбрал базой Vite!",
      'Вот <b><a href="https://www.threads.net/@bodasooqa/post/C2LHmkfS1xK?xmt=AQGzaSIc4exugnry2Y2pOATYmmXh7ff_slie-TnthHgs8w">тут</a></b> можно даже почитать мой тред в threads, где я ясно доношу преимущества Vite. Может, хотя бы так его кто-то прочитает (нет).',
      "Для стилей я использовал Tailwind, а для компонентов — Radix. А когда ты используешь такую связку, совсем неподолеку стоит shadcn/ui.",
      "И как кстати, shadcn/ui выполнен в стиле Vercel! Неожиданно, правда?",
    ],
  },
  {
    id: 4,
    title: "Бэкенд",
    titleIcon: "&#x1FAC0;",
    texts: [
      "Да, я говорил о том, что хочу активно использовать Go, но в данном случае я выбрал Nest.js.",
      "Почему? Потому что у Notion есть официальный пакет для работы с их API, и он написан на TypeScript.",
      "А для Go такого пакета нет. И я не хочу писать его сам.",
      "А TypeScript — это Nest.js. Поэтому я выбрал Nest.js.",
      "К тому же, я уже работал с Nest.js, и мне нравится его архитектура.",
      "Такой а ля Angular на бэке.",
    ],
  },
  {
    id: 5,
    title: "Структура",
    titleIcon: "&#x1F9EC;",
    texts: [
      "Значит, мне нужно фронт-приложение, бэк-приложение и uikit.",
      "Все они должны быть независимыми, но взаимосвязанными.",
      "Лучше всего будет разделить их на три отдельных репозитория.",
      "Так удобнее. Или нет?",
      "Нет! Лучше всего будет разделить их на три отдельных папки в одном репозитории и гордо назвать &#x1F4AA; <b>MONOREPO</b> &#x1F4AA;.",
      "К тому же я сразу планировал, что помимо основных приложений я хочу сделать также этот лендинг.",
      "А это значит, что я могу иметь переиспользуемые части приложений в любом из этих проектов.",
      "Таким образом я организовал Turborepo Monorepo (звучит, как шашлык машлык), которое по итогу содержит 3 приложения (apps) и 4 пакета (packages).",
    ],
  },
  {
    id: 6,
    title: "Пакеты",
    titleIcon: "&#x1F6CD;",
    texts: [
      "Пакеты — это то, что я могу переиспользовать в любом из приложений.",
      "Например, я могу сделать пакет с компонентами, который будет использоваться в основном приложении и в лендинге.",
      "И я его сделаю, а помимо него отдельный пакет для shared TS-конфигов, пакет с общими сущностями и самое интересное — пакет <br /> &#x1F389; <b>ton-connect-sdk-react-ui</b> &#x1F389;",
    ],
  },
  {
    id: 7,
    title: "Деплой",
    titleIcon: "&#x2601;",
    texts: [
      "Собственно, я уже ни раз упомянал Vercel, и это неспроста.",
      "Я выбрал Vercel для деплоя всего фронта и бэка. Это удобно: пушнул в main — редеплой; поменял env'ы — редеплой; написал команду через терминал — редеплой.",
      "К тому же Vercel позволяет делать деплой монорепо, что тоже удобно.",
    ],
  },
];

const tab0Items = [
  {
    title: "Маршрутизация",
    texts: [
      "Маршрутизация в приложении реализована с помощью Tanstack Router. Это позволило мне настроить некие guard'ы, которые проверяют, авторизован ли пользователь (подключен ли его кошелек).",
      "Guard'ы реализованы с помощью контекста, который я передаю в роутер.",
      "Также Tanstack Router позволяет мне использовать динамические импорты, что ускоряет загрузку приложения. Это выполнено с помощью createLazyFileRoute.",
      "С помощью различных методов роута я реализовал валидацию search-параметров, пагинацию, загрузку данных, а также отображение различных состояний маршрута (pending/success/error).",
    ],
  },
  {
    title: "Работа с API",
    texts: [
      "Работа с API происходит через сервисы. Есть один абстрактный класс, от него наследуются все остальные сервисы.",
      "Сервисы реализуют методы для работы с API моего бэка и tonapi. Да, для доступа к информации в блокчейне я использую tonapi.",
      "Сервисы внедряются в контроллеры, которые в свою очередь внедряются в роуты в качестве loader'ов.",
      "В качестве инструмента для работы с API сервисами я использую Tanstack Query, который отлично интегрируется с Tanstack Router.",
      "Tanstack Query отдельно помогает кэщировать данные, а также играет ключевую роль в реализации пагинации (infinite scroll).",
      "В итоге у меня получается удобная структура для работы с API.",
    ],
  },
  {
    title: "Компоненты",
    texts: [
      "Компоненты в приложении разделены на две категории: компоненты-контейнеры и презентационные компоненты.",
      "Компоненты-контейнеры отвечают за логику и работу с данными, а презентационные компоненты — за отображение.",
      "Компоненты-контейнеры внедряются в роуты, а презентационные компоненты в компоненты-контейнеры.",
      "UI-компоненты вынесены в отдельный локальный пакет, доступны в любом приложении монорепо (в т.ч. в этом) и реализованы с помощью Radix компонентов + Tailwind.",
    ],
  },
  {
    title: "Стейт-менеджмент",
    texts: [
      "Мне не нужны были популярные FLUX решения вроде Redux, MobX и даже Zustand. Стейт-менеджмент в приложении реализован с помощью Tanstack Query.",
      "Все сервисы, которые работают с API, используют Tanstack Query для кэширования данных.",
      "Также Tanstack Query позволяет мне удобно работать с состоянием загрузки данных, ошибками и т.д.",
    ],
  },
  {
    title: "Стили",
    texts: [
      "Все стили в приложении реализованы с помощью Tailwind v4.",
      "Tailwind позволяет мне быстро и удобно стилизовать компоненты, а также использовать его классы в JSX.",
      "Кстати, стили являются глобальными и применяются ко всему приложению. В пакете ui сконфигурирован Tailwind, который при надобности может быть расширен в любом из приложений.",
      'Также, это первое за долгое время приложение, в котором я не использовал SASS/SCSS. Причина <b><a href="https://tailwindcss.com/docs/compatibility#sass-less-and-stylus">здесь</a></b>, он буквально перестал быть нужен.',
    ],
  },
  {
    title: "Виртуализация",
    texts: [
      "Список NFT в приложении виртуализирован с помощью Tanstack Virtualizer. В общем-то тут больше нечего сказать, это просто работает и является отличным способом оптимизации приложения.",
    ],
  },
  {
    title: "Полифилы",
    texts: [
      "В приложении используются полифилы для поддержки некоторых сущностей node.js. В частности Buffer.",
      "Buffer необходим для корректной работы пакета @ton/ton.",
    ],
  },
];

const tab1Items = [
  {
    title: "Маршрутизация",
    texts: [
      "Nest.js предоставляет удобный способ организации маршрутов с помощью декораторов. Как правило конкретная группа маршрутов обычно описывается в отдельном контроллере.",
      "В моем приложении я использовал всего два контроллера: один для работы с Notion API, другой для шейринга статики (tonconnect-manifest.json).",
      "Для работы с Notion API я использовал официальный пакет @notionhq/client, который позволяет взаимодействовать с API Notion.",
    ],
  },
  {
    title: "Валидация данных",
    texts: [
      "Валидация данных в Nest.js реализована с помощью классов-пайпов. Каждый пайп может быть использован для валидации, трансформации или фильтрации данных.",
      "В моем приложении я использовал пайпы для валидации тела и параметров запросов.",
      "Для валидации параметров запросов я использовал класс-валидаторы из пакета class-validator. Этот пакет позволяет с помощью декораторов определить правила валидации для каждого параметра запроса.",
    ],
  },
  {
    title: "Кэширование",
    texts: [
      "Для кэширования данных в моем приложении я использовал пакет cache-manager. Этот пакет предоставляет удобный способ кэширования данных в памяти, на диске или в базе данных.",
      "В моем приложении я использовал кэширование в памяти для хранения данных, полученных из Notion API. Данные кэшируются на 1 минуту, чтобы уменьшить нагрузку на API.",
      "Сброс кэша происходит при каждом обновлении данных в Notion через метод бэкенда.",
    ],
  },
  {
    title: "Валидация конфига",
    texts: [
      "Для валидации конфига приложения я использовал пакет zod и кастомную функцию validate, переданную в ConfigModule.",
      "Эта функция позволяет валидировать конфиг приложения перед его загрузкой и выбрасывать ошибку, если конфиг не прошел валидацию.",
    ],
  },
  {
    title: "CORS",
    texts: [
      "Для обработки CORS запросов в моем приложении я использовал встроенный в Nest.js пакет cors. Этот пакет предоставляет удобный способ настройки CORS политики для приложения.",
      "В моем приложении я разрешил запросы только с указанного в конфиге хоста.",
    ],
  },
];

const tab2Items = [
  {
    title: "entities",
    texts: [
      "В пакете entities я определил сущности, которые используются в приложении. Каждая сущность представлена в виде класса и содержит свойства и методы для работы с данными.",
      "В моем приложении я определил только одну сущность: Address. Эта сущность представляет собой расширенную версию Address из пакета @ton/ton.",
      "Address содержит методы для работы с адресом блокчейна TON и валидации адреса.",
    ],
  },
  {
    title: "typescript-config",
    texts: [
      "В пакете typescript-config я определил общие настройки TypeScript для всех приложений в монорепо. Этот пакет содержит настройки компилятора, линтера и форматтера.",
      "В моем приложении я использовал пакет tsconfig-paths для настройки путей к модулям.",
    ],
  },
  {
    title: "ton-connect-sdk-react-ui",
    texts: [
      "В пакете ton-connect-sdk-react-ui я определил компоненты для работы с Ton Connect SDK внутри React-приложения. По сути, это слегка форматированная копия оригинального пакета.",
      "В моем приложении я использовал компоненты из этого пакета для подключения кошелька пользователя и проверки подключения.",
      "Этот пакет расположен локально в монорепо, потому что npm-пакет не работает с React 19.",
    ],
  },
  {
    title: "ui",
    texts: [
      "В пакете ui я определил компоненты пользовательского интерфейса, которые используются в приложениях в монорепо. Этот пакет содержит компоненты для отображения данных, ввода данных и других элементов интерфейса.",
      "Компоненты в этом пакете реализованы с помощью Radix компонентов и Tailwind v4.",
    ],
  },
];

export const TimelineSection: React.FC<Omit<React.ComponentPropsWithoutRef<"div">, "children">> = ({
  className,
  ...props
}) => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div {...props} className={cn("container py-[2rem] md:py-[10rem]", className)}>
      <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight text-center">
        Как это было?
      </h1>
      <p className="text-center sm:text-lg md:text-xl text-black/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
        Нормально было. Неплохо. <br /> Не так уж и плохо. Но и не так уж и хорошо.
      </p>

      <Timeline>
        {items0.map((item) => (
          <TimelineItem key={item.id} step={item.id} className={timelineClassnames}>
            <TimelineHeader>
              <TimelineSeparator />
              <TimelineTitle className="inline-flex gap-1 text-lg">
                <span>{ReactHtmlParser(item.titleIcon)}</span>
                {item.title}
              </TimelineTitle>
              <TimelineIndicator />
            </TimelineHeader>
            {item.texts.map((text, index) => (
              <TimelineContent key={index}>{ReactHtmlParser(text)}</TimelineContent>
            ))}
          </TimelineItem>
        ))}
      </Timeline>

      <h1 className="mt-[2rem] md:mt-[10rem] text-3xl sm:text-4xl md:text-6xl font-bold mb-6 md:mb-8 tracking-tight text-center">
        Дизайн
      </h1>
      <p className="text-center sm:text-lg md:text-xl text-black/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
        Что делать с дизайном? Как его сделать? <br /> Как его сделать красиво?
      </p>

      <Card className="flex flex-col gap-2 items-center justify-center aspect-video overflow-hidden">
        {showVideo ? (
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&si=wCp2eSNszYTkQYO5&amp;controls=0"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            className="w-full h-full"
          />
        ) : (
          <>
            <h3 className="text-xl text-center text-muted-foreground sm:text-2xl md:text-4xl font-bold mb-6 tracking-tight">
              Понятия не имею, давайте посмотрим
            </h3>
            <Button onClick={() => setShowVideo(true)}>Давайте</Button>
          </>
        )}
      </Card>

      {showVideo && (
        <>
          <Timeline className="mt-[2rem] md:mt-[10rem]">
            {items1.map((item) => (
              <TimelineItem key={item.id} step={item.id} className={timelineClassnames}>
                <TimelineHeader>
                  <TimelineSeparator />
                  <TimelineTitle className="inline-flex gap-1 text-lg">
                    <span>{ReactHtmlParser(item.titleIcon)}</span>
                    {item.title}
                  </TimelineTitle>
                  <TimelineIndicator />
                </TimelineHeader>
                {item.texts.map((text, index) => (
                  <TimelineContent key={index}>{ReactHtmlParser(text)}</TimelineContent>
                ))}
              </TimelineItem>
            ))}
          </Timeline>

          <h1 className="mt-[2rem] md:mt-[10rem] text-3xl sm:text-4xl md:text-6xl font-bold mb-6 md:mb-8 tracking-tight text-center">
            Испытания
          </h1>
          <p className="text-center sm:text-lg md:text-xl text-black/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
            Что было сделано? Что было сделано хорошо? <br /> Что было сделано плохо?
          </p>

          <Tabs defaultValue="tab-1">
            <TabsList className="mb-3 mx-auto">
              <TabsTrigger value="tab-1">
                <TvMinimal className="-ms-0.5 me-1.5 opacity-60" size={16} aria-hidden="true" />
                Frontend
              </TabsTrigger>
              <TabsTrigger value="tab-2" className="group">
                <HardDrive className="-ms-0.5 me-1.5 opacity-60" size={16} aria-hidden="true" />
                Backend
              </TabsTrigger>
              <TabsTrigger value="tab-3" className="group">
                <BoxIcon className="-ms-0.5 me-1.5 opacity-60" size={16} aria-hidden="true" />
                Packages
              </TabsTrigger>
            </TabsList>
            <Card className="p-4">
              {[
                { id: "tab-1", items: tab0Items },
                { id: "tab-2", items: tab1Items },
                { id: "tab-3", items: tab2Items },
              ].map(({ id, items }) => (
                <TabsContent key={id} value={id} className="flex flex-col gap-4">
                  {items.map((item) => (
                    <div key={item.title} className="flex flex-col gap-2">
                      <h4 className="font-bold text-lg">{item.title}</h4>
                      {item.texts.map((text, index) => (
                        <p key={index} className="text-black/60">
                          {ReactHtmlParser(text)}
                        </p>
                      ))}
                    </div>
                  ))}
                </TabsContent>
              ))}
            </Card>
          </Tabs>
        </>
      )}
    </div>
  );
};
