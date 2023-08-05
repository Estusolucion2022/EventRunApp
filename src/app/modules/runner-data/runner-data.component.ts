import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { InscriptionData } from 'src/app/data/interfaces/inscription-data.model';
import { Runner } from 'src/app/data/interfaces/runner.model';
import { InscriptionService } from 'src/app/data/services/inscription.service';
import { RunnerService } from 'src/app/data/services/runner.service';

@Component({
  selector: 'app-runner-data',
  templateUrl: './runner-data.component.html',
  styleUrls: ['./runner-data.component.scss']
})
export class RunnerDataComponent implements OnInit{

  private _route = inject(Router);
  private _runnerService = inject(RunnerService);
  private _inscriptionService = inject(InscriptionService)

  runner:Runner = {} as Runner;
  inscriptionData: InscriptionData[] = [];

  ngOnInit(): void {
    this._runnerService.getLocalRunner$().subscribe(data=>{
      if (!data || data.id === undefined) this._route.navigate(['/'])
      this.runner = data;
      sessionStorage.setItem('idRunner', data?.id.toString() as string)

      this._inscriptionService.getInscription(this.runner.id).subscribe(response => {
        if(response.code == 0){
          this.inscriptionData = response.data;
        }
      })
    });
  }
}
