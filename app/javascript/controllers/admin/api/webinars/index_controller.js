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
        field: 'title',
        title: 'Title',
        width: 500,
        template: function(data) {
          return `<span class="font-weight-bolder">${data.title}</span>`;
        }
      },
      {
        field: 'description',
        title: 'Deskripsi',        
        template: function(data) {
          return `<span class="font-weight-bolder">${data.description}</span>`;
        }
      },
      {
        field: 'speaker',
        title: 'Pembicara',
        template: function(data) {
          return `
          <span class="font-weight-bolder">${data.speaker}</span>
          `;
        }
      },
      {
        field: 'date',
        title: 'Tanggal Webinar',
        template: function(data) {
          return `<span class="font-weight-bolder">${data.date}</span>`;
        }
      },
      {
        field: 'capacity',
        title: 'Peserta/Kuota',
        template: function(data) {
          return `
          <span class="font-weight-bolder">${data.quota_reached}/${data.capacity}</span>
          `;
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
            <a class="btn btn-sm btn-clean btn-icon" data-toggle="modal" data-target="#editWebinar-${data.id}" title="Ubah">
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
