import { Controller } from 'stimulus';

export default class extends Controller {
  connect(){
    document.onkeydown = function(e) {
      if(e.keyCode == 123) {
        return false;
      }
      if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)){
        return false;
      }
      if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)){
        return false;
      }
      if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)){
        return false;
      }
      if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)){
        return false;
      } 
      if(e.ctrlKey && e.keyCode == 80){
        return false;
      }
      if(e.ctrlKey && e.keyCode == 83){
        return false;
      }
    };

    $("html").on("contextmenu",function(){
      return false;
    });

    var jsActive = document.querySelector(".js-active")
    var url = ""
    
    if(jsActive){
      url = jsActive.dataset.url
    }

    if(url){
      $.ajax({
        url: url,
        type: 'GET',
        success: function(data) {
          var file = document.body.querySelector(".card-body")
          file.insertAdjacentHTML( 'beforeend', data );
        },
        error: function(e) {
          alert("Document Failed to load.")
          console.log(e)
        }
      });
    }
  }
}
