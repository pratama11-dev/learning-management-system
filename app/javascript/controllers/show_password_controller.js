import { Controller } from 'stimulus';

export default class extends Controller {
  connect(){
    this.iconEye = this.element
    this.inputPassword = this.element.parentElement.querySelector("input[type='password']")

    this.bindEyeIcon();
  }


  bindEyeIcon(){
    this.iconEye.addEventListener('click', this.handleShowPassword.bind(this));
  }

  handleShowPassword(){
    if(this.inputPassword.type == "password"){
      window.Util.showPassword(this.inputPassword)
    }
    setTimeout(function(){ 
      if(this.inputPassword.type == "text"){
        window.Util.showPassword(this.inputPassword) 
      }
    }.bind(this), 1000);
  }
}