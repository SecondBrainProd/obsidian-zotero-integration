> [!info] Metadata
> 
> **Название**:: {{title}}
>
> **Автор**:: {{authors}}; {{directors}}
> **Год издания**:: {{date | format ("YYYY")}}
>
> **Тип документа**:: {{itemType | capitalize}}
> **Издание**:: {{edition}}
> **Издательство**: {{publisher}}
> **Страниц**:: {{numPages}}
>
> *Read start*::
> *Read end*::
> 
> **Tags**:: {% if hashTags %}{{hashTags}} {% endif %}#source/zotero
> **Keywords**:: {{allTags}}
> **URL**:: {{url}}
 
> [!link]+ Zotero Link
> 
>{{pdfZoteroLink}}
 
> [!abstract]+
> 
> {{abstractNote}}
 
### Книга в трех предложениях
 
 
### Что из прочитанного я могу применить на практике
 
 
### Ключевые выводы
 
 
### Впечатления
 
 
### Как эта книга меня изменила
 
 
### Топ 3 цитат из книги
 
 
### Highlights
{% for annotation in annotations -%}
>[!Quote|{{ annotation.color or annotation.colorCategory }}]+ Цитата
>{%- if annotation.annotatedText -%}*« {{annotation.annotatedText}} »* ([Page {{annotation.page}}](zotero://open-pdf/library/items/{{annotation.attachment.itemKey}}?page={{annotation.page}}&annotation={{annotation.id}})){% endif %}{% if annotation.imageRelativePath %}![[{{annotation.imageRelativePath}}]][View on page {{annotation.page}}](zotero://open-pdf/library/items/{{annotation.attachment.itemKey}}?page={{annotation.page}}){% endif %}{% if annotation.comment %}
>
>{{annotation.comment}}{%- endif %}
 
{% endfor %}
 