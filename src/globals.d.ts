declare module 'escape-path-with-spaces';
declare module 'shell-path';

// Obsidian убрал глобальный `app` из типов (в рантайме он есть, проверено на 1.14.4).
// Код оригинала опирается на него, поэтому объявляем явно.
declare var app: import('obsidian').App;
