import {Injectable} from '@angular/core';
import {Subject} from "rxjs/Subject";
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/zip';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class MadlibsService {

  private _API = 'http://localhost:8084/api/';


  submit$ = new Subject<any>();
  words: any;

  madlibReady = false;
  pronoun: any;


  constructor(private http: HttpClient) {
  }

  setMadlibReady(val: boolean) {
    this.madlibReady = val;
  }

  setPronoun(obj) {
    this.pronoun = obj;
  }

  private _stringSuccessHandler(res: string): string {
    // Remove all double quotes from response
    // This is a product of receiving text response
    return res.replace(/"/g, '');
  }

  // Cancels the observable with an error message
  // in case something went wrong with the request
  private _errorHandler(err: HttpErrorResponse | any) {
    const errorMsg = err.message || 'Error: Unable to complete request.';
    return Observable.throw(errorMsg);
  }


  // If all requests are successful, subscribing to this observable will produce
  // an array that looks like this:
  // [person, place, place, thing, thing]
  getNouns$() {
    const nounPerson$ = this.http
      .get(`${this._API}noun/person`, {responseType: 'text'})
      .map(this._stringSuccessHandler)
      .catch(this._errorHandler);

    const nounPlace$ = this.http
      .get(`${this._API}noun/place`, {responseType: 'text'})
      .map(this._stringSuccessHandler)
      .catch(this._errorHandler);

    const nounThing$ = this.http
      .get(`${this._API}noun/thing`, {responseType: 'text'})
      .map(this._stringSuccessHandler)
      .catch(this._errorHandler);

    return Observable.forkJoin([nounPerson$, nounPlace$, nounPlace$, nounThing$, nounThing$])
  }

  getVerbs$() {
    const verbPresent$ = this.http
      .get(`${this._API}verb/present`, {responseType: 'text'})
      .map(this._stringSuccessHandler)
      .catch(this._errorHandler);

    const verbPast$ = this.http
      .get(`${this._API}verb/past`, {responseType: 'text'})
      .map(this._stringSuccessHandler)
      .catch(this._errorHandler);

    return Observable.forkJoin([verbPresent$, verbPresent$, verbPast$, verbPast$, verbPast$]);
  }

  getAdjs$() {
    const adj$ = this.http
      .get(`${this._API}adjective`, {responseType: 'text'})
      .map(this._stringSuccessHandler)
      .catch(this._errorHandler);

    return Observable.forkJoin([adj$, adj$, adj$, adj$, adj$]);
  }

  getPronoun$() {
    return this.http
      .get(`${this._API}pronoun/gendered`)
      .catch(this._errorHandler);
  }

  getWords$() {
    return Observable
      .zip(this.getNouns$(), this.getVerbs$(), this.getAdjs$())
      .map((res) => {
        return {
          nouns: res[0],
          verbs: res[1],
          adjs: res[2]
        };
      });
  }

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // !"RxJS operators like forkJoin and zip               !
  // !make it simple to combine HTTP request observables."!
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  submit(eventObj) {
    // form submitted with form results
    this.submit$.next(eventObj);  //  - EVENT EMISSION -
    this.words = eventObj;
  }

}
