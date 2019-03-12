import { Directive, Input, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[libPermision]'
})
export class PermisionDirective {
  @Input() isValid: any;
  @Input() action: string;
  constructor(
    private _elementRef: ElementRef,
    private router: Router
  ) { }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this._checkPermisions();
  }

  private _checkPermisions(): void {
    const currentUrl = `${this.router.url}/${this.action}`.toLowerCase();
    const el: HTMLElement = this._elementRef.nativeElement;
    const permissions = JSON.parse(localStorage.getItem('PERMISSION')) as Array<string>;
    if (permissions && (this.isValid === true || this.isValid === undefined)
      && permissions.indexOf(currentUrl) === -1) {
      el.remove();
    }
  }

}
