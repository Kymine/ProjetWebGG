import {Component, OnInit} from "@angular/core";

import {PrivateChannelService} from "../../../shared/services/privateChannel/privateChannel.service";

@Component({
  selector: "app-private-channel-list",
  templateUrl: "./private-channel-list.component.html",
  styleUrls: ["./private-channel-list.component.css"]
})

export class PrivateChannelListComponent implements OnInit {

  public privateChannelList: string[];

  constructor(private privateChannelService: PrivateChannelService) {
  }

  ngOnInit() {
    this.privateChannelService.getUsers();
    this.privateChannelService.userList$.subscribe((channels) => this.privateChannelList = channels);
  }

}
