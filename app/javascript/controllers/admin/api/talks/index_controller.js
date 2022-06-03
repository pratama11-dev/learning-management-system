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
        title: 'Deskripsi',
        width: 250,
        template: function(data) {
          return `<span class="font-weight-bolder">${data.description}</span>`;
        }
      },
      {
        field: 'total_feedback',
        title: 'Feedback',
        template: function(data) {
          return `
          <span class="font-weight-bolder">
            <i class="far fa-thumbs-up mr-5">
              ${data.like}
            </i>
            <i class="far fa-thumbs-down">
              ${data.dislike}
            </i>
          </span>
          `;
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
        field: 'Actions',
        title: 'Actions',
        sortable: false,
        width: 120,
        overflow: 'visible',
        autoHide: false,
        template: function(data) {
          return `            
            <a class="btn btn-sm btn-clean btn-icon" href="${data.show_path}" title="Tampilkan">
              <i class="fa fa-eye text-primary"></i>
            </a>
            <a class="btn btn-sm btn-clean btn-icon" data-toggle="modal" data-target="#editVideo-${data.id}" title="Ubah">
              <i class="fa fa-pencil-alt text-primary"></i>
            </a>
            <a href="${data.delete_path}" data-method="delete" data-confirm="Apakah anda yakin ingin menghapus akun ini?" class="btn btn-sm btn-clean btn-icon" title="Delete">
              <i class="la la-trash text-danger"></i>
            </a>
          `;
        },
      }
    ]
  }
}
