import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OptionSelect } from '../interfaces/option-select.model';

@Injectable({
  providedIn: 'root'
})
export class TriggerService {

  private _documentTypes = new BehaviorSubject<OptionSelect[] | null>(null);
  private _cities = new BehaviorSubject<OptionSelect[] | null>(null);
  private _countries = new BehaviorSubject<OptionSelect[] | null>(null);
  private _genders = new BehaviorSubject<OptionSelect[] | null>(null);
  private _payMethods = new BehaviorSubject<OptionSelect[] | null>(null);
  documentTypes$ = this._documentTypes.asObservable();
  cities$ = this._cities.asObservable();
  countries$ = this._countries.asObservable();
  genders$ = this._genders.asObservable();
  payMethods$ = this._payMethods.asObservable();

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
}
