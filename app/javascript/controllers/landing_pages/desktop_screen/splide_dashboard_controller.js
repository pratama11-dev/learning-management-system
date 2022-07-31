import { Controller } from 'stimulus';

export default class extends Controller {
  initialize(){
    this.dataId = $(this.element).data('id')
  }

  connect(){
    var splide = new Splide( `.splide.js-dataId-${this.dataId}`, {
      perPage: 3,
      rewind : true,
      pagination: false,
      gap: 10,
      breakpoints: {
        425: {
          perPage: 1,
        },
        1024:{
          perPage: 2,
        },
        1440:{
          perPage: 3,
        },
        2560: {
          perPage: 4,
        },
      }
    });
    splide.mount();
  }
}
