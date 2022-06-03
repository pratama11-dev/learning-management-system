import { Controller } from 'stimulus';

export default class extends Controller {
  initialize(){
    this.modal = this.element
    this.isLogin = this.element.dataset.isLogin
    const urlParams = new URLSearchParams(window.location.search);
    const params = []
    const entries = urlParams.entries();
    for(const entry of entries) {
      params.push(`${entry[0]}: ${entry[1]}`)
    }

    if((this.isLogin == "false") && (params.length <= 1)){
      $(this.modal).modal('show');
    }
  }
}
