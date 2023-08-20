import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OptionSelect } from '../interfaces/option-select.model';
import { Runner } from '../interfaces/runner.model';
import { InscriptionData } from '../interfaces/inscription-data.model';

@Injectable({
  providedIn: 'root'
})
export class TriggerService {

  private _documentTypes = new BehaviorSubject<OptionSelect[] | null>(null);
  private _cities = new BehaviorSubject<OptionSelect[] | null>(null);
  private _countries = new BehaviorSubject<OptionSelect[] | null>(null);
  private _genders = new BehaviorSubject<OptionSelect[] | null>(null);
  private _payMethods = new BehaviorSubject<OptionSelect[] | null>(null);
  private _runnerForm = new BehaviorSubject<Runner | null>(null);
  private _raceForm = new BehaviorSubject<InscriptionData | null>(null);
  documentTypes$ = this._documentTypes.asObservable();
  cities$ = this._cities.asObservable();
  countries$ = this._countries.asObservable();
  genders$ = this._genders.asObservable();
  payMethods$ = this._payMethods.asObservable();
  runnerForm$ = this._runnerForm.asObservable();
  raceForm$ = this._raceForm.asObservable();

  setDocumentTypes(rq : OptionSelect[] | null){
    this._documentTypes.next(rq);
  }

  setCities(rq : OptionSelect[] | null){
    this._cities.next(rq);
  }

  setCountries(rq : OptionSelect[] | null){
    this._countries.next(rq);
  }

  setGenders(rq : OptionSelect[] | null){
    this._genders.next(rq);
  }

  setPayMethods(rq : OptionSelect[] | null){
    this._payMethods.next(rq);
  }

  setRunnerForm(rq: Runner | null){
    this._runnerForm.next(rq);
  }

  setRaceForm(rq: InscriptionData | null){
    this._raceForm.next(rq);
  }

  //#region tools methods

  convertDate(date: Date): string {
    return date?.toString()?.split('T')[0];
}

  //#endregion


}
