/**
 * Created by Pierre on 12/06/2017.
 */
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";

import {ChannelService} from "../../../shared/services/channel/channel.service";
import {ChannelComponent} from "../channel/channel.component";

@NgModule({
  declarations: [
    ChannelComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [ChannelComponent],
  providers: [ChannelService]
})
export class ChannelModel {
}
