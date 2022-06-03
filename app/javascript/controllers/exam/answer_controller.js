import { Controller } from 'stimulus';

export default class extends Controller {
  initialize(){
    this.quizElement = document.querySelector("div[data-controller='exam--quiz']");
    this.number = this.element.dataset.number;
    this.url = this.element.dataset.url;
    this.element.querySelectorAll('input').forEach(input => {
      input.addEventListener('change', this.handleChange.bind(this));
    });
  }

  handleChange(e){
    const data = {
      question_id: this.element.dataset.questionId,
      answer_id: e.currentTarget.value,
      no: this.number
    }

    this.performRequest(data);
  }

  performRequest(data){  
    window.KTApp.block(this.element.parentElement, {});
    window.Ajax.post(this.url, this.ajaxOptions(data));
  }

  handleSuccess(response){
    const tmp = document.createElement("div");
    tmp.innerHTML = response
    this.quizElement.innerHTML = tmp.innerHTML
  }

  handleFail(response){
    console.log(response)
  }

  handleDone(responseText){
    window.KTApp.unblock(this.element.parentElement, {});
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