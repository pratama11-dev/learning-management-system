import { Controller } from 'stimulus';

export default class extends Controller {
  connect(){
    this.isCorrect = this.element.dataset.isCorrect;
    this.url = this.element.dataset.url;
    this.element.addEventListener('click', this.confirmation.bind(this));
  }

  confirmation(){    
    Swal.fire({
      title: 'Konfirmasi',
      icon: 'info',
      text: 'apakah anda yakin menyelsaikan ujian?',
      background: '#242424',
      showCancelButton: true,
      confirmButtonText: 'Ya, Saya Yakin',
      confirmButtonColor: '#EE6123',
      cancelButtonText: 'Tidak, Batalkan',
      cancelButtonColor: '#EE6123',
    }).then(
      this.rating.bind(this)
    );    
  }
  
  rating(e){
    if(e.isConfirmed && location.href.includes("review")){
      let url = new URL(location.href)
      let new_url = url.pathname.split('/')[2]
      location.href = `/?curriculum_id=${new_url}`
    }else if(e.isConfirmed){
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
                <input type="radio" name="rating" id="rating-1" value="1">
                <label for="rating-1" class="fas fa-star"></label>
            </div>
          </div>
          <textarea id='comment' placeholder="Berikan Rating" class="form-control bg-transparent text-white" rows="5"></textarea>
        `,
        confirmButtonText: 'Send',
        confirmButtonColor: '#EE6123',
      }).then(this.submitRating.bind(this));
    }
  }

  result(e){
    Swal.fire({
      title: 'Selamat!',
      text: 'Terima kasih, Kamu telah menyelesaikan Trivia/Quiz dengan score:',
      background: '#242424',
      html: `
        <p class="text-white m-0 pb-2">Kamu telah menyelesaikan Materi Ujian dengan skor:</p>
        <div class="symbol symbol-circle mx-auto">
          <span class="symbol-label font-size-h5">${this.score}</span>
          </span>
        </div>
      `,
      confirmButtonText: 'Selesai',
      confirmButtonColor: '#EE6123',
    })
  }

  submitRating(){
    this.checkedScore = document.querySelector("input:checked[name=rating]").value;
    this.comment = document.getElementById("comment").value;

    const dataReview = {
      score: this.checkedScore,
      comment: this.comment
    }
    window.Ajax.post(this.url, this.ajaxOptions(dataReview));
  }

  handleSuccess(response){    
    let parseRespose = JSON.parse(response)
    this.score = parseRespose.score
    this.result();
    
    setTimeout(() => {
      window.location.reload();
    }, 2000);
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
