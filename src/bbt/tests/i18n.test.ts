import { L, isRu, ru, t } from '../../i18n';

function setLanguage(lang: string | null) {
  (global as any).window = {
    localStorage: { getItem: (k: string) => (k === 'language' ? lang : null) },
  };
}

describe('i18n', () => {
  afterEach(() => {
    delete (global as any).window;
  });

  test('falls back to English without a window', () => {
    expect(isRu()).toBe(false);
    expect(t('Import notes')).toBe('Import notes');
  });

  test('English when Obsidian language is not set', () => {
    setLanguage(null);
    expect(t('Import notes')).toBe('Import notes');
    expect(L('en', 'ru')).toBe('en');
  });

  test('Russian when Obsidian language is ru', () => {
    setLanguage('ru');
    expect(t('Import notes')).toBe('Импортировать заметки');
    expect(L('en', 'ru')).toBe('ru');
  });

  test('fills variables in both languages', () => {
    setLanguage(null);
    expect(t('Error searching: {error}', { error: 'x' })).toBe(
      'Error searching: x'
    );
    setLanguage('ru');
    expect(t('Error searching: {error}', { error: 'x' })).toBe(
      'Ошибка поиска: x'
    );
  });

  test('unknown key returns the key itself', () => {
    setLanguage('ru');
    expect(t('Something new')).toBe('Something new');
  });

  test('every Russian string keeps the same placeholders', () => {
    for (const [key, value] of Object.entries(ru)) {
      const ph = (s: string) => (s.match(/\{(\w+)\}/g) || []).sort().join();
      expect([key, ph(value)]).toEqual([key, ph(key)]);
    }
  });
});
