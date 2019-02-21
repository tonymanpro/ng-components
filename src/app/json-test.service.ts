import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgComponentsService } from 'projects/ng-components/src/public_api';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JsonTestService extends NgComponentsService {

  protected apiArray: any[] =[
    { name: 'prueba', url: 'https://jsonplaceholder.typicode.com' },
    { name: 'kipo', url: 'https://ms-kipo-dot-apis-impesa-dev.appspot.com/kipo' }
  ];
  protected bearerToken: string = 'holas';

  constructor(
    http: HttpClient,
    router: Router
  ) {
    super(http, router);
  }
}
