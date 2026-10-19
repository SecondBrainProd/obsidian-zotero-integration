# Zotero Integration (Second Brain)

**English** · [Русский](#русский)

A maintained fork of [Obsidian Zotero Integration](https://github.com/mgmeyers/obsidian-zotero-integration) by **mgmeyers**. Insert and import citations, bibliographies, notes, and PDF annotations from Zotero into Obsidian. Requires the [Better BibTeX for Zotero](https://retorque.re/zotero-better-bibtex/installation/) plugin.

The original plugin is no longer maintained (last release 3.2.1, 2024-08-11). This fork keeps it working for the [Second Brain](https://second-brain.ru) school courses and for everyone else.

### What is different from the original

- Plugin id `sb-zotero-integration`, so it can be installed next to the original. On first run it **imports the settings of the original plugin** if they exist in the vault (the original is not modified).
- Fixed: annotations on the **first page** of a PDF lost their page number.
- The external PDF utility `pdfannots2json` is **optional and off by default**. It is only needed for annotations stored inside PDF files by other apps; annotations made in the Zotero reader are imported without it.
- No hard-coded plugin folder: works with a custom config folder.
- Example templates (book, article) and a callout CSS snippet for annotation colors — `docs/templates/`.

### Compatibility (tested)

| | Version |
|---|---|
| Zotero | 10.0.6 |
| Better BibTeX | 9.0.71 |
| Obsidian | 1.14.4 (desktop, macOS) |

Zotero 11 is not supported yet: Better BibTeX 9.0.71 does not install on it.

### Installation (BRAT)

1. Install **BRAT** from Obsidian community plugins.
2. BRAT → *Add beta plugin* → `SecondBrainProd/obsidian-zotero-integration`.
3. Enable **Zotero Integration (Second Brain)**. If the original Zotero Integration is installed, disable it to avoid duplicate commands.

Documentation of the original (templates, export settings): [docs/README-original.md](docs/README-original.md), [docs/Templating.md](docs/Templating.md).

### License

GPL-3.0, same as the original (see [LICENSE.md](LICENSE.md) and [NOTICE.md](NOTICE.md)). Original work © mgmeyers; changes in this fork © Second Brain. The full list of changes is in the git history of the `sb-main` branch.

---

## Русский

Поддерживаемый форк плагина [Obsidian Zotero Integration](https://github.com/mgmeyers/obsidian-zotero-integration), автор оригинала — **mgmeyers**. Вставляет и импортирует из Zotero в Obsidian цитаты, списки литературы, заметки и аннотации к PDF. Нужен плагин [Better BibTeX для Zotero](https://retorque.re/zotero-better-bibtex/installation/).

Оригинал больше не поддерживается (последний релиз 3.2.1 от 11.08.2024). Форк поддерживает его работу для курсов школы [Second Brain](https://second-brain.ru) — и для всех остальных.

### Чем отличается от оригинала

- Свой id `sb-zotero-integration` — ставится рядом с оригиналом. При первом запуске **переносит настройки оригинального плагина**, если они есть в хранилище (сам оригинал не трогает).
- Исправлено: у аннотаций с **первой страницы** PDF терялся номер страницы.
- Внешняя утилита `pdfannots2json` — **необязательная и выключена по умолчанию**. Она нужна только для аннотаций, которые другие программы записали внутрь PDF; аннотации из читалки Zotero импортируются без неё.
- Папка плагина не зашита в код — работает и с нестандартной папкой настроек.
- Примеры шаблонов (книга, статья) и CSS-фрагмент для цветов аннотаций — `docs/templates/`.

### Совместимость (проверено)

| | Версия |
|---|---|
| Zotero | 10.0.6 |
| Better BibTeX | 9.0.71 |
| Obsidian | 1.14.4 (компьютер, macOS) |

Zotero 11 пока не поддерживается: Better BibTeX 9.0.71 на него не ставится.

### Установка (BRAT)

1. Установите **BRAT** из каталога плагинов Obsidian.
2. BRAT → *Add beta plugin* → `SecondBrainProd/obsidian-zotero-integration`.
3. Включите **Zotero Integration (Second Brain)**. Если стоит оригинальный Zotero Integration — отключите его, чтобы команды не дублировались.

Документация оригинала (шаблоны, настройки импорта): [docs/README-original.md](docs/README-original.md), [docs/Templating.md](docs/Templating.md).

### Лицензия

GPL-3.0, как у оригинала (см. [LICENSE.md](LICENSE.md) и [NOTICE.md](NOTICE.md)). Оригинальная работа © mgmeyers; изменения форка © Second Brain. Полный список изменений — в истории ветки `sb-main`.
