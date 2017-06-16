import {Component, OnInit} from "@angular/core";

import {ChannelModel} from "../../../shared/models/ChannelModel";
import {ChannelService} from "../../../shared/services/channel/channel.service";

@Component({
  selector: "app-channel-list",
  templateUrl: "./channel-list.component.html",
  styleUrls: ["./channel-list.component.css"]
})

export class ChannelListComponent implements OnInit {

  /**
   * Liste de channel à afficher.
   */
  public channelList: ChannelModel[];

  constructor(private channelService: ChannelService) {
  }

  /**
   * Initialise la première page de liste de channel ainsi que l'abonnement à l'observable
   * pour être notifier des futures modifications.
   */
  ngOnInit() {
    this.channelService.getChannels(0);
    this.channelService.channelList$.subscribe((channels) => this.channelList = channels);
  }

}
