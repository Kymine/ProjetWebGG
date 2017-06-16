import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {ReplaySubject} from "rxjs/ReplaySubject";

@Injectable()
export class PrivateChannelService {

  private url: string;

  /**
   * La liste des utilisateurs à afficher.
   */
  public userList$: ReplaySubject<string[]>;

  /**
   * Le channel dans lequel se trouve l'utilisateur.
   */
  public currentPrivateChannel: string;

  /**
   * Spécifie de quel type de channel il s'agit. Deux types de channels différents sont actuellement disponibles :
   * Channel public (channelType === 0)
   * Channel privé (channelType === 1)
   */
  public channelType: number;

  constructor(private http: Http) {
    this.url = "http://projet-3a.7ight.com/api/users";
    this.userList$ = new ReplaySubject(1);
  }

  /**
   * Permet d'abonner la liste d'utilisateur à l'observable userList$.
   */
  public getUsers() {
    this.http.get(this.url)
      .subscribe((response) => this.extractAndUpdatePrivateChannelList(response));
  }

  /**
   * Permet de remplir liste des utilisateurs suite à la réponse de la requête au serveur.
   * @param response Contient la liste de tous les utilisateurs.
   */
  extractAndUpdatePrivateChannelList(response: Response) {
    const privateChannelList = response.json() || [];
    this.userList$.next(privateChannelList);
  }

}
