import { Controller } from 'stimulus';

export default class extends Controller {
  connect(){
    $(this.element).on('keypress',function(e){
      var keyCode = e.keyCode || e.which;
      if (keyCode != 8 && keyCode != 0 && keyCode < 48 || keyCode > 57) {
        e.preventDefault();
        return false;
      }
    })
  }
}
