import { Stage } from "@/types/types";

//? шаблон стадий
export const staticStagesTemplate: Stage[] = [
  {
    // id: 1,
    title: "Техническое задание",
    icon: "list-checks",
    href: "brief",
    description: "Составление подробного описания требований и пожеланий",
    stage_status: "active",
    stage_blocks: [
      {
        name: "Общие данные",
      },
      {
        name: "Информация о проживающих",
      },
      {
        name: "Перечень помещений",
      },
      {
        name: "Информация по демонтажу",
      },
      {
        name: "Информация по монтажу",
      },
      {
        name: "Инженерные системы",
      },
      {
        name: "Отделка и оборудование",
      },
    ],
  },
  {
    // id: 2,
    title: "Договор",
    icon: "file-text",
    href: "contract",
    description: "Закрепление условий сотрудничества и объёма работ",
  },
  {
    // id: 3,
    title: "Авансовый платеж",
    icon: null,
    href: "brief",
    type: "action",
  },
  {
    // id: 4,
    title: "Обмер помещений",
    icon: "pencil-ruler",
    href: "measurement",
    description: "Сбор информации о текущем состоянии помещений",
  },
  {
    // id: 5,
    title: "Планировочное решение",
    icon: "proportions",
    href: "plans",
    description: "Разработка вариантов планировки пространства",
    stage_blocks: [
      { name: "Плоскостное планировочное решение" },
      { name: "Объемное планировочное решение" },
    ],
  },
  {
    // id: 6,
    title: "Коллаж",
    icon: "swatch-book",
    href: "collage",
    description:
      "Создание визуальных концепций для согласования стилевых решений",
  },
  {
    // id: 7,
    title: "Визуализация",
    icon: "box",
    href: "visualisation",
    description: "Демонстрация будущего интерьера в фотореалистичном формате",
  },
  {
    // id: 8,
    title: "Промежуточный платеж",
    icon: null,
    href: "brief",
    type: "action",
  },
  {
    // id: 9,
    title: "Чертежи и схемы",
    icon: "square-pen",
    href: "layouts",
    description:
      "Создание схем по электрике, сантехнике и прочим коммуникациям",
  },
  {
    // id: 10,
    title: "Инженерные проекты",
    icon: "file-stack",
    href: "engeneering",
    description:
      "Проекты систем: электрика, отопление, вентиляция, водоснабжение",
  },
  {
    // id: 11,
    title: "Комплектация",
    icon: "shopping-cart",
    href: "equipment",
    description:
      "Подбор необходимых материалов, мебели и аксессуаров для реализации проекта",
  },
  {
    // id: 12,
    title: "Окончательный расчет",
    icon: null,
    href: "brief",
    type: "action",
  },
  {
    // id: 13,
    title: "Авторский контроль",
    icon: "view",
    href: "authcontrol",
    description: "Проверка соответствия принимаемых решений проектным",
  },
];

//? Шаблон этапов проекта
const blockTemplates = {
  "Техническое задание": [
    {
      block_name: "Общие данные",
      fields: [
        "Количество проживающих",
        "Назначение помещений",
        "Площадь",
        "Адрес",
      ],
    },
    {
      block_name: "Информация о проживающих",
      fields: [
        "Имя",
        "Пол",
        "Возраст",
        "Увлечения",
        "Ограничения по здоровью",
        "Наличие домашних животных",
      ],
    },
    { block_name: "Перечень помещений", fields: ["Название помещения"] },
    { block_name: "Информация по демонтажу", fields: ["Название помещения"] },
    { block_name: "Информация по монтажу", fields: ["Название помещения"] },
    { block_name: "Инженерные системы", fields: ["Название помещения"] },
    { block_name: "Отделка и оборудование", fields: ["Название помещения"] },
  ],
  Договор: [
    {
      block_name: "Данные для договора",
      fields: [
        "Дата начала",
        "Дата завершения",
        "Сумма",
        "ФИО клиента",
        "Адрес объекта",
        "Площадь объекта",
      ],
    },
    // остальные блоки...
  ],
  "Авансовый платеж": [],

  "Обмер помещений": [],
  "Планировочное решение": [],
  Коллаж: [],
  Визуализация: [],
  "Чертежи и схемы": [],
  "Инженерные проекты": [],
  Комплектация: [],
  "Авторский контроль": [],

  // остальные стадии...
};

interface Option {
  value: string;
  label: string;
}

export const roomList: Option[] = [
  {
    value: "Прихожая",
    label: "Прихожая",
  },
  {
    value: "Гостиная",
    label: "Гостиная",
  },
  {
    value: "Кухня",
    label: "Кухня",
  },
  {
    value: "Столовая",
    label: "Столовая",
  },
  {
    value: "Спальня",
    label: "Спальня",
  },
  {
    value: "Детская",
    label: "Детская",
  },
  {
    value: "Гардеробная",
    label: "Гардеробная",
  },
  {
    value: "Ванная комната",
    label: "Ванная комната",
  },
  {
    value: "Санузел",
    label: "Санузел",
  },
  {
    value: "Постирочная",
    label: "Постирочная",
  },
];
export const wallMaterials: string[] = [
  "Кирпич",
  "Пазогребневые плиты (ПГП)",
  "Керамзитобетонные блоки",
  "Газобетон или пенобетон",
  "Гипсокартон",
];

export const floorMaterials: string[] = [
  "Инженерная доска",
  "Паркетная доска",
  "Ламинат",
  "Кварцвинил",
  "Керамогранит",
  "Натуральный камень",
  "Микроцемент",
];

export const ceilingMaterials: string[] = [
  "Гипсокартон",
  "Натяжной потолок",
  "Без подшивки",
];

export const optionsMaker = (data: string[]) => {
  let newOptions: Option[] = [];

  data.map((item) => {
    newOptions.push({ label: item, value: item });
  });

  return newOptions;
};
