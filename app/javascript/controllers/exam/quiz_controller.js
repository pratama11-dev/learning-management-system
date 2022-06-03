import { Controller } from 'stimulus';

export default class extends Controller {
  initialize(){
    this.url = this.data.get('url');
    this.requestQuiz();
    this.preventLeavePage();
  }

  show_question(e){
    this.url = e.currentTarget.dataset.url
    this.requestQuiz();
  }

  requestQuiz(e){  
    window.Ajax.get(this.url, this.ajaxOptions());
  }

  handleSuccess(response){
    const tmp = document.createElement("div");
    tmp.innerHTML = response
    this.element.innerHTML = tmp.innerHTML
  }

  handleFail(response){
    console.log(response)
    alert(response)
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
      onFail: this.handleFail.bind(this)
    }
  }

  preventLeavePage(){
    if (this.url.includes("disabled")) {
      return false
    }

    window.addEventListener('beforeunload', (event) => {
      event.preventDefault();
      alert('Selesaikan ujian terlebih dahulu.');
      return false;
    });
    
    window.addEventListener("turbolinks:before-visit", (event) => {
      event.preventDefault();
      alert('Selesaikan Trivial/Ujian terlebih dahulu.');
      return false;
    })
  }
}