import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

import {AppComponent} from "./app.component";

import {MessageComponent, MessageListComponent} from "./messages";
import {MessageFormComponent} from "./messages/message-form";
import {MessageService} from "../shared/services/message/message.service";
import {ChannelFormComponent} from "./channels/channel-form/channel-form.component";
import {ChannelService} from "../shared/services/channel/channel.service";
import {ChannelListComponent} from "./channels/channel-list/channel-list.component";
import {ChannelComponent} from "./channels/channel/channel.component";
import {SafePipe} from "../shared/pipes/safe.pipe";
import {PrivateChannelService} from "../shared/services/privateChannel/privateChannel.service";
import {PrivateChannelListComponent} from "./channels/private-channel-list/private-channel-list.component";
import {PrivateChannelComponent} from "./channels/private-channel/private-channel.component";
import {PrivateMessageServices} from "../shared/services/privateMessage/privateMessage.service";
import {WeatherComponent} from "./weather/weather.component";
import {LoginService} from "../shared/services/login/login.service";
import {WeatherServices} from "../shared/services/weather/weather.service";


@NgModule({
  declarations: [
    AppComponent,
    MessageFormComponent,
    MessageListComponent,
    MessageComponent,
    ChannelComponent,
    ChannelFormComponent,
    ChannelListComponent,
    PrivateChannelComponent,
    PrivateChannelListComponent,
    SafePipe,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [MessageService, ChannelService, PrivateChannelService, PrivateMessageServices, LoginService, WeatherServices],
  bootstrap: [AppComponent]
})
export class AppModule {
}
