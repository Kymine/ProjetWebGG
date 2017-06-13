import {Component} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {MessageService} from "../shared/services/message/message.service";
import {ChannelService} from "../shared/services/channel/channel.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {

  public title: string;

  constructor(public messageService: MessageService, public channelService: ChannelService) {
    this.title = "Chat";
    Observable.create();
  }

  prevMessages() {
    this.messageService.getMessages(0, this.channelService.currentChannelRoute.id + "/messages");
  }

  nextMessages() {
    this.messageService.getMessages(1, this.channelService.currentChannelRoute.id + "/messages");
  }
}
