import {Component, OnInit} from "@angular/core";

import {MessageService} from "../../../shared/services";
import {MessageModel} from "../../../shared/models/MessageModel";
import {ChannelService} from "../../../shared/services/channel/channel.service";
import {ChannelModel} from "../../../shared/models/ChannelModel";
import {PrivateMessageModel} from "../../../shared/models/PrivateMessageModel";
import {PrivateChannelService} from "../../../shared/services/privateChannel/privateChannel.service";
import {PrivateMessageServices} from "../../../shared/services/privateMessage/privateMessage.service";
import {USER} from "../../../shared/constants/user";

@Component({
  selector: "app-message-list",
  templateUrl: "./message-list.component.html",
  styleUrls: ["./message-list.component.css"]
})
export class MessageListComponent implements OnInit {

  public messageList: MessageModel[];
  public privateMessageList: PrivateMessageModel[];
  private route: string;
  private channelType;

  constructor(private messageService: MessageService, private channelService: ChannelService,
              private privateChannelService: PrivateChannelService, private privateMessageService: PrivateMessageServices) {
    // this.route = "414/messages";
    channelService.currentChannelRoute = new ChannelModel(414);
    this.route = "" + channelService.currentChannelRoute.id + "/messages";
    privateChannelService.currentPrivateChannel = USER;
    this.channelType = this.privateChannelService.channelType;
  }

  /**
   * Fonction ngOnInit.
   * Cette fonction est appelée après l'execution de tous les constructeurs de toutes les classes typescript.
   * Cette dernière s'avère très utile lorsque l'on souhaite attendre des valeurs venant de d'autres composants.
   * Le composant MessageComponent prend en @Input un message. Les @Input ne sont accessibles uniquement à partir du ngOnInit,
   * pas dans le constructeur.
   * En general, l'utilisation des services dans le NgOnInit est une bonne practice. Le constructeur ne doit servir qu'à
   * l'initialisation simple des variables. Pour plus d'information sur le ngOnInit, il y a un lien dans le README.
   */
  ngOnInit() {
    this.route = "" + this.channelService.currentChannelRoute.id + "/messages";
    this.messageService.getMessages(2, this.route);
    this.messageService.messageList$.subscribe((messages) => this.messageList = messages);
    this.privateMessageService.getMessages(this.privateChannelService.currentPrivateChannel);
    this.privateMessageService.privateMessageList$.subscribe((messages) => this.privateMessageList = messages);
  }
}
