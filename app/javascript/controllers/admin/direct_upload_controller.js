import { Controller } from 'stimulus';

export default class extends Controller {  
  connect(){
    this.inputUpload = this.element.querySelector(".js-input-file");
    this.inputUpload.addEventListener('change', this.handleUpload.bind(this));    
  }

  handleUpload(){
    
    this.element.submit()
  }
}
