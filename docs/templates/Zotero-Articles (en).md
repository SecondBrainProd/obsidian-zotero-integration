> [!info]+ Metadata
> 
> **Title**:: {{title}}
> 
> **Author**:: {{authors}}; {{directors}}
> **Year**:: {{date | format ("YYYY")}}
> **Item Type**:: {{itemType}}
>
> **Citekey**:: {{citationKey}}
> **Tags**:: {% if hashTags %}{{hashTags}} {% endif %}#source/zotero
> **Keywords**:: {{allTags}}
> **Related**:: {{related}}
>
> **Journal**:: {{publicationTitle}}
> **Issue**:: {{issue}}
> **Volume**:: {{volume}}
>
> *Read start*::
> *Read end*::
> 
> **URL**:: {{url}}
> **DOI**:: {{DOI}}
 
> [!link]+ Zotero Link
> 
> {{pdfZoteroLink}}
 
> [!abstract]+
> 
> {{abstractNote}}
 
 
## Key Takeaways & Evergreens
 
 
### Highlights
{% for annotation in annotations -%}
>[!Quote|{{ annotation.color or annotation.colorCategory }}]+
>{%- if annotation.annotatedText -%}*« {{annotation.annotatedText}} »* ([Page {{annotation.page}}](zotero://open-pdf/library/items/{{annotation.attachment.itemKey}}?page={{annotation.page}}&annotation={{annotation.id}})){% endif %}{% if annotation.imageRelativePath %}![[{{annotation.imageRelativePath}}]][View on page {{annotation.page}}](zotero://open-pdf/library/items/{{annotation.attachment.itemKey}}?page={{annotation.page}}){% endif %}{% if annotation.comment %}
>
>{{annotation.comment}}{%- endif %}
 
{% endfor %}
 