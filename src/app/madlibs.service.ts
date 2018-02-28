import {Injectable} from '@angular/core';
import {Subject} from "rxjs/Subject";

@Injectable()
export class MadlibsService {

  submit$ = new Subject<any>();
  words: any;

  constructor() {
  }

  submit(eventObj) {
    // form submitted with form results
    this.submit$.next(eventObj);  //  - EVENT EMISSION -
    this.words = eventObj;
  }

}
