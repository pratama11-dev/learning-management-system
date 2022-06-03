import { Controller } from 'stimulus';

export default class extends Controller {
  connect(){
    const Endpoint = this.element.dataset.url;
    const Tus = Uppy.Tus;
    const XHRUpload = Uppy.XHRUpload;
    const ProgressBar = Uppy.ProgressBar;
    const StatusBar = Uppy.StatusBar;
    const FileInput = Uppy.FileInput;
    const Informer = Uppy.Informer;

    const Dashboard = Uppy.Dashboard;
    const Dropbox = Uppy.Dropbox;
    const GoogleDrive = Uppy.GoogleDrive;
    const Instagram = Uppy.Instagram;
    const Webcam = Uppy.Webcam;

    var elemId = this.element.id
    var id = '#' + elemId;
    var $statusBar = $(id + ' .uppy-status');
    var $uploadedList = $(id + ' .uppy-list');
    var timeout;

    var uppyMin = Uppy.Core({
      debug: true,
      autoProceed: true,      
      showProgressDetails: true,
      allowMultipleUploads: false,
      restrictions: {
        maxFileSize: 5000000000, // 5gb
        maxNumberOfFiles: 1,
        minNumberOfFiles: 1,
        allowedFileTypes: ["video/mp4","video/x-m4v"]
      }
    });

    uppyMin.use(FileInput, { target: id + ' .uppy-wrapper', pretty: false });
    uppyMin.use(Informer, { target: id + ' .uppy-informer'  });
 
    uppy.use(XHRUpload, {
      endpoint: Endpoint,
      timeout: 0,
      headers:{
        key: 'X-CSRF-Token',
        value: window.Util.getCsrfToken()
      }
    })

    uppyMin.use(StatusBar, {
      target: id + ' .uppy-status',
      hideUploadButton: true,
      hideAfterFinish: false
    });

    $(id + ' .uppy-FileInput-input').addClass('uppy-input-control').attr('id', elemId + '_input_control');
    $(id + ' .uppy-FileInput-container').append('<label class="uppy-input-label btn btn-light-primary btn-sm btn-bold" for="' + (elemId + '_input_control') + '">Attach files</label>');

    var $fileLabel = $(id + ' .uppy-input-label');

    uppyMin.on('upload', function(data) {
      $fileLabel.text("Uploading...");
      $statusBar.addClass('uppy-status-ongoing');
      $statusBar.removeClass('uppy-status-hidden');
      clearTimeout( timeout );
    });

    uppyMin.on('complete', function(file) {
      $.each(file.successful, function(index, value){
        var sizeLabel = "bytes";
        var filesize = value.size;
        if (filesize > 1024){
          filesize = filesize / 1024;
          sizeLabel = "kb";

          if(filesize > 1024){
            filesize = filesize / 1024;
            sizeLabel = "MB";
          }
        }
        var uploadListHtml = '<div class="uppy-list-item" data-id="'+value.id+'"><div class="uppy-list-label text-success">file succesfully saved</div><span class="uppy-list-remove" data-id="'+value.id+'"><i class="flaticon2-cancel-music"></i></span></div>';
        $uploadedList.append(uploadListHtml);
        
        // setTimeout(function(){ window.location.reload() }, 800);
      });

      if (file.successful[0]){
        new_video_id.value = file.successful[0].response.body.video.id
      }

      $fileLabel.text("Add more files");

      $statusBar.addClass('uppy-status-hidden');
      $statusBar.removeClass('uppy-status-ongoing');
    });

    $(document).on('click', id + ' .uppy-list .uppy-list-remove', function(){
      var itemId = $(this).attr('data-id');
      uppyMin.removeFile(itemId);
      $(id + ' .uppy-list-item[data-id="'+itemId+'"').remove();
    });

  }
}
