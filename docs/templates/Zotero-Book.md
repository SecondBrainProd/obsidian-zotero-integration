{%- set zt_types = { "book": "Книга", "bookSection": "Раздел книги", "journalArticle": "Статья из рецензируемого журнала", "magazineArticle": "Статья из прочей периодики", "newspaperArticle": "Газетная статья", "thesis": "Диссертация", "letter": "Письмо", "manuscript": "Рукопись", "interview": "Интервью", "film": "Фильм", "artwork": "Художественная работа", "webpage": "Веб-страница", "report": "Отчёт", "bill": "Законопроект", "case": "Дело", "hearing": "Слушание", "patent": "Патент", "statute": "Нормативный правовой акт", "email": "Электронная почта", "map": "Карта", "blogPost": "Сообщение в блоге", "instantMessage": "Мгновенное сообщение", "forumPost": "Сообщение на форуме", "audioRecording": "Звукозапись", "presentation": "Презентация", "videoRecording": "Видеозапись", "tvBroadcast": "Телепередача", "radioBroadcast": "Радиопередача", "podcast": "Подкаст", "computerProgram": "Компьютерная программа", "conferencePaper": "Документ конференции", "document": "Документ", "encyclopediaArticle": "Статья из энциклопедии", "dictionaryEntry": "Словарная статья", "preprint": "Препринт", "dataset": "Набор данных", "standard": "Стандарт" } -%}
> [!info] Сведения
> 
> **Название**:: {{title}}
>
> **Автор**:: {{authors}}{% if directors %}; {{directors}}{% endif %}
> **Год издания**:: {{date | format ("YYYY")}}
>
> **Тип**:: {{ zt_types[itemType] or itemType }}
> **Издание**:: {{edition}}
> **Издательство**:: {{publisher}}
> **Страниц**:: {{numPages}}
>
> *Начал читать*::
> *Дочитал*::
> 
> **Теги**:: {% if hashTags %}{{hashTags}} {% endif %}#source/zotero
> **Ключевые слова**:: {{allTags}}
> **URL**:: {{url}}
 
> [!link]+ Ссылка на Zotero
> 
>{{pdfZoteroLink}}
 
> [!abstract]+ Краткое содержание
> 
> {{abstractNote}}
 
### Книга в трёх предложениях
 
 
### Что из прочитанного я могу применить на практике
 
 
### Ключевые выводы
 
 
### Впечатления
 
 
### Как эта книга меня изменила
 
 
### Три главные цитаты
 
 
### Выделения
{% for annotation in annotations -%}
>[!Quote|{{ annotation.color or annotation.colorCategory }}]+ Цитата
>{%- if annotation.annotatedText -%}*« {{annotation.annotatedText}} »* ([с. {{annotation.page}}](zotero://open-pdf/library/items/{{annotation.attachment.itemKey}}?page={{annotation.page}}&annotation={{annotation.id}})){% endif %}{% if annotation.imageRelativePath %}![[{{annotation.imageRelativePath}}]][Открыть на с. {{annotation.page}}](zotero://open-pdf/library/items/{{annotation.attachment.itemKey}}?page={{annotation.page}}){% endif %}{% if annotation.comment %}
>
>{{annotation.comment}}{%- endif %}
 
{% endfor %}
