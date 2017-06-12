import { Component, OnInit } from "@angular/core";

import { ChannelModel } from "../../../shared/models/ChannelModel";

@Component({
  selector: "app-channel-list",
  templateUrl: "./channel-list.component.html",
  styleUrls: ["./channel-list.component.css"]
})

export class ChannelListComponent implements OnInit {

  public channelList : ChannelModel[];

  public currentChannelRoute: ChannelModel;

  constructor() {
    this.currentChannelRoute = new ChannelModel(1 , "general");
  }


  ngOnInit() {

  }

}
