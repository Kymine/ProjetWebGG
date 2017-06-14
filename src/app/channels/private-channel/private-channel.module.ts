import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";

import {PrivateChannelComponent} from "./private-channel.component";

@NgModule({
  declarations: [
    PrivateChannelComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [PrivateChannelComponent],
  providers: []
})
export class PrivateChannelModule {
}
