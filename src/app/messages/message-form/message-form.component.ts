import {Component, OnInit} from "@angular/core";

import {MessageService} from "../../../shared/services";
import {MessageModel} from "../../../shared/models/MessageModel";
import {ChannelService} from "../../../shared/services/channel/channel.service";
import {USER} from "../../../shared/constants/user";

@Component({
  selector: "app-message-form",
  templateUrl: "./message-form.component.html",
  styleUrls: ["./message-form.component.css"]
})
export class MessageFormComponent implements OnInit {

  public message: MessageModel;
  private route: string;

  constructor(private messageService: MessageService, private channelService: ChannelService) {
    this.message = new MessageModel(channelService.currentChannelRoute.id, "Hello", USER);
    this.route = "" + channelService.currentChannelRoute.id + "/messages";
  }

  ngOnInit() {
  }

  /**
   * Fonction pour envoyer un message.
   * L'envoi du message se fait à travers la methode sendMessage du service MessageService.
   * Cette méthode prend en paramètre la route pour envoyer un message (:id/messages avec id un entier correspondant à l'id du channel)
   * ainsi que le message à envoyer. Ce dernier correspond à l'objet MessageModel que l'utilisateur rempli à travers l'input.
   */
  sendMessage() {
    this.route = "" + this.channelService.currentChannelRoute.id + "/messages";
    console.log("Click!");
    this.messageService.sendMessage(this.route, this.message);
  }
}
