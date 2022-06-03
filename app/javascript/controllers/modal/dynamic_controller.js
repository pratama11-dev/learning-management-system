import { Controller } from "stimulus"

export default class extends Controller {  
  connect() {}
  initialize() {
    this.url = this.element.dataset.url
    this.modalId = this.element.dataset.modalId
    this.modalDynamic = document.querySelector("#" + this.modalId)
    this.replacer = this.modalDynamic.querySelector('.js-dynamic-replacer')

    $(this.modalDynamic).on('shown.bs.modal', this.performRequest.bind(this))

    $(this.modalDynamic).on('hidden.bs.modal', this.refreshPage.bind(this));
    
    if (this.element.dataset.show == "true"){
      $(this.modalDynamic).modal('show')
    }

    if (Turbolinks.scroll){
      document.scrollingElement.scrollTo(0, Turbolinks.scroll['top']);
    }
  }

  refreshPage(){
    if($('.modal .show').length > 0){
      $('.modal').addClass('d-none');
    }

    setTimeout(function(){
      Turbolinks.scroll = {};          
      Turbolinks.scroll['top'] = document.scrollingElement.scrollTop;
      Turbolinks.visit(location.pathname);
    }, 500);
  }

  performRequest(e){  
    let url = this.url

    if (e.relatedTarget && e.relatedTarget.dataset.dynamicDataId){
      url = url.replace('default', e.relatedTarget.dataset.dynamicDataId)      
    }
    if(!url.includes("default")){
      window.KTApp.block(this.replacer, {});
      window.Ajax.get(url, this.ajaxOptions());
    }
  }

  performManualRequest(e){
    let url = this.url

    if (e.srcElement && e.srcElement.dataset.dynamicDataId){
      url = url.replace('default', e.srcElement.dataset.dynamicDataId)      
    } 
    if(!url.includes("default")){
      window.KTApp.block(this.replacer, {});
      window.Ajax.get(url, this.ajaxOptions());   
    }
  }

  handleSuccess(response){    
    let tmp = document.createElement("div");
    tmp.innerHTML = response
    this.replacer.replaceChild(tmp, this.replacer.firstElementChild);
  }

  handleFail(response){
    console.log(response)
  }

  handleDone(responseText){
    window.KTApp.unblock(this.replacer, {});
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
