import { Controller } from 'stimulus';

export default class extends Controller {
  initialize(){
    this.dataId = $(this.element).data('id')
  }

  connect(){
    var splide = new Splide( `.splide.js-dataId-${this.dataId}-small`, {
      perPage: 4,
      rewind : true,
      pagination: false,
      gap: 20,
      breakpoints: {
        768:{
          perPage: 2,
        },
        1130:{
          perPage: 3,
        },
        1440:{
          perPage: 4,
        },
        2560: {
          perPage: 6,
        },
      }
    } );

    splide.mount();
  }
}
