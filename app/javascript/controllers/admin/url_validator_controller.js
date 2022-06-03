import { Controller } from 'stimulus';

export default class extends Controller {
  connect(){
    $(this.element).on('change', this.handleValidator.bind(this));
  }

  handleValidator(){
    let url = this.element.value
    let regexTest = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
    if (regexTest.test(url) == false) {
      $(this.element)[0].classList.add('is-invalid')
    } else {
      $(this.element)[0].classList.remove('is-invalid')
    };
  }
}
