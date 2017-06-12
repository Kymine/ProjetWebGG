import {Component, OnInit} from "@angular/core";

import {ChannelModel} from "../../../shared/models/ChannelModel";

@Component({
  selector: "app-channel-list",
  templateUrl: "./channel-list.component.html",
  styleUrls: ["./channel-list.component.css"]
})

export class ChannelListComponent implements OnInit {

  public channelList: ChannelModel[];

  public currentChannelRoute: ChannelModel;

  constructor() {
    this.currentChannelRoute = new ChannelModel(1, "general");
  }

  deleteChannel(id: number) {
    let list: ChannelModel[];
    list = null;
    let j: number;
    j = 0;
    for (let i = 0; i < this.channelList.length; i++) {
      if (this.channelList[i].id !== id) {
        list[j] = this.channelList[i];
        j++;
      }
    }
    this.channelList = list;
  }

  addChannel(id: number, name: string) {
    for (let i = 0; i < this.channelList.length; i++) {
      if (this.channelList[i].id === id) {
        return;
      }
    }
    this.channelList[this.channelList.length] = new ChannelModel(id, name);
  }


  ngOnInit() {

  }

}
