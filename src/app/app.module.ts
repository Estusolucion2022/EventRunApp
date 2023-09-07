import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateRunnerComponent } from './modules/create-runner/create-runner.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RunnerDataComponent } from './modules/runner-data/runner-data.component';
import { CreateInscriptionDataComponent } from './modules/create-inscription-data/create-inscription-data.component';
import { InscriptionDataListComponent } from './modules/inscription-data-list/inscription-data-list.component';
import { ReportInscriptionDataComponent } from './modules/report-inscription-data/report-inscription-data.component';
import { LoginAdministratorComponent } from './modules/login-administrator/login-administrator.component';
import { FormReportComponent } from './modules/report-inscription-data/form-report/form-report.component';
import { FormRunnerComponent } from './modules/report-inscription-data/form-runner/form-runner.component';


@NgModule({
  declarations: [
    AppComponent,
    CreateRunnerComponent,
    RunnerDataComponent,
    CreateInscriptionDataComponent,
    InscriptionDataListComponent,
    ReportInscriptionDataComponent,
    LoginAdministratorComponent,
    FormReportComponent,
    FormRunnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
