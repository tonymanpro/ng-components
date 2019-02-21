import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export abstract class NgComponentsService {

  protected abstract apiArray: any[];
  protected abstract bearerToken: string;

  constructor(
    private http: HttpClient,
    public router: Router
  ) { }

  get(apiName: string, service: string, customHeader?: any): Observable<any> {
    const _url = this.url(apiName, service);
    return this.request(_url, 'GET', null, customHeader);
  }

  post(apiName: string, service: string, body?: any, params?: any): Observable<any> {
    const _url = this.url(apiName, service);
    return this.request(_url, 'POST', body, params);
  }

  put(apiName: string, service: string, body?: any, params?: any): Observable<any> {
    const _url = this.url(apiName, service);
    return this.request(_url, 'PUT', body);
  }

  patch(apiName: string, service: string, body?: any, params?: any): Observable<any> {
    const _url = this.url(apiName, service);
    return this.request(_url, 'PATCH', body);
  }

  del(apiName: string, service: string): Observable<any> {
    const _url = this.url(apiName, service);
    return this.request(_url, 'DELETE');
  }

  private request(url: string, verb: string, body?: any, customHeader?: any): Observable<any> {
    if (url) {
      let _request: any = null;
      const _bodyStr = JSON.stringify(body);

      let header = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.bearerToken}`
      };

      if (customHeader) {
        _.merge(header, customHeader);
      }

      const _options = {
        body: _bodyStr || '',
        withCredentials: false,
        params: new HttpParams(),
        headers: new HttpHeaders(header)
      };

      if (verb === 'GET') {
        _request = this.http.get(url, _options).pipe(
          catchError(this.handleError.bind(this)) // then handle the error
        );
      } else if (verb === 'POST') {
        _request = this.http.post(url, _bodyStr, _options).pipe(
          catchError(this.handleError.bind(this)) // then handle the error
        );
      } else if (verb === 'PUT') {
        _request = this.http.put(url, _bodyStr, _options).pipe(
          catchError(this.handleError.bind(this)) // then handle the error
        );
      } else if (verb === 'DELETE') {
        _request = this.http.delete(url, _options).pipe(
          catchError(this.handleError.bind(this)) // then handle the error
        );
      } else if (verb === 'PATCH') {
        _request = this.http.patch(url, _bodyStr, _options).pipe(
          catchError(this.handleError.bind(this)) // then handle the error
        );
      }
      return _request;
    }
    return observableThrowError('Api endpoint not found!');
  }

  private handleError(error: HttpErrorResponse | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      console.log(errMsg);
    } else {
      const primatyMsj = error.message ? error.message : error.toString();
      const catchedMsj = error.error ? error.error.message : '';
      errMsg = `${error.status || ''} - ${primatyMsj} - ${catchedMsj}`;
      console.log(errMsg);
    }

    if (error instanceof HttpErrorResponse) {
      // Server or connection error happened
      if (!navigator.onLine) {
        // Handle offline error
        errMsg = 'Servicio fuera de linea, favor intente más tarde';
      } else if (error.status) {
        switch (error.status) {
          case 401:
            this.router.navigate(['logout'], { queryParams: { isSesionExpired: true } });
            return;
          case 400:
          case 500:
            errMsg = 'Lo sentimos hubo un error en la applicación, por favor intente más tarde';
            break;
          case 404:
          case 501:
          case 502:
          case 503:
          case 504:
            errMsg = 'Error con el servidor, favor trate más tarde';
            break;
          case -1:
            errMsg = 'Tiempo de espera excedido, favor intente en unos momentos';
            break;
          default:
            console.error(error);
            errMsg = error.error && (error.error.message && error.error.message != 'null') ?
              error.error.message : 'Lo sentimos hubo un error en la applicación, por favor intente más tarde';
        }
      }
    } else if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errMsg = error.error.message;
      console.error('An error occurred:', error.error.message);
    } else if (error.error && error.error.message !== undefined) {
      // A client-side or network error occurred. Handle it accordingly.
      errMsg = error.error.message;
      console.error('An error occurred:', error.error.message);
      return observableThrowError(error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return observableThrowError(new Error(errMsg ? errMsg : 'Something bad happened; please try again later.'));
  }

  public url(apiName: string, service: string): string {
    const _api = this.apiArray.find((api: any) => {
      return api['name'] === apiName;
    });
    if (_api) {
      const _apiUrl = _api['url'];
      return `${_apiUrl}/${service}`;
    }
    return null;
  }

}