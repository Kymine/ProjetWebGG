import {Component, OnInit} from "@angular/core";
import {Http} from "@angular/http";

import {MessageService} from "../../../shared/services";
import {MessageModel} from "../../../shared/models/MessageModel";
import {ChannelService} from "../../../shared/services/channel/channel.service";
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
  langage: string;

  constructor(private messageService: MessageService, private channelService: ChannelService,
              private privateChannelService: PrivateChannelService,
              private privateMessageService: PrivateMessageServices, private loginservice: LoginService,
              private weatherservices: WeatherServices, private http: Http) {
    this.message = new MessageModel(channelService.currentChannelRoute.id, "", loginservice.username);
    this.route = "" + channelService.currentChannelRoute.id + "/messages";
    this.privatemessage = new PrivateMessageModel(1, "", loginservice.username);
    this.channelType2 = this.privateChannelService.channelType;
    this.hideBol = false;
    this.buttonWeather = "Show Weather";
    this.sendWeatherBefore = false;
    this.langage = "en";
  }

  ngOnInit() {
  }

  /**
   * Fonction permettant de transformer un string initialement sans émoticones
   * et de remplacer tout ses caractères representant une émoticone en une véritable émoticone.
   * @param contents string à transformer
   * @return string
   */
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
   * Fonction pour envoyer un message public.
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
      this.city = this.message.content.split((" "))[1];
      this.weatherservices.getWeather(this.city);
      this.sendWeatherBefore = true;
    }
    this.messageService.sendMessage(this.route, this.message);
    this.message.content = "";
  }
  /**
   * Fonction pour envoyer un message privée.
   * L'envoi du message se fait à travers la methode postMessage du service PrivateMessageServices.
   * Elle utilise également la fonction replaceSmiley avant d'envoyer le message
   */
  sendPrivateMessage() {
    if (this.sendWeatherBefore) {
      this.hideBol = false;
      this.buttonWeather = "Show Weather";
    }
    this.hideBol = false;
    if (this.privatemessage.content.includes("/meteo")) {
      this.city = this.privatemessage.content.split((" "))[1];
      this.weatherservices.getWeather(this.city);
      this.sendWeatherBefore = true;
    }
    this.privatemessage.content = this.replaceSmiley(this.privatemessage.content);
    this.privateMessageService.postMessage(this.privateChannelService.currentPrivateChannel, this.privatemessage);
    this.privatemessage.content = "";
  }

  /**
   * Fonction permettant d'afficher ou cacher la météo, fonction déclencher lorsque l'utilisateur appuie sur le weather-btn bouton
   */
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


  /**
   * Fonction permettant de charger l'image de la météo en fonction de la description de la météo reçu par le serveur
   * @param description : string correspondant à la description de la météo reçu par le serveur
   */
  changeImage(description: string) {
    const url = "http://openweathermap.org/img/w/";
    if (description.includes("clear sky")) {
      this.urlImage = url + "01d.png";
    }
    if (description.includes("clouds")) {
      this.urlImage = url + "02d.png";
    }
    if (description.includes("rain")) {
      this.urlImage = url + "09d.png";
    }
    if (description.includes("thunderstorm")) {
      this.urlImage = url + "11d.png";
    }
    if (description.includes("snow")) {
      this.urlImage = url + "13d.png";
    }
    if (description.includes("mist")) {
      this.urlImage = url + "50d.png";
    }
  }

  /**
   * Fonction permettant de traduire le message tapé par l'utilisateur en fonction de son choix de traduction (ou par défaut en anglais)
   * et du fait qu'il se trouve dans un channel public ou privé, en faisant une requete sur un serveur
   */
  traduction() {
    if (this.channelType2 === 0) {
      let mes;
      this.http.get("https://translate.yandex.net/api/v1.5/tr.json/translate?key=" +
        "trnsl.1.1.20170616T071450Z.f1abae67092b3435.8db3d485331a8166871f45ca5dcbcc7d5829941d" +
        "&text=" + this.message.content + "&lang=fr-" + this.langage)
        .subscribe((res) => {
          mes = res["_body"];
          this.message.content = JSON.parse(mes)["text"][0];
        });
    } else {
      let mes;
      this.http.get("https://translate.yandex.net/api/v1.5/tr.json/translate?key=" +
        "trnsl.1.1.20170616T071450Z.f1abae67092b3435.8db3d485331a8166871f45ca5dcbcc7d5829941d" +
        "&text=" + this.privatemessage.content + "&lang=fr-" + this.langage)
        .subscribe((res) => {
          mes = res["_body"];
          this.privatemessage.content = JSON.parse(mes)["text"][0];
        });
    }
  }

  /**
   * Fonction permettant de modifier en quoi le message de l'utilisateur va etre traduit :
   * francais -> choix de l'utilisateur via le select (translate-selector)
   * @param value valeur représentant le choix de l'utilisateur
   */
  callType(value): void {
    this.langage = value;
  }

}
