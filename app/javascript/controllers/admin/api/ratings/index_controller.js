import DatatablesController from '../../../datatables_controller';

export default class extends DatatablesController {
  datatableColumns(){
    return [
      {
        field: 'index',
        title: 'No',
        sortable: false,
        width: 40,
        type: 'number',
        selector: false,
        textAlign: 'left',
        template: function(data) {
          return `<span class="font-weight-bolder">${data.index}</span>`;
        }
      },
      {
        field: 'name',
        title: 'Nama User',
        width: 100,
        template: function(data) {
          return `<span class="font-weight-bolder">${data.user}</span>`;
        }
      },
      {
        field: 'resource',
        title: 'Nama Brevet/Video Belajar Pajak',
        width: 250,
        template: function(data) {
          return `<span class="font-weight-bolder">${data.resource}</span>`;
        }
      },
      {
        field: 'resource_type',
        title: 'Tipe Rating',
        width: 250,
        template: function(data) {
          return `<span class="font-weight-bolder">${data.resource_type}</span>`;
        }
      },
      {
        field: 'rating',
        title: 'Rating',
        width: 250,
        template: function(data) {
          return `<span class="font-weight-bolder">${data.rating}</span>`;
        }
      },
      {
        field: 'comment',
        title: 'Komentar',
        width: 250,
        template: function(data) {
          return `<span class="font-weight-bolder">${data.comment}</span>`;
        }
      },
    ]
  }
}
