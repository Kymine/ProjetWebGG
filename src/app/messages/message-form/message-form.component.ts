import {Component, OnInit} from "@angular/core";

import {MessageService} from "../../../shared/services";
import {MessageModel} from "../../../shared/models/MessageModel";
import {ChannelService} from "../../../shared/services/channel/channel.service";
import {USER} from "../../../shared/constants/user";
import {PrivateChannelService} from "../../../shared/services/privateChannel/privateChannel.service";
import {PrivateMessageServices} from "../../../shared/services/privateMessage/privateMessage.service";
import {PrivateMessageModel} from "../../../shared/models/PrivateMessageModel";
import {LoginService} from "../../../shared/services/login/login.service";
import {WeatherServices} from "../../../shared/services/weather/weather.service";

@Component({
  selector: "app-message-form",
  templateUrl: "./message-form.component.html",
  styleUrls: ["./message-form.component.css"]
})
export class MessageFormComponent implements OnInit {

  public message: MessageModel;
  private route: string;
  public privatemessage: PrivateMessageModel;
  private channelType2;
  hideBol: boolean;
  buttonWeather: String;
  sendWeatherBefore: boolean;
  city: string;
  currentTemp: number;
  temp_min: number;
  temp_max: number;
  description: string;
  urlImage: string;

  constructor(private messageService: MessageService, private channelService: ChannelService,
              private privateChannelService: PrivateChannelService,
              private privateMessageService: PrivateMessageServices, private loginservice: LoginService,
              private weatherservices: WeatherServices) {
    this.message = new MessageModel(channelService.currentChannelRoute.id, "", loginservice.username);
    this.route = "" + channelService.currentChannelRoute.id + "/messages";
    this.privatemessage = new PrivateMessageModel(1, "", loginservice.username);
    this.channelType2 = this.privateChannelService.channelType;
    this.hideBol = false;
    this.buttonWeather = "Show Weather";
    this.sendWeatherBefore = false;
  }

  ngOnInit() {
  }
  replaceSmiley(contents: string) {
    let smiley = contents.replace(/\:\)/gi, "🙂");
    smiley = smiley.replace(/;\)/gi, "😉");
    smiley = smiley.replace(/:'\(/gi, "😢");
    smiley = smiley.replace(/:\(/gi, "😞");
    smiley = smiley.replace(/:D/gi, "😄");
    smiley = smiley.replace(/:p/gi, "😛");
    smiley = smiley.replace(/<3/gi, "❤");
    smiley = smiley.replace(/:o/gi, "😲");
    return smiley;
  }
  /**
   * Fonction pour envoyer un message.
   * L'envoi du message se fait à travers la methode sendMessage du service MessageService.
   * Cette méthode prend en paramètre la route pour envoyer un message (:id/messages avec id un entier correspondant à l'id du channel)
   * ainsi que le message à envoyer. Ce dernier correspond à l'objet MessageModel que l'utilisateur rempli à travers l'input.
   */
  sendMessage() {
    if (this.sendWeatherBefore) {
      this.hideBol = false;
      this.buttonWeather = "Show Weather";
    }
    this.route = "" + this.channelService.currentChannelRoute.id + "/messages";
    this.message.content = this.replaceSmiley(this.message.content);
    this.hideBol = false;
    if (this.message.content.includes("/meteo")) {
      this.weatherservices.getWeather(this.meteoCity());
      this.sendWeatherBefore = true;
    }
    this.messageService.sendMessage(this.route, this.message);
    this.message.content = "";
  }

  sendPrivateMessage() {
    this.privatemessage.content = this.replaceSmiley(this.privatemessage.content);
    this.privateMessageService.postMessage(this.privateChannelService.currentPrivateChannel, this.privatemessage);
    this.message.content = "";
  }
  hide() {
    if (this.hideBol) {
      this.hideBol = false;
      this.buttonWeather = "Show Weather";
    } else {
      this.hideBol = true;
      this.description = this.weatherservices.description;
      this.changeImage(this.description);
      this.currentTemp = this.weatherservices.currentTemp;
      this.temp_min = this.weatherservices.temp_min;
      this.temp_max = this.weatherservices.temp_max;
      this.buttonWeather = "Hide Weather";
    }
  }
    meteoCity(): string {
      return this.city = this.message.content.split((" "))[1];
    }
    changeImage(description: string) {
      const url = "http://openweathermap.org/img/w/";
      switch (description) {
        case "clear sky":
          this.urlImage = url + "01d.png";
          break;
        case "few clouds":
          this.urlImage = url + "02d.png";
          break;
        case "scattered clouds":
          this.urlImage = url + "03d.png";
          break;
        case "broken clouds":
          this.urlImage = url + "04d.png";
          break;
        case "shower rain":
          this.urlImage = url + "09d.png";
          break;
        case "rain":
          this.urlImage = url + "10d.png";
          break;
        case "thunderstorm":
          this.urlImage = url + "11d.png";
          break;
        case "snow":
          this.urlImage = url + "13d.png";
          break;
        case "mist":
          this.urlImage = url + "50d.png";
          break;
        default:
          break;
      }
    }

}
