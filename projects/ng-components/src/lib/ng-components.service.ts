import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError as observableThrowError, Observable, ReplaySubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable, ɵMethodFn } from '@angular/core';
import * as _ from 'lodash';
import * as util from 'util';
import { MethodCall } from '@angular/compiler';

@Injectable()
export abstract class NgComponentsService {

    protected abstract apiArray: any[];
    public errorCode: any;
    protected abstract bearerToken: string;
    protected abstract lang: string;

    constructor(
        private http: HttpClient,
        public router: Router
    ) { this.chargeError(); }

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

            const header = {
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
        }

        if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
                this.router.navigate(['logout'], { queryParams: { isSesionExpired: true } });
                return;
            } else {
                errMsg = this.errorReponse(error);
            }
        } else if (error && error.error instanceof ErrorEvent) {
            errMsg = error.error.message;
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return observableThrowError(new Error(errMsg ? errMsg : 'Something bad happened; please try again later.'));
    }

    public url(apiName: string, service: string): string {
        console.log('url');
        const _api = this.apiArray.find((api: any) => {
            return api['name'] === apiName;
        });
        if (_api) {
            const _apiUrl = _api['url'];
            return `${_apiUrl}/${service}`;
        }
        return null;
    }

    private errorMessage(error): string {
        const _api = this.errorCode.find((api: any) => {
            return api['code'] === error.status;
        });
        if (_api) {
            const message = _api['message'];
            if (typeof (message) === 'object') {
                return this.getReponseMessage(message, error);
            }
            return _api['message'];
        } else {
            return this.errorCode['default'];
        }
    }

    private chargeError() {
        this.http.get('./assets/error.json', { responseType: 'json' })
            .subscribe(
                data => {
                    this.errorCode = data[this.lang];
                },
                (err: HttpErrorResponse) => {
                    console.log(`ErrorPapu: ${err.message}`);
                }
            );
    }

    private getReponseMessage(params, data) {
        if (params.type === 'handler') {
            return _.get(data, params.path);
        }
        return data;
    }

    public errorReponse(error) {
        let errMsg;
        if (!navigator.onLine) {
            errMsg = this.errorMessage({ 'status': -2 });
        } else if (error.status) {
            const existError = this.errorCode.find((api: any) => {
                return api['code'] === error.status;
            });
            if (existError) {
                errMsg = this.errorMessage(error);
            } else { errMsg = this.errorMessage({ status: 0 }); }
        }
        return errMsg;
    }


}