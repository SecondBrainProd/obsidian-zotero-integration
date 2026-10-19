# CLAUDE.md — форк Zotero Integration (Second Brain)

Форк заброшенного плагина [Zotero Integration](https://github.com/mgmeyers/obsidian-zotero-integration) (mgmeyers, GPL-3.0; последний релиз 3.2.1 от 20240811, исходник — `community-archive/obsidian-zotero-integration`). Нужен курсу «Zotero. Ваша личная библиотека» школы Second Brain: связка Zotero → Obsidian (литературные заметки, аннотации с цветами, цитирование).

- Репозиторий: `github.com/SecondBrainProd/obsidian-zotero-integration` (origin), `upstream` — community-archive.
- Рабочая ветка: `sb-main`. `main` — зеркало оригинала, не трогать.
- Плагин: `id` `sb-zotero-integration`, имя «Zotero Integration (Second Brain)». Старый `id` оригинала — `obsidian-zotero-desktop-connector`.
- План и критерии готовности — `docs/plans/20261019-форк-план.md`.

## Стек и сборка

TypeScript + Preact (через `@preact/compat`), esbuild, nunjucks для шаблонов, jest для тестов. Yarn v1 (lockfile v1); на машине нет глобального yarn — запускать через `npx -y yarn@1.22.22`.

```bash
nice -n 10 npx -y yarn@1.22.22 install --frozen-lockfile
nice -n 10 npx -y yarn@1.22.22 build        # → main.js
nice -n 10 npx -y yarn@1.22.22 check-types
nice -n 10 npx -y yarn@1.22.22 test
```

Известный падающий тест из оригинала: `PersistExtension › sanely handles new lines` (`src/bbt/tests/template.env.test.ts`) — падал до форка, к нашим правкам не относится.

## Совместимость (проверено)

Zotero 10.0.6 + Better BibTeX 9.0.71 + Obsidian 1.14.4 (macOS). Zotero 11 (бета) не поддерживается: BBT 9.0.71 не ставится на 11 (`strict_max_version: 10.*`).

## Как тестировать

Стенд — изолированные профили, рабочие Zotero и Obsidian владельца не трогать:
- Zotero 10.0.6 — отдельная копия и профиль в каталоге задания (`$CLAUDE_JOB_DIR/tmp/z11/app10`, `profile10`, `data10`), HTTP-сервер на 23129 (не 23119 — его читают `zotero-mcp`). Перед запуском `pgrep -fl Zotero`: если запущен Zotero владельца — второй не запускать.
- Obsidian 1.14.4 — свой `--user-data-dir` с копией `obsidian-1.14.4.asar`, CDP-порт 9562; в плагине база «Custom», порт 23129.
- Проверки: импорт литературной заметки по книге и статье, цвета выносок (`docs/templates/Zotero-callouts-v3.css`), цитирование, номер страницы у аннотации первой страницы («Page 1»), работа без `pdfannots2json`, перенос настроек со старого плагина.

## Правила

- Тяжёлое (install, build) — под `nice`, последовательно.
- Можно: коммиты в `sb-main`, `git push origin sb-main`.
- **Нельзя без «го» владельца:** теги, GitHub Release, смена default branch, PR в чужие репозитории, заявка в `obsidianmd/obsidian-releases`.
- Атрибуцию mgmeyers сохранять (README, LICENSE). Лицензия — GPL-3.0, исходники открыты.
- `pdfannots2json` — необязательная функция, выключена по умолчанию; плагин полностью работает без бинарника (аннотации берутся из базы Zotero).
