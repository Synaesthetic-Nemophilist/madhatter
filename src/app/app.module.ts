import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from '@angular/common/http';


import {AppComponent} from './app.component';
import {SpeechService} from "./speech.service";
import {MadlibsService} from "./madlibs.service"
import {ListenComponent} from './listen/listen.component';
import {WordsFormComponent} from './words-form/words-form.component';
import {KeyboardComponent} from './keyboard/keyboard.component';


@NgModule({
  declarations: [
    AppComponent,
    ListenComponent,
    WordsFormComponent,
    KeyboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    SpeechService,
    MadlibsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
