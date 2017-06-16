/**
 * Created by Pierre on 12/06/2017.
 */
import {Component, OnInit} from "@angular/core";

import {ChannelModel} from "../../../shared/models/ChannelModel";
import {ChannelService} from "../../../shared/services/channel/channel.service";

@Component({
  selector: "app-channel-form",
  templateUrl: "./channel-form.component.html",
  styleUrls: ["./channel-form.component.css"]
})
export class ChannelFormComponent implements OnInit {

  public channel: ChannelModel;
  private route: string;

  constructor(public channelService: ChannelService) {
    this.channel = new ChannelModel();
    this.route = this.channel.name + "";
  }

  ngOnInit() {
  }

  createChannel() {
    this.channelService.createChannel(this.channel);
  }

  prevChannel() {
    this.channelService.getChannels(0);
  }

  nextChannel() {
    this.channelService.getChannels(1);
  }

}
