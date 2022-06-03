import { Controller } from 'stimulus';
import dragula  from 'dragula/dragula.js';

export default class extends Controller {
  initialize(){
    this.drake = dragula([document.querySelector('tbody')]);
    this.drake.on('drop', this.onDrop.bind(this));
    this.url = this.element.dataset.url;
  }

  onDrop(el, target, source, sibling){
    var arr_sortabel = []
    source.querySelectorAll("#id").forEach(function(e) {
      arr_sortabel.push(e.dataset.id)
    })
    
    let data = {
      ids: arr_sortabel
    }

    window.Ajax.post(this.url, this.ajaxOptions(data));
  }

  handleSuccess(response){    
    let nextVideo = document.querySelector('.js-next-video');
    window.location.href = nextVideo.href;
  }

  handleFail(response){
    console.log(response)
  }

  handleDone(responseText){
    window.KTApp.unblockPage();
  }

  ajaxOptions(data){
    return {
      data: JSON.stringify(data),
      headers: [
        {
          key: 'X-CSRF-Token',
          value: window.Util.getCsrfToken()
        },
        {
          key: 'Content-Type',
          value: 'application/json'
        }
      ],
      onSuccess: this.handleSuccess.bind(this),
      onFail: this.handleFail.bind(this),
      onDone: this.handleDone.bind(this)
    }
  }
}
