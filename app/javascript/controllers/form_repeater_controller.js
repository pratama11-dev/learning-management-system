import { Controller } from 'stimulus';

export default class extends Controller {
  initialize(){
    this.dataId = $(this.element).data('id')
  }

  connect(){
    $(this.element).repeater({
      initEmpty: false,
      defaultValues: {
          'text-input': 'foo'
      },
      show: function (x) {
        $(this).find('select').prop('id', window.Util.uuidv4());
        $(this).slideDown();
      },
      hide: function (deleteElement) {
          $(this).slideUp(deleteElement);
      }
    });
  }
}
