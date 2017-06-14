import {Component} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {MessageService} from "../shared/services/message/message.service";
import {ChannelService} from "../shared/services/channel/channel.service";
import {PrivateChannelService} from "../shared/services/privateChannel/privateChannel.service";

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

  constructor(public messageService: MessageService, public channelService: ChannelService) {
    this.title = "Chat";
    this.channelType = 0;
    Observable.create();
  }

  publicChannels() {
    this.channelType = 0;
  }

  privateChannels() {
    this.channelType = 1;
  }

  prevMessages() {
    this.messageService.getMessages(0, this.channelService.currentChannelRoute.id + "/messages");
  }

  nextMessages() {
    this.messageService.getMessages(1, this.channelService.currentChannelRoute.id + "/messages");
  }
}
