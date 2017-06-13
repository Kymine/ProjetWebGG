/**
 * Created by Pierre on 12/06/2017.
 */
import { Component, OnInit } from "@angular/core";


import { ChannelModel } from "../../shared/models/ChannelModel";
import {ChannelService} from "../../shared/services/channel/channel.service";

@Component({
  selector: "app-channel-form",
  templateUrl: "./channel-form.component.html",
  styleUrls: ["./channel-form.component.css"]
})
export class ChannelFormComponent implements OnInit {

  public channel: ChannelModel;
  private route: string;

  constructor(private channelService: ChannelService) {
    this.channel = new ChannelModel();
    this.route = this.channel.name + "";
  }

  ngOnInit() { }
  createChannel() {
    console.log("create channel!");
    console.log(this.channel.name);
    this.channelService.createChannel(this.channel);
  }

}
