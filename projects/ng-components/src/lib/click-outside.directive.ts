import { Directive, Output, ElementRef, EventEmitter, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[libClickoutside]'
})
export class ClickOutsideDirective {

  @Output() clickoutside: EventEmitter<any>;
  @Input() enableClass: string;
  constructor(private elementRef: ElementRef) {
      this.clickoutside = new EventEmitter<any>();
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    console.log('libClickoutside');
      const isInsideClicked = this.elementRef.nativeElement.contains(targetElement);
      const notifyIco = targetElement.classList.contains(this.enableClass);

      if (!isInsideClicked && !notifyIco) {
          this.clickoutside.emit(null);
      }

      // Example in https://stackblitz.com/edit/angular-click-outside?file=src%2Fapp%2Fdirective%2Fclick-outside.directive.ts
      /** const isInsideClicked = this.elementRef.nativeElement.contains(targetElement);
       
        * If whitelisting is enabled this directive will only 
        *  emit if the clicked element is outside and has a class whitelisted
        * In all the other cases it will emit if we click outside 
        
       if(this.enableWhiteListing) {
         const isWhiteListed = targetElement.classList.contains('whitelisted');
         if(!isInsideClicked && isWhiteListed) {
          
         }
       } else {
           this.clickoutside.emit(null);
       }*/
  }

}