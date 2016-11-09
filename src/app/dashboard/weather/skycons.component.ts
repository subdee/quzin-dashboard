import {Component, Input} from "@angular/core";

declare var Skycons: any;

@Component({
  selector: 'skycons',
  templateUrl: 'skycons.component.html'
})
export class SkyconsComponent {
  @Input() type: string;

  ngAfterViewInit() {
    var skycons = new Skycons({'color': '#3B3738'});
    skycons.add('weather-icon', this.type);
    skycons.play();
  }
}
