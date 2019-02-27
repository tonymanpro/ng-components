import { Injectable, Component } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'lib-permision-component',
  template: `
    <p>
      ng-components works!
    </p>
  `,
  styles: []
})

@Injectable()
export class PermisionComponent implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    const permissions = JSON.parse(localStorage.getItem('PERMISSION')) as Array<string>;
    if (permissions && permissions.indexOf(url) !== -1) {
      return true;
    } else {
      return false;
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    const permissions = JSON.parse(localStorage.getItem('PERMISSION')) as Array<string>;
    if (permissions && permissions.indexOf(url) !== -1) {
      return true;
    } else {
      return false;
    }
  }

}
