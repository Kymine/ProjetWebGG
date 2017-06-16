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

  constructor(private channelService: ChannelService, private messageService: MessageService) {
    this.channel = new ChannelModel(0, "Channel");
  }

  ngOnInit() {
  }

  /**
   * Rejoindre un channel (public).
   * @param id Id du channel à rejoindre.
   */
  joinChannel(id: number) {
    this.channelService.currentChannelRoute.id = id;
    this.channelService.currentChannelRoute.name = this.channel.name;
    this.messageService.pageNumber = 0;
  }

}
