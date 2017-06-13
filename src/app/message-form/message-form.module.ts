import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";

import {MessageFormComponent} from "./message-form.component";
import {MessageService} from "../../shared/services/message/message.service";
import {ChannelService} from "../../shared/services/channel/channel.service";

@NgModule({
  declarations: [
    MessageFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [MessageFormComponent],
  providers: [MessageService, ChannelService]
})
export class MessageFormModule {
}
