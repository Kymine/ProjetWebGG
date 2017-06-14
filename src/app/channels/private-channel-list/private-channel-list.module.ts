import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";

import {PrivateChannelListComponent} from "./private-channel-list.component";
import {PrivateChannelService} from "../../../shared/services/privateChannel/privateChannel.service";

@NgModule({
  declarations: [
    PrivateChannelListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [PrivateChannelListComponent],
  providers: [PrivateChannelService]
})
export class PrivateChannelListModule {
}
