import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, inject } from '@angular/core';
import { InscriptionData } from '../interfaces/inscription-data.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Constants } from '../constants';
import { ResponseApi } from '../interfaces/response-api.model';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  updateInsciption = new EventEmitter<boolean>();

  private _http = inject(HttpClient)
  
  createInscription(inscription: InscriptionData): Observable<ResponseApi>{
    console.log(Constants.URL_API + Constants.ENDPOINT_SAVE_INSCRIPTION);
    console.log(inscription);
    return this._http.post<ResponseApi>(Constants.URL_API + Constants.ENDPOINT_SAVE_INSCRIPTION, inscription); 
  }

  getInscription(idRunner: number): Observable<ResponseApi>{
    return this._http.get<ResponseApi>(Constants.URL_API + Constants.ENDPOINT_GET_INSCRIPTION + "?idRunner=" + idRunner); 
  }

  getReportInscription(): Observable<ResponseApi>{
    return this._http.get<ResponseApi>(Constants.URL_API + Constants.ENDPOINT_GET_REPORT_INSCRIPTION); 
  }
}
