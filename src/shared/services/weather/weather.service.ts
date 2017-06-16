import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

/**
 * Created by Pierre on 14/06/2017.
 */
@Injectable()
export class WeatherServices {
  cityName: string;
  currentTemp: number;
  temp_min: number;
  temp_max: number;
  description: string;

  constructor(private http: Http) {
    this.cityName = " ";
  }

  public getWeather(city: string) {
    this.http.get("http://api.openweathermap.org/data/2.5/weather?units=metric&q=" +
      city + "&APPID=34f32bde845f5691612c0132830c0491").subscribe((test) => {
      this.currentTemp = test.json().main.temp;
      this.cityName = test.json().name;
      this.temp_min = test.json().main.temp_min;
      this.temp_max = test.json().main.temp_max;
      this.description = test.json().weather[0].description;
    });
  }

}
