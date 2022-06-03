import { Controller } from 'stimulus';

export default class extends Controller {
  initialize(){
    this.url = this.element.dataset.url
    this.requestPage();
  }

  requestPage(e){
    window.KTApp.block(this.element, {});  
    window.Ajax.get(this.url, this.ajaxOptions());
  }

  handleSuccess(response){
    const tmp = document.createElement("div");
    tmp.innerHTML = response
    this.element.innerHTML = tmp.innerHTML
  }

  handleFail(response){
    console.log(response)
  }

  handleDone(responseText){
    window.KTApp.unblock(this.element, {});  
  }
  
  ajaxOptions(){
    return {
      headers: [
        {
          key: 'Content-Type',
          value: 'application/html'
        }
      ],
      onSuccess: this.handleSuccess.bind(this),
      onFail: this.handleFail.bind(this),
      onDone: this.handleDone.bind(this)
    }
  }
}