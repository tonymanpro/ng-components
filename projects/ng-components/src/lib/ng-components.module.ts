import { NgModule } from '@angular/core';
import { NgComponentsComponent } from './ng-components.component';
import { ClickOutsideDirective } from './click-outside.directive';
import { PermisionComponent } from './permision.component';
import { PermisionDirective } from './permision.directive';

@NgModule({
  declarations: [
    NgComponentsComponent,
    ClickOutsideDirective,
    PermisionComponent,
    PermisionDirective],
  imports: [
  ],
  exports: [NgComponentsComponent, ClickOutsideDirective, PermisionDirective],
  providers: [PermisionComponent]
})
export class NgComponentsModule { }
