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
        title: 'Nama',
        width: 100,
        template: function(data) {
          return `<span class="font-weight-bolder">${data.name}</span>`;
        }
      },
      {
        field: 'description',
        title: 'Email',
        template: function(data) {
          return `<span class="font-weight-bolder">${data.email}</span>`;
        }
      },
      {
        field: 'created_at',
        title: 'Tanggal Dibuat',
        template: function(data) {
          return `<span class="font-weight-bolder">${data.created_at}</span>`;
        }
      },
      {
        field: 'subscription',
        title: 'Subscription',
        width: 100,
        template: function(data) {
          return `<span class="font-weight-bolder">${data.subscription}</span>`;
        }
      },
      {
        field: 'Actions',
        title: 'Actions',
        sortable: false,
        width: 120,
        overflow: 'visible',
        autoHide: false,
        template: function(data) {
          return `
            <a href="${data.show_path}" class="btn btn-sm btn-clean btn-icon" title="Show">
              <i class="la la-eye text-primary"></i>
            </a>

          `;
        },
      }
    ]
  }
}
