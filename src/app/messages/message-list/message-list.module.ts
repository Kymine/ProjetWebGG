import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";

import {MessageListComponent} from "./message-list.component";
import {MessageModule} from "../message";
import {MessageService} from "../../../shared/services";
import {PrivateMessageServices} from "../../../shared/services/privateMessage/privateMessage.service";

@NgModule({
  declarations: [
    MessageListComponent
  ],
  imports: [
    CommonModule,
    MessageModule
  ],
  exports: [MessageListComponent],
  providers: [MessageService, PrivateMessageServices]
})
export class MessageListModule {
}
