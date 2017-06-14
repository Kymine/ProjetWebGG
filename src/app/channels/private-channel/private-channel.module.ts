import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";

import {PrivateChannelComponent} from "./private-channel.component";
import {PrivateChannelService} from "../../../shared/services/privateChannel/privateChannel.service";
import {PrivateMessageServices} from "../../../shared/services/privateMessage/privateMessage.service";

@NgModule({
  declarations: [
    PrivateChannelComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [PrivateChannelComponent],
  providers: [PrivateChannelService, PrivateMessageServices]
})
export class PrivateChannelModule {
}
