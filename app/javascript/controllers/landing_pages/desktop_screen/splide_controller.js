import { Controller } from 'stimulus';

export default class extends Controller {
  initialize(){
    this.dataId = $(this.element).data('id')
  }

  connect(){
    var splide = new Splide( `.splide.js-dataId-${this.dataId}`, {
      perPage: 4,
      rewind : true,
      pagination: false,
      gap: 10,
      breakpoints: {
        425: {
          perPage: 1,
        },
        768: {
          perPage: 2,
        },
        1024:{
          perPage: 3,
        },
        1440:{
          perPage: 4,
        },
        2560: {
          perPage: 5,
        },
      }
    } );

    splide.mount();
  }
}
