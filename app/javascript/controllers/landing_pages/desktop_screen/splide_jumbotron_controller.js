import { Controller } from 'stimulus';

export default class extends Controller {
  initialize(){
    this.dataId = $(this.element).data('id')
  }

  connect(){
    var splide = new Splide( `.splide.js-dataId-${this.dataId}-jumbotron`, {
      perPage: 1,
      rewind : true,
      pagination: true,
      autoplay: true,
      arrows: true,
    } );

    splide.mount();
  }
}
