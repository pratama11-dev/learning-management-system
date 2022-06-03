import { Controller } from 'stimulus';

export default class extends Controller {
  connect(){
    $(this.element).datetimepicker({      
      todayHighlight: true,
      autoclose: true,
      use24hours: false,
      locale: 'id'
    });
  }
}
