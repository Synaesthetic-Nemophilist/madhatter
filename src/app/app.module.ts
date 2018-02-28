import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";


import {AppComponent} from './app.component';
import {SpeechService} from "./speech.service";
import {MadlibsService} from "./madlibs.service"
import {ListenComponent} from './listen/listen.component';


@NgModule({
  declarations: [
    AppComponent,
    ListenComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    SpeechService,
    MadlibsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
