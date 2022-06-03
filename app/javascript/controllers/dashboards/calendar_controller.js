import { Controller } from 'stimulus';
import { Calendar } from '@syncfusion/ej2-calendars';

import "@syncfusion/ej2-base/dist/ej2-base.umd.min.js";
import "@syncfusion/ej2-data/dist/ej2-data.umd.min.js";
import "@syncfusion/ej2-inputs/dist/ej2-inputs.umd.min.js";
import "@syncfusion/ej2-popups/dist/ej2-popups.umd.min.js";
import "@syncfusion/ej2-buttons/dist/ej2-buttons.umd.min.js";
import "@syncfusion/ej2-splitbuttons/dist/ej2-splitbuttons.umd.min.js";
import "@syncfusion/ej2-lists/dist/ej2-lists.umd.min.js";
import "@syncfusion/ej2-calendars/dist/ej2-calendars.umd.min.js";

export default class extends Controller {
  initialize(){
    this.userWebinars = JSON.parse(this.element.dataset.userWebinars);
    this.activeWebinars = JSON.parse(this.element.dataset.activeWebinars);
  }

  connect(){
    this.initCalendar();
  }

  initCalendar(){
    this.calendar = new Calendar({
      renderDayCell: this.customDates.bind(this),
      change: this.changeValue.bind(this),
    });

    this.calendar.appendTo('#calendar-dashboard');
  }

  changeValue(){
    this.calendar.values = this.values
  }

  customDates(args){
    let span = document.createElement('span');
    let spanActive = document.createElement('span');
    span.setAttribute('class', 'dot');
    spanActive.setAttribute('class', 'dot-active');
    
    this.userWebinars.forEach(webinar => {
      let webinarDate = (new Date(webinar['date'])).toDateString()
      let argsDate = args.date.toDateString()

      if (webinarDate == argsDate){
        args.element.appendChild(spanActive);
        args.element.setAttribute('title', `${webinar['title']}`);
        args.element.className = 'position-relative';
      }
    });

    this.activeWebinars.forEach(webinar => {
      let webinarDate = (new Date(webinar['date'])).toDateString()
      let argsDate = args.date.toDateString()

      if (webinarDate == argsDate){
        args.element.appendChild(span);
        args.element.setAttribute('title', `${webinar['title']}`);
        args.element.className = 'position-relative';
      }
    });
  }
}
