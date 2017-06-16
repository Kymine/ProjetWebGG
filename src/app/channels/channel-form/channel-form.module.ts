/**
 * Created by Pierre on 12/06/2017.
 */
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";

import {ChannelFormComponent} from "./channel-form.component";
import {ChannelService} from "../../../shared/services/channel/channel.service";
import {ChannelComponent} from "../channel/channel.component";
import {ChannelListComponent} from "../channel-list/channel-list.component";

@NgModule({
  declarations: [
    ChannelFormComponent,
    ChannelListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [ChannelComponent],
  providers: [ChannelService]
})
export class ChannelModel {
}
