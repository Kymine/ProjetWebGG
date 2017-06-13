import {Component, OnInit} from "@angular/core";

import {ChannelModel} from "../../../shared/models/ChannelModel";
import {ChannelService} from "../../../shared/services/channel/channel.service";

@Component({
  selector: "app-channel-list",
  templateUrl: "./channel-list.component.html",
  styleUrls: ["./channel-list.component.css"]
})

export class ChannelListComponent implements OnInit {

  public channelList: ChannelModel[];

  public currentChannelRoute: ChannelModel;

  constructor(private channelService: ChannelService) {
  }
  ngOnInit() {
    this.channelService.getChannels(0);
    this.channelService.channelList$.subscribe((channels) => this.channelList = channels);
  }
}
