import { Controller } from 'stimulus';

export default class extends Controller {
  initialize(){
    var el = document.querySelector(`textarea[name='${this.element.name}']`);
    
    if(this.element.nextElementSibling){
      this.element.nextElementSibling.remove()
    }
    
    $(el).summernote({
      height: 400
    });

    $('.dropdown-toggle').dropdown()
  }
}
