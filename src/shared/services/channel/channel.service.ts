/**
 * Created by sebde on 12/06/2017.
 */
import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {URLSERVER} from "shared/constants/urls";
import {ChannelModel} from "shared/models/ChannelModel";

@Injectable()
export class ChannelService {

  /**
   * Url pour accéder aux données. L'url est commun à toutes les fonctions du service.
   * Il permet d'accéder aux channels. À partir de cet url, vous pourrez accéder aux Channels.
   * La documentation des methodes du service permet d'avoir plus d'information concernant la façon d'accèder aux Channels.
   */
  private url: string;

  /**
   * Ce nombre détermine quelle page doit être chargée pour récupérer la liste des channels.
   */
  private pageNumber: number;

  /**
   * ChannelList$ est un type d'Observable particulier appelé ReplaySubject.
   * ChannelList$ est un flux d'évenements qui stock la liste des Channels. A chaque fois que l'on fait une requète
   * pour récupérer la liste des Channels, ChannelList$ va pousser cette nouvelle liste dans son flux pour permettre
   * aux composants qui l'écoutent de récupérer les Channels. Pour plus d'infos sur les observables, voir le README.md du projet
   * dans lequel vous trouverez une première explication sur les observables ainsi qu'une vidéo tutoriel.
   */
  public channelList$: ReplaySubject<ChannelModel[]>;

  constructor(private http: Http) {
    this.url = URLSERVER;
    this.pageNumber = 1;
    this.channelList$ = new ReplaySubject(1);
    this.channelList$.next([new ChannelModel()]);
  }

  /**
   * Fonction getChannel.
   * Cette fonction permet de récupérer la liste des Channels pour un channel donné. Elle prend en parametre:
   * - route: La route. C'est la fin de l'url. Elle sera concaténée à l'attribut this.url pour former l'url complète.
   *          Pour l'envoie des Channels la route doit avoir la structure suivante: :id/Channels avec ":id" étant
   *          un nombre entier correspondant à l'identifiant (id) du channel.
   * Exemple de route: 1/Channels
   * @param route
   * @returns {Observable<R>}
   */
  public getChannels() {
    const finalUrl = this.url + "?page=" + this.pageNumber;
    this.http.get(finalUrl)
      .subscribe((response) => this.extractAndUpdateChannelList(response));
  }

  /**
   * Fonction sendChannel.
   * Cette fonction permet l'envoi d'un Channel. Elle prend en paramêtre:
   * - route: La route est la fin de l'url. Elle sera concaténée à l'attribut this.url pour former l'url complète. Pour
   *          l'envoie des Channels la route doit avoir la structure suivante: :id/Channels avec ":id" étant un nombre
   *          entier correspondant à l'identifiant (id) du channel.
   *          Exemple de route: 1/Channels
   * - Channel: Le Channel à envoyer. Ce Channel est de type ChannelModel.
   * @param route
   * @param channel
   */
  public createChannel(channel: ChannelModel) {
    const finalUrl = this.url;
    const headers = new Headers({"Content-Type": "application/json"});
    const options = new RequestOptions({headers: headers});
    this.http.post(finalUrl, channel, options)
      .subscribe((response) => this.extractChannelAndGetChannels(response));

  }

  /**
   * Fonction extractAndUpdateChannelList.
   * Cette fonction permet d'extraire la liste des Channels de la 'response' reçue et ensuite de mettre à jour la liste
   * des Channel dans l'observable ChannelList$.
   * Elle est appelée dans la fonction getChannels et permet de directement récuperer une liste de ChannelModel. Pour récupérer
   * les données de la reponse, il suffit d'appeler la fonction .json() qui retourne le body de la réponse.
   * @param response
   */
  extractAndUpdateChannelList(response: Response) {
    // Plus d'info sur Response ou sur la fonction .json()? si tu utilises Webstorm,
    // fait CTRL + Click pour voir la déclaration et la documentation
    const channelList = response.json() || []; // ExtractChannel: Si response.json() est undefined ou null,
    // ChannelList prendra la valeur tableau vide: [];
    console.log(this.pageNumber);
    if (channelList.length === 0) {
      this.pageNumber = 1;
    } else {
      this.pageNumber++;
      this.channelList$.next(channelList); // On pousse les nouvelles données dans l'attribut ChannelList$
      this.getChannels();
    }
  }

  /**
   * Fonction extractChannel.
   * Cette fonction permet d'extraire les données reçues à travers les requêtes HTTP. Elle est appelée dans la fonction
   * sendChannel et permet de directement récuperer un ChannelModel.
   * Elle va également faire un nouvel appel pour récupérer la liste complete des Channels pour pouvoir mettre à jour la
   * liste des Channels dans les composants.
   * @param response
   * @param route
   * @returns {any|{}}
   */
  private extractChannelAndGetChannels(response: Response): ChannelModel {

    const ChannelList = response.json() || [];
    this.channelList$.next(ChannelList);
    this.getChannels();

    return ChannelList[0]; // A remplacer ! On retourne ici un ChannelModel vide seulement pour que Typescript ne lève pas d'erreur !
  }
}
