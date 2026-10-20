{%- set zt_types = { "book": "Книга", "bookSection": "Раздел книги", "journalArticle": "Статья из рецензируемого журнала", "magazineArticle": "Статья из прочей периодики", "newspaperArticle": "Газетная статья", "thesis": "Диссертация", "letter": "Письмо", "manuscript": "Рукопись", "interview": "Интервью", "film": "Фильм", "artwork": "Художественная работа", "webpage": "Веб-страница", "report": "Отчёт", "bill": "Законопроект", "case": "Дело", "hearing": "Слушание", "patent": "Патент", "statute": "Нормативный правовой акт", "email": "Электронная почта", "map": "Карта", "blogPost": "Сообщение в блоге", "instantMessage": "Мгновенное сообщение", "forumPost": "Сообщение на форуме", "audioRecording": "Звукозапись", "presentation": "Презентация", "videoRecording": "Видеозапись", "tvBroadcast": "Телепередача", "radioBroadcast": "Радиопередача", "podcast": "Подкаст", "computerProgram": "Компьютерная программа", "conferencePaper": "Документ конференции", "document": "Документ", "encyclopediaArticle": "Статья из энциклопедии", "dictionaryEntry": "Словарная статья", "preprint": "Препринт", "dataset": "Набор данных", "standard": "Стандарт" } -%}
> [!info]+ Сведения
> 
> **Название**:: {{title}}
> 
> **Автор**:: {{authors}}{% if directors %}; {{directors}}{% endif %}
> **Год**:: {{date | format ("YYYY")}}
> **Тип**:: {{ zt_types[itemType] or itemType }}
>
> **Ключ цитирования**:: {{citationKey}}
> **Теги**:: {% if hashTags %}{{hashTags}} {% endif %}#source/zotero
> **Ключевые слова**:: {{allTags}}
> **Связанные**:: {{related}}
>
> **Журнал**:: {{publicationTitle}}
> **Выпуск**:: {{issue}}
> **Том**:: {{volume}}
>
> *Начал читать*::
> *Дочитал*::
> 
> **URL**:: {{url}}
> **DOI**:: {{DOI}}
 
> [!link]+ Ссылка на Zotero
> 
> {{pdfZoteroLink}}
 
> [!abstract]+ Краткое содержание
> 
> {{abstractNote}}
 
 
## Главные мысли и вечнозелёные заметки
 
 
### Выделения
{% for annotation in annotations -%}
>[!Quote|{{ annotation.color or annotation.colorCategory }}]+ Цитата
>{%- if annotation.annotatedText -%}*« {{annotation.annotatedText}} »* ([с. {{annotation.page}}](zotero://open-pdf/library/items/{{annotation.attachment.itemKey}}?page={{annotation.page}}&annotation={{annotation.id}})){% endif %}{% if annotation.imageRelativePath %}![[{{annotation.imageRelativePath}}]][Открыть на с. {{annotation.page}}](zotero://open-pdf/library/items/{{annotation.attachment.itemKey}}?page={{annotation.page}}){% endif %}{% if annotation.comment %}
>
>{{annotation.comment}}{%- endif %}
 
{% endfor %}
