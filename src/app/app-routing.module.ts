import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRunnerComponent } from './modules/create-runner/create-runner.component';
import { RunnerDataComponent } from './modules/runner-data/runner-data.component';
import { CreateInscriptionDataComponent } from './modules/create-inscription-data/create-inscription-data.component';
import { ReportInscriptionDataComponent } from './modules/report-inscription-data/report-inscription-data.component';
import { LoginAdministratorComponent } from './modules/login-administrator/login-administrator.component';

const routes: Routes = [ 
  { path: '', component: CreateRunnerComponent },
  { path: 'createRunner', component: CreateRunnerComponent },
  { path: 'runnerData', component: RunnerDataComponent },
  { path: 'createInscription/:idRunner', component: CreateInscriptionDataComponent },
  { path: 'reportInscriptions', component: ReportInscriptionDataComponent},
  { path: 'loginAdministrator', component: LoginAdministratorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
