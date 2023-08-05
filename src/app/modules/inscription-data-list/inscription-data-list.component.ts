import { Component, Input, OnInit, inject } from '@angular/core';
import { InscriptionData } from 'src/app/data/interfaces/inscription-data.model';
import { InscriptionService } from 'src/app/data/services/inscription.service';

@Component({
  selector: 'app-inscription-data-list',
  templateUrl: './inscription-data-list.component.html',
  styleUrls: ['./inscription-data-list.component.scss']
})
export class InscriptionDataListComponent implements OnInit{
  @Input() inscriptionsData!: InscriptionData[];

  private _inscriptionService = inject(InscriptionService);

  ngOnInit(): void {
    this._inscriptionService.updateInsciption.subscribe(data=>{
      let idRunner = parseInt(sessionStorage.getItem('idRunner') as string);
      this._inscriptionService.getInscription(idRunner ?? 0).subscribe(response=>{
        this.inscriptionsData = response.data;
      })
    })
  }
}
