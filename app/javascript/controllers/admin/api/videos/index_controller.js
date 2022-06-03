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
        title: 'Name',
        width: 100,
        template: function(data) {
          return `<span class="font-weight-bolder">${data.name}</span>`;
        }
      },
      {
        field: 'description',
        title: 'Deskripsi',
        width: 200,
        template: function(data) {
          return `<span class="font-weight-bolder">${data.description}</span>`;
        }
      },
      {
        field: 'created_at',
        title: 'Tanggal Upload',
        template: function(data) {
          return `
          <span class="font-weight-bolder">${data.created_at}</span>
          `;
        }
      },
      {
        field: 'Actions',
        title: 'Actions',
        sortable: false,
        width: 150,
        overflow: 'visible',
        autoHide: false,
        template: function(data) {
          return `   
            <a class="btn btn-sm btn-clean btn-icon" href="${data.preview_path}" title="Tampilkan">
              <span class="far fa-play-circle text-primary"></span>
            </a>         
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
