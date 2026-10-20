import fs from 'fs';
import moment from 'moment';
import path from 'path';

import { renderTemplate } from '../template.env';

jest.mock(
  'obsidian',
  () => ({
    moment: require('moment'),
  }),
  { virtual: true }
);

const dir = path.join(__dirname, '../../../docs/templates');
const read = (name: string) =>
  fs.readFileSync(path.join(dir, name), 'utf-8');

const annotation = {
  color: '#ffd400',
  colorCategory: 'Yellow',
  annotatedText: 'Первая выделенная мысль',
  page: '1',
  id: 'ANN1',
  attachment: { itemKey: 'ATT1' },
  comment: 'Мой комментарий',
};

const base = {
  title: 'Как делать полезные заметки',
  authors: 'Зонке Аренс',
  directors: '',
  date: moment('2017-01-01', 'YYYY-MM-DD'),
  hashTags: '#pkm',
  allTags: 'pkm',
  url: '',
  pdfZoteroLink: '[PDF](zotero://open-pdf/library/items/ATT1)',
  abstractNote: '',
  annotations: [annotation],
};

describe('Russian literature-note templates', () => {
  test('book template renders Russian labels and item type', async () => {
    const out = await renderTemplate('Книга.md', read('Zotero-Book.md'), {
      ...base,
      itemType: 'book',
      edition: '',
      publisher: 'Альпина Паблишер',
      numPages: '',
    });
    expect(out).toContain('**Тип**:: Книга');
    expect(out).toContain('**Издательство**:: Альпина Паблишер');
    expect(out).toContain('**Автор**:: Зонке Аренс\n');
    expect(out).toContain('**Год издания**:: 2017');
    expect(out).toContain('[с. 1](zotero://open-pdf/library/items/ATT1?page=1&annotation=ANN1)');
    expect(out).toContain('>[!Quote|#ffd400]+ Цитата');
    expect(out).toContain('**Теги**:: #pkm #source/zotero');
    expect(out).not.toMatch(/\{\{|\{%/);
    expect(out.startsWith('> [!info] Сведения')).toBe(true);
  });

  test('article template renders journalArticle as in Russian Zotero', async () => {
    const out = await renderTemplate('Статья.md', read('Zotero-Articles.md'), {
      ...base,
      itemType: 'journalArticle',
      citationKey: 'arens2017',
      related: '',
      publicationTitle: 'Журнал',
      issue: '2',
      volume: '5',
      DOI: '10.1/x',
    });
    expect(out).toContain('**Тип**:: Статья из рецензируемого журнала');
    expect(out).toContain('**Ключ цитирования**:: arens2017');
    expect(out).toContain('**Том**:: 5');
    expect(out).not.toMatch(/\{\{|\{%/);
  });

  test('unknown item type falls back to the raw value', async () => {
    const out = await renderTemplate('Статья.md', read('Zotero-Articles.md'), {
      ...base,
      itemType: 'somethingNew',
    });
    expect(out).toContain('**Тип**:: somethingNew');
  });

  test('English templates are kept alongside', () => {
    expect(read('Zotero-Book (en).md')).toContain('[!info] Metadata');
    expect(read('Zotero-Articles (en).md')).toContain('**Item Type**::');
  });
});
