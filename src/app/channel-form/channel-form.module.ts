/**
 * Created by Pierre on 12/06/2017.
 */
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import {ChannelFormComponent} from "./channel-form.component";
import {ChannelService} from "../../shared/services/channel/channel.service";
import {ChannelComponent} from "../channels/channel/channel.component";

@NgModule({
  declarations: [
    ChannelFormComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [ChannelComponent],
  providers: [ChannelService]
})
export class ChannelModel { }
