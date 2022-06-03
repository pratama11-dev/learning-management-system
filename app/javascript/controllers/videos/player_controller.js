import { Controller } from "stimulus"
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import 'videojs-contrib-quality-levels'
import 'videojs-hls-quality-selector'
import 'videojs-thumbnail-sprite'

export default class extends Controller {
  connect() {}
  initialize() {
    this.playerTarget = this.element.querySelector("video")

    var videoPlayer = videojs(this.playerTarget, {
      controls: true,
      fluid: true,
      userActions: {
        doubleClick: false
      }
    })

    const controlBar = videoPlayer.getChild('ControlBar');
    const buttonNextVideo = new NextVideoButton(videoPlayer);
    const buttonTimestamp = new ButtonTimestamp(videoPlayer);
    const buttonShowModule = new ShowModuleButton(videoPlayer);
    const buttonFastForward = new fastForward(videoPlayer);
    const buttonFastBackward = new fastBackward(videoPlayer);

    controlBar.progressControl.disable()
    const jsTimestamp = document.querySelector('.js-url-timestamp');
    const isControlsEnable = jsTimestamp.dataset.controls;
    const isVideoTalks = jsTimestamp.dataset.isVideoTalks;

    if(isControlsEnable == "true"){
      controlBar.progressControl.enable()

      controlBar.addChild(buttonNextVideo, {
        name: 'Next Video'
      }, 1);

      controlBar.addChild(buttonTimestamp, {
        text: 'Timestamp'
      }, 1);

      controlBar.addChild(buttonFastForward, {
        text: 'Fast Forward'
      }, 2);

      controlBar.addChild(buttonFastBackward, {
        text: 'Fast Backward'
      }, 2);
    }

    if (isVideoTalks == "false"){
      controlBar.addChild(buttonShowModule, {
        text: 'Lihat Module'
      }, 1);
    }

    this.setCustomVideoPlayer(videoPlayer);
    this.setThumbnails(videoPlayer);

    if(document.querySelector('.js-url-timestamp')){
      this.setTimeUpdate(videoPlayer);
    }

    if (this.element.dataset.fullscreen == "true"){
      videoPlayer.enterFullWindow();
    }

    if (this.element.dataset.autoplay == "true"){
      $('.vjs-play-control').click();
    }
  
    if (this.element.dataset.onhover == 'true'){
      videoPlayer.bigPlayButton.hide();      
      videoPlayer.controlBar.hide();
      videoPlayer.muted(true); 
      this.element.addEventListener('mouseenter', function() {
        videoPlayer.play();
      }.bind(videoPlayer));

      this.element.addEventListener('mouseleave', function() {
        videoPlayer.pause();
      }.bind(videoPlayer));
      videoPlayer.pause();
    }
  }

  disconnect() {}

  setCustomVideoPlayer(videoPlayer){
    videoPlayer.hlsQualitySelector({ displayCurrentQuality: true})
  }

  setThumbnails(videoPlayer){
    if (this.element.dataset.thumbnails){
      this.thumbnails = JSON.parse(this.element.dataset.thumbnails)

      videoPlayer.thumbnailSprite({
        sprites: this.thumbnails,
      });
    }
  }

  setTimeUpdate(videoPlayer){
    videoPlayer.on('timeupdate', function() {
      const jsTimestamp = document.querySelector('.js-url-timestamp');
      const timestamp = this.currentTime().toFixed(0);
      const url = jsTimestamp.dataset.url
      const time = jsTimestamp.dataset.time
      const max_timestamp = this.duration().toFixed(0);
      const isUpdateTimestamp = jsTimestamp.dataset.isUpdateTimestamp
      const watchVideoId = jsTimestamp.dataset.watchVideoId
      const isTrue = (
        (max_timestamp != "NaN") &&
        (isUpdateTimestamp == "true") &&
        (timestamp.includes('0') || timestamp.includes('5')) &&
        (parseInt(timestamp) > parseInt(time))
      )

      if((max_timestamp != "NaN") && isUpdateTimestamp == 'false'){
        localStorage['video_' + watchVideoId] = parseInt(timestamp) * 100 / parseInt(max_timestamp)
      }

      if (isTrue){
        jsTimestamp.dataset.time = timestamp
        $('.vjs-play-control').click();

        window.Ajax.get(url, {
          headers: [
            {
              key: 'timestamp',
              value: timestamp
            },
            {
              key: 'duration',
              value: max_timestamp
            },
            {
              key: 'Content-Type',
              value: 'application/json'
            }
          ],
          onSuccess: function(response){
            console.log(response)
            $('.vjs-play-control').click();
          },
          onFail: function(response){
            console.log(response)
            $('.vjs-play-control').click();
          }
        });
      }
    });
  }
}

class NextVideoButton extends videojs.getComponent('Button') {
  constructor(player, options = {}) {
    super(player, options);
    this.addClass('flaticon2-fast-next');
  }

  handleClick(_e) {
    let nextVideoButton = document.querySelector(".js-next-video");
    nextVideoButton.click();
  }
}

class ShowModuleButton extends videojs.getComponent('Button') {
  constructor(player, options = {}) {
    super(player, options);
    this.addClass('text__video');
    this.addClass('tooltiptext');
  }

  handleClick(_e) {
    console.log("Show Module")
    location.href = "/libraries"
  }
}

class ButtonTimestamp extends videojs.getComponent('Button') {
  constructor(player, options = {}) {
    super(player, options);
    this.addClass('flaticon2-rectangular');
  }

  handleClick(_e) {
    console.log("timestamp")
    const modalTimestamp = new ModalTimestamp(this.player_,
      {
        temporary: false,
        description:'description',
        label:"test",
        closeable:true
    });

    this.player_.addChild(modalTimestamp);

    modalTimestamp.on('modalopen', function() {
      modalTimestamp.contentEl().innerHTML = document.querySelector("#modal-timestamp").innerHTML;
    });

    modalTimestamp.on('modalclose', function() {
      this.player_.removeChild(modalTimestamp);
    });

    modalTimestamp.open();

    let timeStamps = document.querySelectorAll(".js-timestamp");
    timeStamps.forEach(
      function(row){
        row.addEventListener('click',
          function(tm){
            let curr_time = parseInt(window.Util.covertTime(tm.currentTarget.text))

            this.player_.currentTime(curr_time);
            this.player_.pause();
          }.bind(this.player_)
        );
      }.bind(this.player_)
    )
  }
}

class ModalTimestamp extends videojs.getComponent('ModalDialog'){
  constructor(player, options = {}) {
    super(player, options);
  }
}

class fastForward extends videojs.getComponent('Button') {
  constructor(player, options = {}) {
    super(player, options);
    this.addClass('fas');
    this.addClass('fa-step-forward');
  }

  handleClick(_e) {
    this.player_.currentTime(this.player_.currentTime() + 10);
  }
}

class fastBackward extends videojs.getComponent('Button') {
  constructor(player, options = {}) {
    super(player, options);
    this.addClass('fas');
    this.addClass('fa-step-backward');
  }

  handleClick(_e) {
    this.player_.currentTime(this.player_.currentTime() - 10);
  }
}
