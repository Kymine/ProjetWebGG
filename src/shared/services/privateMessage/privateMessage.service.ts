import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {ReplaySubject} from "rxjs/ReplaySubject";

import {PrivateMessageModel} from "../../models/PrivateMessageModel";
import {LoginService} from "../login/login.service";

@Injectable()
export class PrivateMessageServices {

  private url: string;
  public privateMessageList$: ReplaySubject<PrivateMessageModel[]>;
  public pageNumber: number;
  public currentUser: string;

  constructor(private http: Http, private loginService: LoginService) {
    this.url = "http://projet-3a.7ight.com/api/users";
    this.privateMessageList$ = new ReplaySubject(1);
    this.pageNumber = 0;
    this.privateMessageList$.next([new PrivateMessageModel()]);
  }

  /**
   * Cette fonction permet de récupérer la liste des messages privé pour un utilisateur donné.
   * @param correspondentUser Le nom de l'utilisateur avec qui on communique.
   * @param listMessage La liste des messages privés à récupérer.
   * @returns {Observable<R>}
   */
  public getMessages(correspondentUser: string, listMessage?: PrivateMessageModel[]) {
    this.currentUser = correspondentUser;
    const pageSelector = "&page=" + this.pageNumber;
    const finalUrl = this.url + "/" + this.loginService.username + "/messages?currentUserId=" + correspondentUser + pageSelector;
    this.http.get(finalUrl)
      .subscribe((response) => this.extractAndUpdateMessageList(response, listMessage));
  }

  /**
   * Cette fonction permet l'envoi d'un message privé.
   * @param correspondentUser Le nom de l'utilisateur à qui envoyer le message privé.
   * @param message Le message à envoyer. Ce message est de type PrivateMessageModel.
   */
  public postMessage(correspondentUser: string, message: PrivateMessageModel) {
    const finalUrl = this.url + "/" + correspondentUser + "/messages";
    const headers = new Headers({"Content-Type": "application/json"});
    const options = new RequestOptions({headers: headers});
    this.http.post(finalUrl, message, options)
      .subscribe();
    this.pageNumber = 0;
  }

  /**
   * Fonction extractAndUpdateMessageList.
   * Cette fonction permet d'extraire la liste des messages de la 'response' reçue et ensuite de mettre à jour la liste
   * des message dans l'observable privateMessageList$.
   * Elle est appelée dans la fonction getMessages et permet de directement récuperer une liste de PrivateMessageModel. Pour récupérer
   * les données de la reponse, il suffit d'appeler la fonction .json() qui retourne le body de la réponse.
   * @param response
   * @param listMessage
   */
  extractAndUpdateMessageList(response: Response, listMessage?: PrivateMessageModel[]) {
    const messageList = response.json() || [];
    if (messageList.length === 0) {
      if (this.pageNumber !== 0) {
        this.pageNumber--;
      } else {
        this.privateMessageList$.next([new PrivateMessageModel()]);
      }
    } else {
      if (listMessage == null || (<PrivateMessageModel> messageList[0]).createdAt !== listMessage[0].createdAt) {
        this.privateMessageList$.next(messageList);
      }
    }
  }

}
