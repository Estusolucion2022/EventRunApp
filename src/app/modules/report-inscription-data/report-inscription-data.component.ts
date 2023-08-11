import { DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ReportInscriptionData } from 'src/app/data/interfaces/report-inscription-data.model';
import { ResponseApi } from 'src/app/data/interfaces/response-api.model';
import { User } from 'src/app/data/interfaces/user.model';
import { InscriptionService } from 'src/app/data/services/inscription.service';
import { UserService } from 'src/app/data/services/user.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-report-inscription-data',
  templateUrl: './report-inscription-data.component.html',
  styleUrls: ['./report-inscription-data.component.scss'],
})
export class ReportInscriptionDataComponent implements OnInit {
  reportInscriptionData: ReportInscriptionData[] = [];
  newReportData: ReportInscriptionData[] = [];
  indexPag: number[] = [];
  pagNumber: number = 0;
  private _inscriptionService = inject(InscriptionService);
  private _userService = inject(UserService);
  private _router = inject(Router);

  private _user: User | null = {} as User;

  ngOnInit(): void {
    this.confirmUser();
  }

  confirmUser() {
    this._userService.getLocalUser$().subscribe((response) => {
      this._user = response;
    });
    if (this._user == null) {
      this._router.navigate(['loginAdministrator']);
    } else {
      this.initData();
    }
  }

  initData() {
    this._inscriptionService.getReportInscription().subscribe((response) => {
      if (response.code == 0) {
        this.reportInscriptionData = response.data;
        this.handlePaginator(0);
      }
    });
  }

  handlePaginator(pag: number): void {
    this.pagNumber = pag;
    this.getIndexPages()
    let numberPag = this.getNumberPages();
    if (numberPag < this.pagNumber + 1) return;
    this.newReportData = [];
    let startPag = this.pagNumber !== 0 ? this.pagNumber * 10 : this.pagNumber;
    let endPag =
      this.pagNumber !== 0 ? this.pagNumber * 10 + 10 : this.pagNumber + 10;
    let data = this.reportInscriptionData;
    let endItems =
      data.length - endPag < 0 ? data.length - endPag + endPag : endPag;

    for (let i = startPag; i < endItems; i++) {
      this.newReportData.push(data[i]);
    }
  }

  getNumberPages(): number {
    let data = this.reportInscriptionData;
    let numberPages = (data.length / 10) + 0.4
    return Math.round(numberPages);
  }

  getIndexPages(): number[] {
    this.indexPag = [];
    let startPag = this.pagNumber !== 0 ? this.pagNumber * 10 : this.pagNumber;
    let endPag =
      this.pagNumber !== 0 ? this.pagNumber * 10 + 10 : this.pagNumber + 10;

    for (let i = startPag; i < endPag; i++) {
      this.indexPag.push(i);
    }
    return this.indexPag;
  }

  exportExcel() {
    let tableElement = document.getElementById('tblExportInscriptions');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(tableElement);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Inscripciones');

    const datepipe: DatePipe = new DatePipe('en-US');
    let today = datepipe.transform(new Date(), 'dd-MMM-YYYY');

    XLSX.writeFile(book, 'Inscripciones_' + today + '.xlsx');
  }
}
