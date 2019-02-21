import { NgModule } from '@angular/core';
import { NgComponentsComponent } from './ng-components.component';
import { ClickOutsideDirective } from './click-outside.directive';

@NgModule({
  declarations: [NgComponentsComponent, ClickOutsideDirective],
  imports: [
  ],
  exports: [NgComponentsComponent, ClickOutsideDirective]
})
export class NgComponentsModule { }
