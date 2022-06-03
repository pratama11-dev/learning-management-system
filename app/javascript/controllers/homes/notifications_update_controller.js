
import { Controller } from 'stimulus';

export default class extends Controller {
  initialize(){
    this.path = this.element.dataset.path  
    this.element.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick(e){
    e.preventDefault()
    window.KTApp.block(this.element, {});  
    window.Ajax.post(this.path,{
      onSuccess: this.handleSuccess.bind(this),
      onFail: this.handleFail.bind(this),
      onDone: this.handleDone.bind(this),
      headers:[
        {
          key: 'X-CSRF-Token',
          value: window.Util.getCsrfToken()
        },
        {
          key: 'Content-Type',
          value: 'application/json'
        }
      ]
    })
  }

  handleSuccess(responseText){
    let labelDot = this.element.querySelector(".label-dot")
    if(labelDot){
      labelDot.remove();
    }
  }

  handleFail(responseText){
    console.log('[ERROR]USER_WEBINAR#CREATE]', responseText);
  }

  handleDone(responseText){
    window.KTApp.unblock(this.element, {});  
  }
}
