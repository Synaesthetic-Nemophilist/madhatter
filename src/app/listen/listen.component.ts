import {Component, OnDestroy, OnInit} from '@angular/core';
import {SpeechService} from "../speech.service";
import {Subscription} from "rxjs/Subscription";
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-listen',
  templateUrl: './listen.component.html',
  styleUrls: ['./listen.component.scss']
})
export class ListenComponent implements OnInit, OnDestroy {

  nouns: string[];
  verbs: string[];
  adjs: string[];
  nounSub: Subscription;
  verbSub: Subscription;
  adjSub: Subscription;
  errorsSub: Subscription;
  errorMsg: string;

  constructor(public speech: SpeechService) {
  }

  ngOnInit() {
    this.speech.init();
    this._listenNouns();
    this._listenVerbs();
    this._listenAdj();
    this._listenErrors();
  }

  get btnLabel(): string {
    return this.speech.listening
      ? 'Listening...'
      : 'Listen';
  }

  private _listenNouns() {
    this.nounSub = this.speech.words$
      .filter(obj => obj.type === 'noun')
      .map(nounObj => nounObj.word)
      .subscribe(
        noun => {
          this._setError();
          console.log('noun:', noun);
        }
      );
  }

  private _listenVerbs() {
    this.verbSub = this.speech.words$
      .filter(obj => obj.type === 'verb')
      .map(verbObj => verbObj.word)
      .subscribe(
        verb => {
          this._setError();
          console.log('verb:', verb);
        }
      );
  }

  private _listenAdj() {
    this.adjSub = this.speech.words$
      .filter(obj => obj.type === 'adj')
      .map(adjObj => adjObj.word)
      .subscribe(
        adj => {
          this._setError();
          console.log('adjective:', adj);
        }
      );
  }

  private _listenErrors() {
    this.errorsSub = this.speech.errors$
      .subscribe(err => this._setError(err));
  }

  private _setError(err?: any) {
    if (err) {
      console.log('Speech recognition:', err);
      this.errorMsg = err.message;
    } else {
      this.errorMsg = null;
    }
  }


  ngOnDestroy() {
    this.nounSub.unsubscribe();
    this.verbSub.unsubscribe();
    this.adjSub.unsubscribe();
    this.errorsSub.unsubscribe();
  }

}
