import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";

import {PrivateChannelListComponent} from "./private-channel-list.component";

@NgModule({
  declarations: [
    PrivateChannelListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [PrivateChannelListComponent],
  providers: []
})
export class PrivateChannelListModule {
}
