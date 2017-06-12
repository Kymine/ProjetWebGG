/**
 * Created by Pierre on 12/06/2017.
 */
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ChannelComponent } from "./channel.component";

@NgModule({
  declarations: [
    ChannelComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [ChannelComponent],
  providers: []
})
export class ChannelModel { }
