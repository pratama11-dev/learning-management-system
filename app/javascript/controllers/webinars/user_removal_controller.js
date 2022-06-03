
import { Controller } from 'stimulus';

export default class extends Controller {
  initialize(){
    this.path = this.data.get('path')
    this.webinarTitle = this.data.get('webinarTitle')
  }

  handleClick(e){
    e.preventDefault()
    window.KTApp.blockPage();
    window.Ajax.delete(this.path,{
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
    let parsedResponse = JSON.parse(responseText);
    let replaceElement = document.querySelector(".js-webinar-join-button")
    let quotaElement = document.querySelector(".js-remaining-webinar-quota")
    let participantElement = document.querySelector(".js-webinar-participants")

    replaceElement.innerHTML = parsedResponse.button_html
    quotaElement.innerText = parsedResponse.remaining_quota
    participantElement.innerHTML = parsedResponse.participant_html
    this.handleModal()
    Flash.show("danger", "Anda telah membatalkan mengikuti webinar: " + this.webinarTitle)
  }

  handleFail(responseText){
    console.log('[ERROR]USER_WEBINAR#DESTROY]', responseText);
  }

  handleDone(responseText){
    window.KTApp.unblockPage();
  }

  handleModal(){
    $(".modal-backdrop")[0].classList.remove('show')
    $(".modal-backdrop").remove()
  }
}
