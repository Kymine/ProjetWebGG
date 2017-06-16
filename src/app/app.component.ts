import {Component} from "@angular/core";
import {Observable} from "rxjs/Observable";

import {MessageService} from "../shared/services/message/message.service";
import {ChannelService} from "../shared/services/channel/channel.service";
import {PrivateChannelService} from "../shared/services/privateChannel/privateChannel.service";
import {PrivateMessageServices} from "../shared/services/privateMessage/privateMessage.service";
import {LoginService} from "../shared/services/login/login.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {

  /**
   * Spécifie de quel type de channel il s'agit. Deux types de channels différents sont actuellement disponibles :
   * Channel public (channelType === 0)
   * Channel privé (channelType === 1)
   */
  public channelType: number;
  public title: string;
  public user: string;

  /**
   * Statut de l'utilisateur.
   * Utilisateur connecté (status === 0).
   * Utilisateur deconnecté (status === 1).
   */
  public status: boolean;

  constructor(public messageService: MessageService, public channelService: ChannelService,
              public privateChannelService: PrivateChannelService,
              public privateMessageService: PrivateMessageServices, public loginService: LoginService) {
    this.title = "Chat";
    this.channelType = 0;
    this.privateChannelService.channelType = 0;
    Observable.create();
    this.user = loginService.username;
    this.status = loginService.status;
  }

  /**
   * Accès aux channels publics.
   */
  publicChannels() {
    this.channelType = 0;
    this.privateChannelService.channelType = 0;
  }

  /**
   * Accès aux channels privés.
   */
  privateChannels() {
    this.channelType = 1;
    this.privateChannelService.channelType = 1;
  }

  /**
   * Accès à la liste des messages (20 messages maximum) précédents.
   */
  prevMessages() {
    if (this.channelType === 0) {
      if (this.messageService.pageNumber !== 0) {
        this.messageService.pageNumber--;
      }
    } else if (this.channelType === 1) {
      if (this.privateMessageService.pageNumber !== 0) {
        this.privateMessageService.pageNumber--;
      }
    }
  }

  /**
   * Accès à la liste des messages (20 messages maximum) suivants.
   */
  nextMessages() {
    if (this.channelType === 0) {
      this.messageService.pageNumber++;
    } else if (this.channelType === 1) {
      this.privateMessageService.pageNumber++;
    }
  }

  /**
   * Effectue la vérification du nom d'utilisateur avant de login et permet l'authentification.
   */
  login() {
    const reg = /[^a-z]+/;
    const res = this.user.match(reg);
    if (res == null && this.user.length <= 20) {
      this.loginService.login(this.user);
      this.status = this.loginService.status;
    }
  }

  /**
   * Effectue la déconnexion de l'utilisateur.
   */
  logout() {
    this.loginService.logout();
    this.user = this.loginService.username;
    this.status = this.loginService.status;
  }

}
