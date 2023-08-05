import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Constants } from '../constants';
import { ResponseApi } from '../interfaces/response-api.model';
import { Runner } from '../interfaces/runner.model';

@Injectable({
  providedIn: 'root'
})
export class RunnerService {

  private _http = inject(HttpClient)

  runner:Runner = {} as Runner;
  private runner$ = new BehaviorSubject<Runner>(this.runner);

  createRunner(runner: Runner): Observable<ResponseApi>{ 
    return this._http.post<ResponseApi>(Constants.URL_API + Constants.ENDPOINT_SAVE_RUNNER, runner); 
  }

  searchRunner(documentNumber: number, codDocumentType: string): Observable<ResponseApi>{
    let complementData = `?documentNumber=${documentNumber}&documentType=${codDocumentType}`;
    return this._http.get<ResponseApi>(Constants.URL_API + Constants.ENDPOINT_SEARCH_RUNNER + complementData); 
  }

  getLocalRunner$(): Observable<Runner>{
    return this.runner$.asObservable();
  }

  setLocalRunner$(runner: Runner): void{
    this.runner$.next(runner);
  }
}