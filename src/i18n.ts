// Interface language for the fork: Russian when Obsidian runs in Russian,
// English (the original strings) for every other language.
// Keys are the original English strings, so English output never changes.

type Vars = Record<string, string | number>;

export function getLanguage(): string {
  try {
    const lang = window.localStorage.getItem('language');
    if (lang) return lang;
  } catch (e) {
    // no window or storage (tests)
  }
  try {
    const m = (window as any).moment;
    if (m && typeof m.locale === 'function') return m.locale() || 'en';
  } catch (e) {
    // ignore
  }
  return 'en';
}

export function isRu(): boolean {
  return getLanguage().toLowerCase().startsWith('ru');
}

function fill(str: string, vars?: Vars): string {
  if (!vars) return str;
  return str.replace(/\{(\w+)\}/g, (match, key) =>
    key in vars ? String(vars[key]) : match
  );
}

export function t(key: string, vars?: Vars): string {
  const str = (isRu() && ru[key]) || key;
  return fill(str, vars);
}

// Pick between two prepared variants (used for rich JSX descriptions).
export function L<T>(en: T, ruVariant: T): T {
  return isRu() ? ruVariant : en;
}

export const ru: Record<string, string> = {
  // Commands
  'Insert notes into current document': 'Вставить заметки в текущий документ',
  'Import notes': 'Импортировать заметки',
  'Data explorer': 'Просмотр данных',

  // Settings: general
  'General Settings': 'Общие настройки',
  'PDF utility (pdfannots2json)': 'Утилита для PDF (pdfannots2json)',
  'Optional. Only needed for annotations stored inside PDF files by other apps. Annotations made in the Zotero reader are imported without it.':
    'Необязательно. Нужна только для аннотаций, которые другие программы сохранили внутри PDF. Аннотации из читалки Zotero импортируются и без неё.',
  Database: 'База данных',
  'Supports Zotero and Juris-M. Alternatively a custom port number can be specified.':
    'Поддерживаются Zotero и Juris-M. Можно указать и свой номер порта.',
  Custom: 'Свой порт',
  'Port number': 'Номер порта',
  'If a custom port number has been set in Zotero, enter it here.':
    'Если в Zotero задан свой порт, укажите его здесь.',
  'Example: 23119': 'Например: 23119',
  'Note Import Location': 'Папка для импорта заметок',
  'Notes imported from Zotero will be added to this folder in your vault':
    'Заметки, импортированные из Zotero, попадут в эту папку хранилища',
  'Example: folder 1/folder 2': 'Например: папка 1/папка 2',
  'Open the created or updated note(s) after import':
    'Открывать созданные и обновлённые заметки после импорта',
  'The created or updated markdown files resulting from the import will be automatically opened.':
    'Заметки, созданные или обновлённые при импорте, откроются автоматически.',
  'Which notes to open after import': 'Какие заметки открывать после импорта',
  'Open either the first note imported, the last note imported, or all notes in new tabs.':
    'Первую импортированную, последнюю или все — в новых вкладках.',
  'First imported note': 'Первую импортированную',
  'Last imported note': 'Последнюю импортированную',
  'All imported notes': 'Все импортированные',
  'Enable Annotation Concatenation': 'Склеивать аннотации',
  "Annotations extracted from PDFs that begin with '+' will be appended to the previous annotation. Note: Annotation ordering is not always consistent and you may not always acheive the desire concatenation result":
    'Аннотация из PDF, которая начинается с «+», дописывается к предыдущей. Учтите: порядок аннотаций не всегда предсказуем, и склейка может получиться не такой, как вы ждёте.',
  'Citation Formats': 'Форматы цитирования',
  'Add Citation Format': 'Добавить формат цитирования',
  'Import Formats': 'Форматы импорта',
  'Add Import Format': 'Добавить формат импорта',
  'Import Image Settings': 'Изображения при импорте',
  'Rectangle annotations will be extracted from PDFs as images.':
    'Прямоугольные аннотации извлекаются из PDF как изображения.',
  'Image Format': 'Формат изображений',
  'Image Quality (jpg only)': 'Качество изображений (только jpg)',
  'Image DPI': 'Разрешение изображений, DPI',
  'Image OCR': 'Распознавание текста на изображениях',
  'Tesseract path': 'Путь к Tesseract',
  'Attempt to find tesseract automatically': 'Найти Tesseract автоматически',
  'Unable to find tesseract on your system. If it is installed, please manually enter a path.':
    'Tesseract не найден. Если он установлен, укажите путь вручную.',
  'Image OCR Language': 'Язык распознавания',
  'Tesseract data directory': 'Папка данных Tesseract',
  "Optional: supply an absolute path to the directory where tesseract's language files reside. This folder should include *.traineddata files for your selected languages.":
    'Необязательно: абсолютный путь к папке с языковыми файлами Tesseract. В ней должны лежать файлы *.traineddata для выбранных языков.',
  'Select the tesseract data directory': 'Выбрать папку данных Tesseract',

  // Settings: PDF utility
  'Error downloading PDF utility. Check the console for more details.':
    'Не удалось скачать утилиту для PDF. Подробности — в консоли разработчика.',
  'Annotations stored inside PDF files by other apps are extracted with an external tool.':
    'Аннотации, которые другие программы сохранили внутри PDF, извлекает внешняя утилита.',
  'Annotations made in the Zotero reader are imported without it.':
    'Аннотации из читалки Zotero импортируются и без неё.',
  'PDF Utility Path Override': 'Свой путь к утилите для PDF',
  'Select the pdfannots2json executable': 'Выбрать исполняемый файл pdfannots2json',
  'PDF Utility': 'Утилита для PDF',
  'PDF utility is up to date.': 'Утилита для PDF — актуальной версии.',
  'The PDF extraction tool requires updating. Please re-download.':
    'Утилиту нужно обновить — скачайте её заново.',
  'Click the button to download.': 'Нажмите кнопку, чтобы скачать.',
  'Downloading...': 'Скачивается…',
  Download: 'Скачать',
  'Error checking PDF utility version: {error}':
    'Не удалось проверить версию утилиты для PDF: {error}',

  // Settings: formats
  Name: 'Название',
  'Output Format': 'Формат вывода',
  'Formatted Citation': 'Оформленная цитата',
  'Formatted Bibliography': 'Оформленная библиография',
  Template: 'Шаблон',
  'Bibliography Style': 'Стиль библиографии',
  'Citation Style': 'Стиль цитирования',
  'Search...': 'Поиск…',
  'Citation Command': 'Команда цитирования',
  'Include Brackets': 'Добавлять скобки',
  'Output Path': 'Путь к заметке',
  'Image Output Path': 'Папка для изображений',
  'Image Base Name': 'Базовое имя изображений',
  'Template File': 'Файл шаблона',
  'Header Template File (deprecated)': 'Шаблон заголовка (устарело)',
  'Annotation Template File (deprecated)': 'Шаблон аннотаций (устарело)',
  'Footer Template File (deprecated)': 'Шаблон окончания (устарело)',
  'Remove Template': 'Убрать шаблон',
  'Type to search CSL styles': 'Начните вводить название стиля',
  'Type to search': 'Начните вводить для поиска',

  // Data explorer
  'No data retrieved': 'Данные не получены',
  'Prompt For Selection': 'Выбрать запись',
  'Preview Import Format': 'Предпросмотр формата импорта',
  'Zotero Data Explorer': 'Данные Zotero',
  'Copy template path': 'Копировать путь для шаблона',
  'Copy template for loop': 'Копировать цикл для шаблона',
  'Template Data': 'Данные для шаблона',

  // Loading
  'Fetching notes from Zotero...': 'Получаю заметки из Zotero…',
  'Fetching collections from Zotero...': 'Получаю коллекции из Zotero…',
  'Fetching data from Zotero...': 'Получаю данные из Zotero…',
  'Extracting annotations...': 'Извлекаю аннотации…',
  'Updating Obsidian Zotero Integration PDF Utility...': 'Обновляю утилиту для PDF…',

  // Notices
  'Cannot connect to Zotero. Please ensure it is running and the Better BibTeX plugin is installed':
    'Не удаётся подключиться к Zotero. Проверьте, что Zotero запущен и установлен Better BibTeX',
  'Error processing citation: {error}': 'Ошибка при обработке цитаты: {error}',
  'Error retrieving cite key: {error}':
    'Не удалось получить ключ цитирования: {error}',
  'Error: unable to copy annotation image from Zotero into your vault':
    'Ошибка: не удалось скопировать изображение аннотации из Zotero в хранилище',
  'No notes found for selected items': 'У выбранных записей нет заметок',
  'Error creating file "{path}": {error}':
    'Не удалось создать файл «{path}»: {error}',
  'Error: PDF utility is not executable':
    'Ошибка: утилиту для PDF не удаётся запустить',
  'Error opening {file}: PDF is password protected':
    'Не удалось открыть {file}: PDF защищён паролем',
  'Error processing PDF: {error}': 'Ошибка при обработке PDF: {error}',
  'Error processing annotations: {error}':
    'Ошибка при обработке аннотаций: {error}',
  'Error: {name} template not found {path}':
    'Ошибка: шаблон {name} не найден: {path}',
  'Error parsing template "{path}": ': 'Ошибка в шаблоне «{path}»: ',
  'Import failed for {path}, check developer console for details':
    'Не удалось импортировать {path}. Подробности — в консоли разработчика',
  'Error retrieving notes: {error}': 'Не удалось получить заметки: {error}',
  'Error retrieving library id: {error}':
    'Не удалось получить номер библиотеки: {error}',
  'Error retrieving formatted bibliography: {error}':
    'Не удалось получить оформленную библиографию: {error}',
  'Error converting formatted bibliography to markdown: {error}':
    'Не удалось преобразовать библиографию в Markdown: {error}',
  "Error: Received empty bibliography from Zotero. Ensure Zotero's quick copy settings are set and the selected citation style is installed.":
    'Ошибка: Zotero вернул пустую библиографию. Проверьте настройки быстрого копирования в Zotero и что выбранный стиль цитирования установлен.',
  'Error retrieving item data: {error}':
    'Не удалось получить данные записи: {error}',
  'Error searching: {error}': 'Ошибка поиска: {error}',
};
