import {Component, Input, OnInit} from "@angular/core";

import {ChannelModel} from "../../../shared/models/ChannelModel";
import {ChannelService} from "../../../shared/services/channel/channel.service";
import {MessageService} from "../../../shared/services/message/message.service";
/**
 * Created by Pierre on 12/06/2017.
 */

@Component({
  selector: "app-channel",
  templateUrl: "./channel.component.html",
  styleUrls: ["./channel.component.css"]
})

export class ChannelComponent implements OnInit {
  @Input() channel: ChannelModel;
  public showStyle: boolean;
  public lastChannel: ChannelComponent;

  constructor(private channelService: ChannelService, private messageService: MessageService) {
    this.channel = new ChannelModel(0, "Channel");
    this.showStyle = false;
    this.lastChannel = this;
  }

  ngOnInit() {
  }

  /**
   * rejoindre un channel
   */
  joinChannel(id: number) {
    this.channelService.currentChannelRoute.id = id;
    this.channelService.currentChannelRoute.name = this.channel.name;
    this.messageService.pageNumber = 0;
    // this.messageService.getMessages(2, "" + id + "/messages");
  }

  getStyle() {
    if (this.lastChannel !== this) {
      this.lastChannel.showStyle = false;
      this.lastChannel.getStyle();
    }

    if (this.showStyle) {
      this.lastChannel = this;
      return "#F2F2F2";
    } else {
      this.showStyle = false;
      return "";
    }

  }

}
