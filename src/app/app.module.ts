import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './common/components/layout/layout.module';
import { CampaignWizardModule } from './common/components/campaign-wizard/campaign-wizard.module';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    CampaignWizardModule,
    MatNativeDateModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
