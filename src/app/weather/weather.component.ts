/**
 * Created by Pierre on 14/06/2017.
 */

import {Component} from "@angular/core";
import {Http} from "@angular/http";
@Component({
  selector: "app-weather",
  templateUrl: "./weather.component.html",
  styleUrls: ["./weather.component.css"]
})
export class WeatherComponent {
  cityName: string;
  currentTemp: number;
  temp_min: number;
  temp_max: number;
  description: string;
  http: Http;
  constructor(http: Http) {
    this.http = http;
  }

getWeather() {
    this.http.get("http://api.openweathermap.org/data/2.5/weather?units=metric&q=" +
      this.cityName + "&APPID=34f32bde845f5691612c0132830c0491").subscribe((test) => {
    this.currentTemp = test.json().main.temp;
    this.cityName = test.json().name;
    this.temp_min = test.json().main.temp_min;
    this.temp_max = test.json().main.temp_max;
    this.description = test.json().weather[0].description;
    console.log(test.json().main.temp);
    console.log(test.json().main.temp_max);
    console.log(test.json().main.temp_min);
    console.log(test.json().weather[0].description);
    console.log(test.json());
    console.log("city : " + this.cityName);
    console.log(test.json().weather[0].icon);
  });
}}

