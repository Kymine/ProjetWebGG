import {Component, OnInit} from "@angular/core";

import {MessageService} from "../../../shared/services";
import {MessageModel} from "../../../shared/models/MessageModel";
import {ChannelService} from "../../../shared/services/channel/channel.service";
import {USER} from "../../../shared/constants/user";
import {PrivateChannelService} from "../../../shared/services/privateChannel/privateChannel.service";
import {PrivateMessageServices} from "../../../shared/services/privateMessage/privateMessage.service";
import {PrivateMessageModel} from "../../../shared/models/PrivateMessageModel";

@Component({
  selector: "app-message-form",
  templateUrl: "./message-form.component.html",
  styleUrls: ["./message-form.component.css"]
})
export class MessageFormComponent implements OnInit {

  public message: MessageModel;
  private route: string;
  public privatemessage: PrivateMessageModel;
  private channelType2;

  constructor(private messageService: MessageService, private channelService: ChannelService,
              private privateChannelService: PrivateChannelService, private privateMessageService: PrivateMessageServices) {
    this.message = new MessageModel(channelService.currentChannelRoute.id, "Hello", USER);
    this.route = "" + channelService.currentChannelRoute.id + "/messages";
    this.privatemessage = new PrivateMessageModel(1, "Hello", USER);
    this.channelType2 = this.privateChannelService.channelType;
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

  sendPrivateMessage() {
    this.privateMessageService.postMessage(this.privateChannelService.currentPrivateChannel, this.privatemessage);
  }
}
