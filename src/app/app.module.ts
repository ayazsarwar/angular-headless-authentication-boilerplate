import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './router/app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,

    LoginComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule
  ],

  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
