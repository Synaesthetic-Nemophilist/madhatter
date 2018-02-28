import {Injectable, NgZone} from '@angular/core';
import {Subject} from "rxjs/Subject";

declare let annyang: any;

@Injectable()
export class SpeechService {

  words$ = new Subject<{ [key: string]: string }>();
  errors$ = new Subject<{ [key: string]: any }>();
  listening = false;

  constructor(private zone: NgZone) {
  }

  get getSpeechSupported(): boolean {
    return !!annyang;
  }

  init() {
    const commands = {
      'noun :noun': (noun) => {  // :noun is a named variables -- dynamic key! e.g. noun cat
        this.zone.run(() => {
          this.words$.next({type: 'noun', 'word': noun});  // feed value to subject words$
        });
      },
      'verb :verb': (verb) => {
        this.zone.run(() => {
          this.words$.next({type: 'verb', 'word': verb});
        });
      },
      'adjective :adj': (adj) => {
        this.zone.run(() => {
          this.words$.next({type: 'adj', 'word': adj});
        });
      }
    };

    // Add commands to annyang
    annyang.addCommands(commands);

    // Log anything the user says and what speech recognition thinks it might be
    annyang.addCallback('result', (userSaid) => {
      console.log('User may have said:', userSaid);
    });
    // also other callbacks for other events...
    annyang.addCallback('errorNetwork', (err) => {
      this._handleError('network', 'A network error occurred', err);
    });
    annyang.addCallback('errorPermissionBlocked', (err) => {
      this._handleError('blocked', 'Browser blocked microphone permission', err);
    });
    annyang.addCallback('errorPermissionDenied', (err) => {
      this._handleError('denied', 'User denied microphone permissions.', err);
    });
    annyang.addCallback('resultNoMatch', (userSaid) => {
      this._handleError(
        'no match',
        'Spoken command not recognized. Say "noun [word]", "verb [word]", OR "adjective [word]".',
        {results: userSaid});
    });
  }


  private _handleError(error, msg, errObj) {
    this.zone.run(() => {
      this.errors$.next({
        error: error,
        message: msg,
        obj: errObj
      });
    });
  }

  startListening() {
    annyang.start();
    this.listening = true;
  }

  abort() {
    annyang.abort();
    this.listening = false;
  }


}






















