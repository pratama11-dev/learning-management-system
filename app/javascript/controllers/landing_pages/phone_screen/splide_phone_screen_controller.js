import { Controller } from 'stimulus';

export default class extends Controller {
  initialize(){
    this.dataId = $(this.element).data('id')
  } 

  connect(){
    var splide = new Splide( `.splide.js-dataId-${this.dataId}-phone`, {
      perPage: 1,
      rewind : true,
      pagination: false,
      padding : 10,
      arrow: false,
    } );

    splide.mount();
  }
}
