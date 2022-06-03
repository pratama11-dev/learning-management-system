import { Controller } from 'stimulus';

export default class extends Controller {
  connect(){
    this.isCorrect = this.element.dataset.isCorrect;
    this.url = this.element.dataset.url;
    this.score = this.element.dataset.score;

    if(this.isCorrect == "true"){
      this.element.addEventListener('click', this.alertFinish.bind(this));
    }else{
      this.element.addEventListener('click', this.alert.bind(this));
    }
  }

  rating(e){
    Swal.fire({
      title: 'Beri Kami Rating !',
      text: 'Terima kasih telah menyelesaikan kursus. Beri rating dan beritahu kami jika kamu memiliki saran atau pengalaman kursus kami',
      background: '#242424',
      html: `
        <p class="text-white m-0">Terima kasih telah menyelesaikan kursus. Beri rating dan beritahu kami jika kamu memiliki saran atau pengalaman kursus kami</p>
        <div class="star-rating">
          <div class="thanks-msg">Thanks for your feedback !!!</div>
          <div class="star-input">
              <input type="radio" name="rating" id="rating-5" value="5">
              <label for="rating-5" class="fas fa-star"></label>
              <input type="radio" name="rating" id="rating-4" value="4">
              <label for="rating-4" class="fas fa-star"></label>
              <input type="radio" name="rating" id="rating-3" value="3">
              <label for="rating-3" class="fas fa-star"></label>
              <input type="radio" name="rating" id="rating-2" value="2">
              <label for="rating-2" class="fas fa-star"></label>
              <input type="radio" name="rating" id="rating-1" value="1" required=true>
              <label for="rating-1" class="fas fa-star"></label>
          </div>
        </div>
        <textarea id="comment" placeholder="Berikan Rating" class="form-control bg-transparent text-white" rows="5" required=true></textarea>
      `,
      confirmButtonText: 'Send',
      confirmButtonColor: '#EE6123',
    }).then(this.submitRating.bind(this));
  }

  result(e){    
  }

  alertFinish(e){
    Swal.fire({
      icon: 'success',
      title: 'Selamat!',
      text: 'Terima kasih, Kamu telah menyelesaikan Trivia/Quiz',
      background: '#242424',
      html: `
        <p class="text-white m-0 pb-2">Terima kasih, Kamu telah menyelesaikan Trivia/Quiz</p>        
      `,
      confirmButtonText: 'Selesai',
      confirmButtonColor: '#EE6123',
    }).then(this.rating.bind(this));
  }

  alert(e){
    Swal.fire({
      icon: 'error',
      title: 'Gagal',
      html: `
          <p class="text-white m-0 pb-2">Nilai anda : <b>${this.score}</b></p>
          <br>
          <p> Nilai Minimal adalah <b>80</b></p>
          <p> silakan cek kembali soal dan jawaban anda.</p>
        `
    })
  }

  alertReview(e){
    Swal.fire({
      icon: 'error',
      title: 'Gagal',
      text: 'Kamu harus memberikan rating dan komentar untuk melanjutkan'
    })
  }  

  submitRating(){
    this.checkedScoreElement = document.querySelector("input:checked[name=rating]");
    this.commentElement = document.getElementById("comment");
    
    if(this.checkedScoreElement) {
      this.checkedScore = this.checkedScoreElement.value;
    }

    if(this.commentElement) {
      this.comment = this.commentElement.value;
    }

    if (this.checkedScore && this.comment){
      const dataReview = {
        score: this.checkedScore,
        comment: this.comment
      }    
      window.Ajax.post(this.url, this.ajaxOptions(dataReview));
    }else{
      this.alertReview();      
    }
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

  ajaxOptions(dataReview){
    return {
      data: JSON.stringify(dataReview),
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
