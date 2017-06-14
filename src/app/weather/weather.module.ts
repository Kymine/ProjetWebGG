/**
 * Created by Pierre on 14/06/2017.
 */
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";

import {WeatherComponent} from "./weather.component";

@NgModule({
  declarations: [
    WeatherComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [WeatherComponent],
  providers: []
})
export class WeatherModule {
}
