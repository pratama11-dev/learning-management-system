import { Controller } from 'stimulus';

export default class extends Controller {
  connect(){    
    this.tagElement = this.element.querySelector("input[name='webinar[tag]']")
    this.tagifyInput(this.tagElement);
    if (this.element.querySelectorAll('.tagify').length > 1) {
      this.element.querySelectorAll('.tagify')[0].remove();
    }
  }


  tagifyInput(el){
    var new_tagify = new Tagify(el, {
      delimiters: ",", // add new tags when a comma or a space character is entered
      maxTags: 10,
      blacklist: ["fuck", "shit", "pussy"],
      keepInvalidTags: true, // do not remove invalid tags (but keep them marked as invalid)
      whitelist: [],
      originalInputValueFormat: valuesArr => valuesArr.map(item => item.value).join(','),
      templates: {
        dropdownItem: function(tagData) {
          try {
            var html = '';

            html += '<div class="tagify__dropdown__item">';
            html += '   <div class="d-flex align-items-center">';
            html += '       <span class="symbol sumbol-' + (tagData.initialsState ? tagData.initialsState : '') + ' mr-2" style="background-image: url(\''+ (tagData.pic ? tagData.pic : '') + '\')">';
            html += '           <span class="symbol-label">' + (tagData.initials ? tagData.initials : '') + '</span>';
            html += '       </span>';
            html += '       <div class="d-flex flex-column">';
            html += '           <a href="#" class="text-dark-75 text-hover-primary font-weight-bold">'+ (tagData.value ? tagData.value : '') + '</a>';
            html += '           <span class="text-muted font-weight-bold">' + (tagData.email ? tagData.email : '') + '</span>';
            html += '       </div>';
            html += '   </div>';
            html += '</div>';

            return html;
          } catch (err) {}
        }
      },
      transformTag: function(tagData) {
        tagData.class = 'tagify__tag tagify__tag--primary';
      },
      dropdown: {
        classname: "color-blue",
        enabled: 1,
        maxItems: 5
      }
    });
  }
}