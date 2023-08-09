import { DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ReportInscriptionData } from 'src/app/data/interfaces/report-inscription-data.model';
import { User } from 'src/app/data/interfaces/user.model';
import { InscriptionService } from 'src/app/data/services/inscription.service';
import { UserService } from 'src/app/data/services/user.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-report-inscription-data',
  templateUrl: './report-inscription-data.component.html',
  styleUrls: ['./report-inscription-data.component.scss']
})
export class ReportInscriptionDataComponent implements OnInit {

  reportInscriptionData: ReportInscriptionData[] = [];
  private _inscriptionService = inject(InscriptionService);
  private _userService = inject(UserService);
  private _router = inject(Router);

  private _user: User | null = {} as User;

  ngOnInit(): void {
    this.confirmUser();
  }

  confirmUser(){
    this._userService.getLocalUser$().subscribe(response => {
      this._user = response;
    });
    if (this._user == null) {
      this._router.navigate(['loginAdministrator']);
    }
    else {
      this.initData();
    }
  }

  initData(){
    this._inscriptionService.getReportInscription().subscribe(response => {
      if (response.code == 0) {
        this.reportInscriptionData = response.data;
      }
    })
  }

  exportExcel() {
    let tableElement = document.getElementById('tblExportInscriptions');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(tableElement);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Inscripciones');

    const datepipe: DatePipe = new DatePipe('en-US')
    let today = datepipe.transform(new Date(), 'dd-MMM-YYYY')

    XLSX.writeFile(book, "Inscripciones_" + today + ".xlsx");
  }
}
