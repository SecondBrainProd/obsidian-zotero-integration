# Zotero Integration (Second Brain) 4.0.0

First release of the Second Brain fork of [Obsidian Zotero Integration](https://github.com/mgmeyers/obsidian-zotero-integration) by mgmeyers (based on 3.2.1).

- New plugin id `sb-zotero-integration` — installs next to the original. On first run imports the original plugin's settings (the original is not modified). Disable the original to avoid duplicate commands.
- Fixed: annotations on the first page of a PDF lost their page number (`Page ` / empty `page=`).
- `pdfannots2json` is optional and off by default; annotations made in the Zotero reader are imported without it.
- Plugin folder and command ids are taken from the manifest instead of hard-coded strings.
- Obsidian API typings 1.14.4; example templates and callout CSS in `docs/templates/`.

Tested: Zotero 10.0.6, Better BibTeX 9.0.71, Obsidian 1.14.4 (macOS). Zotero 11 is not supported yet (Better BibTeX does not install on it).

Install via BRAT: `SecondBrainProd/obsidian-zotero-integration`.

---

Первый релиз форка Second Brain. Новый id `sb-zotero-integration` и перенос настроек оригинала; исправлен номер страницы у аннотаций с первой страницы PDF; `pdfannots2json` необязательный и выключен по умолчанию. Проверено: Zotero 10.0.6, Better BibTeX 9.0.71, Obsidian 1.14.4. Установка — через BRAT.
