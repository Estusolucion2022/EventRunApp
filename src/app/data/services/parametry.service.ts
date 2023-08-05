import { Injectable, inject } from '@angular/core';
import { TriggerService } from './trigger.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from '../constants';
import { OptionSelect } from '../interfaces/option-select.model';
import { ResponseApi } from '../interfaces/response-api.model';

@Injectable({
  providedIn: 'root'
})
export class ParametryService {

  private _trigger = inject(TriggerService);
  private _http = inject(HttpClient);

  getRaces(): Observable<ResponseApi>{ 
    return this._http.get<ResponseApi>(Constants.URL_API + Constants.ENDPOINT_GET_RACES); 
  }

  getCategories(): Observable<ResponseApi>{ 
    return this._http.get<ResponseApi>(Constants.URL_API + Constants.ENDPOINT_GET_CATEGORIES); 
  }

  getParametryDocumentTypes(): Observable<OptionSelect[] | null>{ 
    let url = Constants.URL_API + Constants.ENDPOINT_GET_PARAMETRY + '?tipoParametria=' + Constants.PARAMETRY_DOCSTPES;
    let data = false;
    this._trigger.documentTypes$.subscribe((result: OptionSelect[] | null) => {
      if(result !== null){
        data = true;
      }
    });

    if(!data){
      this._http.get<ResponseApi>(url).subscribe((res: ResponseApi) => {
        this._trigger.setDocumentTypes(res.data);
      })
    }
    return this._trigger.documentTypes$; 
  }

  getParametryCities(): Observable<OptionSelect[] | null>{ 
    let url = Constants.URL_API + Constants.ENDPOINT_GET_PARAMETRY + '?tipoParametria=' + Constants.PARAMETRY_CITIES;
    let data = false;
    this._trigger.cities$.subscribe((result: OptionSelect[] | null) => {
      if(result !== null){
        data = true;
      }
    });

    if(!data){
      this._http.get<ResponseApi>(url).subscribe((res: ResponseApi) => {
        this._trigger.setCities(res.data);
      })
    }
    return this._trigger.cities$; 
  }

  getParametryCountries(): Observable<OptionSelect[] | null>{ 
    let url = Constants.URL_API + Constants.ENDPOINT_GET_PARAMETRY + '?tipoParametria=' + Constants.PARAMETRY_COUNTRIES;
    let data = false;
    this._trigger.countries$.subscribe((result: OptionSelect[] | null) => {
      if(result !== null){
        data = true;
      }
    });

    if(!data){
      this._http.get<ResponseApi>(url).subscribe((res: ResponseApi) => {
        this._trigger.setCountries(res.data);
      })
    }
    return this._trigger.countries$; 
  }

  getParametryGenders(): Observable<OptionSelect[] | null>{ 
    let url = Constants.URL_API + Constants.ENDPOINT_GET_PARAMETRY + '?tipoParametria=' + Constants.PARAMETRY_GENDERS;
    let data = false;
    this._trigger.genders$.subscribe((result: OptionSelect[] | null) => {
      if(result !== null){
        data = true;
      }
    });

    if(!data){
      this._http.get<ResponseApi>(url).subscribe((res: ResponseApi) => {
        this._trigger.setGenders(res.data);
      })
    }
    return this._trigger.genders$; 
  }

  getParametryPayMethods(): Observable<OptionSelect[] | null>{ 
    let url = Constants.URL_API + Constants.ENDPOINT_GET_PARAMETRY + '?tipoParametria=' + Constants.PARAMETRY_PAY_METHODS;
    let data = false;
    this._trigger.payMethods$.subscribe((result: OptionSelect[] | null) => {
      if(result !== null){
        data = true;
      }
    });

    if(!data){
      this._http.get<ResponseApi>(url).subscribe((res: ResponseApi) => {
        this._trigger.setPayMethods(res.data);
      })
    }
    return this._trigger.payMethods$; 
  }
}
