import {Component} from '@angular/core';

import {SpeechService} from "./speech.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(public speech: SpeechService) {
  }


}
