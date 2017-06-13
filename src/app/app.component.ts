import {Component} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {MessageService} from "../shared/services/message/message.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {

  public title: string;

  constructor(public messageService: MessageService) {
    this.title = "Chat";
    Observable.create();
  }

  prevMessages() {
    this.messageService.getMessages(0);
  }

  nextMessages() {
    this.messageService.getMessages(1);
  }
}
