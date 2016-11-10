import {PipeTransform, Pipe} from "@angular/core";
import * as moment from 'moment';

@Pipe({name: 'timeAgo'})
export class TimeAgoPipe implements PipeTransform {
  constructor() {
  }

  transform(time) {
    return moment.unix(time).fromNow();
  }
}
