import {Component} from "@angular/core";
import {ApiService} from "../../services/api.service";
import {Observable} from "rxjs";

@Component({
  selector: 'weather',
  templateUrl: 'weather.component.html',
  styleUrls: ['weather.component.css'],
  providers: [ApiService]
})
export class WeatherComponent {
  api: ApiService;
  today: number = Date.now();
  darkSkyReady: boolean = false;
  temperature: number;
  forecast: string;
  iconType: string;

  constructor(api: ApiService) {
    this.api = api;
    this.getWeather();
    this.startPolling();
  }

  getWeather() {
    this.api.getWeather().subscribe(data => {
      this.iconType = data.iconType;
      this.temperature = data.temperature;
      this.forecast = data.forecast;
      this.darkSkyReady = true;
    });
  }

  startPolling() {
    Observable.interval(1800000).mergeMap(() => this.api.getWeather())
      .subscribe(data => {
        this.iconType = data.iconType;
        this.temperature = data.temperature;
        this.forecast = data.forecast;
        this.darkSkyReady = true;
      });
    Observable.interval(1000).subscribe(() => {
      this.today = Date.now();
    });
  }
}
