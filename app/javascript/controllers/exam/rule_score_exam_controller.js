import { Controller } from 'stimulus';

export default class extends Controller {
  connect(){
    this.element.addEventListener('click', this.rule.bind(this));
  }

  rule(e){
    e.stopImmediatePropagation();
    e.preventDefault();
    Swal.fire({
      title: 'Peraturan Ujian',
      icon: 'info',
      text: 'Peraturan Ujian',
      background: '#242424',
      html: `
        <div>
          <ul style="text-align: left;">
            <li>Ujian terdiri dari 30 soal pilihan ganda dengan durasi waktu 90 menit.</li>
            <li>Jika soal tidak diisi maka akan dianggap jawaban salah.</li>
            <li>Kesuksesan ujian ditentukan dengan minimal nilai benar sebanyak 18 soal.</li>
            <li>Jika peserta gagal dalam ujian, maka dapat melakukan remedial 1 minggu setelah mengikuti ujian terakhir</li>
          </ul>
          <form class="form" id="kt_form_1">
            <div class="form-group d-flex justify-content-center">
              <div class="d-flex flex-column">
                <div class="form-check checkbox-inline">
                  <label class="checkbox checkbox-outline text-white text-capitalize font-weight-bold">
                    <input id='ruleCheckbox' type="checkbox" name="checkbox"/>
                    <span style="border-color: #EE6123 !important;"></span>
                    Sudah Mengerti
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>
      `,
      confirmButtonText: 'Mulai Ujian',
      confirmButtonColor: '#EE6123',
    }).then(this.startExam.bind(this));
  }

  startExam(e){
    let ruleCheckbox = document.querySelector("#ruleCheckbox").checked
    if (ruleCheckbox) {
      Swal.fire(
        'Ujian Akan Dimulai',
        'Silakan tunggu beberapa saat.',
        'success'
      )

      setTimeout(function(){
        location.href = this.element.href
      }.bind(this), 2000);
    }else{
      Swal.fire(
        'Peraturan Ujian',
        'Silahkan baca peraturan ujian terlebih dahulu dan centang persetujuan.',
        'error'
      )
    }
  }
}
