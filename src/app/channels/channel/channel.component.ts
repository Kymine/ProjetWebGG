
import { Component, Input, OnInit } from "@angular/core";

import { ChannelModel } from "../../../shared/models/ChannelModel";
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
  constructor() {
    this.channel = new ChannelModel(0, "Channel");
  }
  ngOnInit() { }

}
