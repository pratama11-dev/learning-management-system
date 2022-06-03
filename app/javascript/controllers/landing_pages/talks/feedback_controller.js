import { Controller } from 'stimulus';

export default class extends Controller {
  initialize(){
    this.path = this.data.get('path')
    this.likes = this.data.get('likes')
    this.resourceType = this.data.get('resourceType')
    this.resourceId = this.data.get('resourceId')
  }

  handleClick(e){
    e.preventDefault()
    const user_like = {
      user_likes:{
        likes: this.likes,
        resource_type: this.resourceType,
        resource_id: this.resourceId,
      }
    }
    window.KTApp.blockPage();
    window.Ajax.post(this.path,{
      data: JSON.stringify(user_like),
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
    let replaceElement = this.element.parentElement.parentElement
    replaceElement.innerHTML = parsedResponse.bookmark_and_feedback_html
    
    Flash.show("success", "Feedback berhasil ditambahkan!")
  }

  handleFail(responseText){
    console.log('[ERROR]USER_BOOKMARK#CREATE]', responseText);
  }

  handleDone(responseText){
    window.KTApp.unblockPage();
  }
}
