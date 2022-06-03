
import { Controller } from 'stimulus';

export default class extends Controller {
  initialize(){
    this.path = this.data.get('path')
    this.webinarId = this.data.get('webinarId')
    this.button = this.data.get('availability')
    this.wrapperClass = this.data.get('buttonWrapperClass')
    this.remainingQuota = this.data.get('remainingQuotaClass')

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
    let buttonWrapperElement = document.querySelector(this.wrapperClass)
    let remainingQuotaElement = document.querySelector(this.remainingQuota)

    remainingQuotaElement.innerText = parsedResponse.remaining_quota
    buttonWrapperElement.innerHTML = parsedResponse.homes_webinars_button_html
    this.element.disabled = true
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
