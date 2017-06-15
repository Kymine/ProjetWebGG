import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {MessageService} from "../shared/services/message/message.service";
import {ChannelService} from "../shared/services/channel/channel.service";
import {PrivateChannelService} from "../shared/services/privateChannel/privateChannel.service";
import {PrivateMessageServices} from "../shared/services/privateMessage/privateMessage.service";
import {ChannelModel} from "../shared/models/ChannelModel";
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

  publicChannels() {
    this.channelType = 0;
    this.privateChannelService.channelType = 0;
  }

  privateChannels() {
    this.channelType = 1;
    this.privateChannelService.channelType = 1;
  }

  prevMessages() {
    if (this.channelType === 0) {
      this.messageService.getMessages(0, this.channelService.currentChannelRoute.id + "/messages");
    } else if (this.channelType === 1) {
      this.privateMessageService.getMessages(0, this.privateMessageService.currentUser);
    }
  }

  nextMessages() {
    if (this.channelType === 0) {
      this.messageService.getMessages(1, this.channelService.currentChannelRoute.id + "/messages");
    } else if (this.channelType === 1) {
      this.privateMessageService.getMessages(1, this.privateMessageService.currentUser);
    }
  }

  login() {
    if (this.user !== "" && !this.user.includes(" ")) {
      this.user = this.user.toLowerCase();
      for (let i = 0 ; i < 9 ; i++) {
        if ( this.user.includes(i.toString()) ) {
          return;
        }
      }
      this.loginService.login(this.user);
      this.status = this.loginService.status;
    }
  }
  logout() {
    this.loginService.logout();
    this.user = this.loginService.username;
    this.status = this.loginService.status;
  }
}
