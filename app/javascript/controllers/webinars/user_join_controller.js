
import { Controller } from 'stimulus';

export default class extends Controller {
  initialize(){
    this.path = this.data.get('path')
    this.webinarId = this.data.get('webinarId')
    this.button = this.data.get('availability')

    if (this.button == "true") {
      this.element.disabled = false
    } else {
      this.element.disabled = true
    }
  }

  handleClick(e){
    e.preventDefault()
    const user_webinar = {
      user_webinar:{
        webinar_id: this.webinarId,
      }
    }
    window.KTApp.blockPage();
    window.Ajax.post(this.path,{
      data: JSON.stringify(user_webinar),
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
    if (parsedResponse.status == 'joined') {
      Flash.show("success", "Anda telah terdaftar, terima kasih!")
    }
    if (parsedResponse.status == 'failed') {
      Flash.show("danger", "Gagal melakukan pendaftaran: " + parsedResponse.error_message)
    }
  }

  handleFail(responseText){
    console.log('[ERROR]USER_WEBINAR#CREATE]', responseText);
  }

  handleDone(responseText){
    window.KTApp.unblockPage();
  }
}
