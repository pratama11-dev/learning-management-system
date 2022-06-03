import { Controller } from 'stimulus';

export default class extends Controller {
  initialize(){
    this.element.addEventListener('click', this.handleClickToggle.bind(this));
  }

  handleClickToggle(){
    this.inputSearch = document.getElementById("kt_datatable_search_query")
    var search_value = this.inputSearch.value;

    var queryParams = new URLSearchParams(window.location.search);
    queryParams.set("search", search_value);
    location.search = queryParams.toString();
    location.reload()
  }
}
