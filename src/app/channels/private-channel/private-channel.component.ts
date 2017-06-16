import {Component, Input, OnInit} from "@angular/core";
import {ChannelModel} from "../../../shared/models/ChannelModel";
import {PrivateChannelService} from "../../../shared/services/privateChannel/privateChannel.service";
import {PrivateMessageServices} from "../../../shared/services/privateMessage/privateMessage.service";

@Component({
  selector: "app-private-channel",
  templateUrl: "./private-channel.component.html",
  styleUrls: ["./private-channel.component.css"]
})

export class PrivateChannelComponent implements OnInit {

  @Input() privateChannel: string;

  constructor(private privateChannelService: PrivateChannelService, private privateMessageService: PrivateMessageServices) {
    this.privateChannel = "Channel";
  }

  ngOnInit() {
  }

  /**
   * rejoindre un channel
   */
  joinChannel(user: string) {
    this.privateChannelService.currentPrivateChannel = user;
    // this.privateMessageService.getMessages(2, user);
  }

}
