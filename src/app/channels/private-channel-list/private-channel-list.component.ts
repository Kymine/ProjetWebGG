import {Component, OnInit} from "@angular/core";

import {PrivateChannelService} from "../../../shared/services/privateChannel/privateChannel.service";

@Component({
  selector: "app-private-channel-list",
  templateUrl: "./private-channel-list.component.html",
  styleUrls: ["./private-channel-list.component.css"]
})

export class PrivateChannelListComponent implements OnInit {

  /**
   * La liste de channel privé à afficher.
   */
  public privateChannelList: string[];

  constructor(private privateChannelService: PrivateChannelService) {
  }

  /**
   * Initialise la liste de tous les utilisateurs disponibles ainsi que l'abonnement à l'observable
   * pour être notifier des futures modifications.
   */
  ngOnInit() {
    this.privateChannelService.getUsers();
    this.privateChannelService.userList$.subscribe((channels) => this.privateChannelList = channels);
  }

}
