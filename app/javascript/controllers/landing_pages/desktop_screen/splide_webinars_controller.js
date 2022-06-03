import { Controller } from 'stimulus';

export default class extends Controller {
  initialize(){
    this.dataId = $(this.element).data('id')
  }

  connect(){
    var splide = new Splide( `.splide.js-dataId-${this.dataId}-webinars`, {
      perPage: 3,
      rewind : true,
      pagination: false,
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
          perPage: 4,
        },
      }
    } );

    splide.mount();
  }
}
