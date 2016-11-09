import {Component} from "@angular/core";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'weather',
  templateUrl: 'weather.component.html',
  styleUrls: ['weather.component.css'],
  providers: [ApiService]
})
export class WeatherComponent {
  today: number = Date.now();
  darkSkyReady: boolean = false;
  temperature: number;
  forecast: string;
  iconType: string;

  constructor(api: ApiService) {
    api.getWeather().subscribe(data => {
      this.iconType = data.iconType;
      this.temperature = data.temperature;
      this.forecast = data.forecast;
      this.darkSkyReady = true;
    });
  }
}
