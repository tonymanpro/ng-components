import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgComponentsModule } from 'ng-components';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PermisionComponent } from 'projects/ng-components/src/public_api';
import { DetailComponent } from './dashboard/detail/detail.component';
import { EditComponent } from './dashboard/edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DetailComponent,
    EditComponent,
    PermisionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgComponentsModule
  ],
  providers: [PermisionComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
