import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OptionSelect } from 'src/app/data/interfaces/option-select.model';
import { InscriptionService } from 'src/app/data/services/inscription.service';
import { ParametryService } from 'src/app/data/services/parametry.service';

declare var window: any;

@Component({
  selector: 'app-create-inscription-data',
  templateUrl: './create-inscription-data.component.html',
  styleUrls: ['./create-inscription-data.component.scss'],
})
export class CreateInscriptionDataComponent implements OnInit {
  private readonly _formBuilder = inject(FormBuilder);
  private _parametryService = inject(ParametryService);
  private _inscriptionService = inject(InscriptionService);
  private _router = inject(Router);

  inscriptionForm: FormGroup = {} as FormGroup;
  payMethods: OptionSelect[] = [];
  races: OptionSelect[] = [];
  categories: OptionSelect[] = [];
  formModal!: any;

  // inscriptionForm = this._formBuilder.group({
  //     idRace:  ['', [Validators.required]],
  //     idRunner:  ['', [Validators.required]],
  //     idCategory:  ['', [Validators.required]],
  //     airlineCityOrigin:  [''],
  //     departureDate:  [''],
  //     returnDate:  [''],
  //     idPaymentMethod:  [''],
  //     proofPayment:  [''],
  //     detailsPayment:  ['', [Validators.required]],
  //     tshirtSize:  ['', [Validators.required]],
  //     authorizationListEnrolled:  [false],
  //     club:  [''],
  //     observations:  [''],
  //     acceptanceTyC:  [false, [Validators.required]]
  // })

  ngOnInit(): void {
    this.inscriptionForm = this.initForm();
    this.initSelects();
    this.inscriptionForm
      ?.get('idRunner')
      ?.setValue(sessionStorage.getItem('idRunner'));
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('modalSucription')
    );
  }

  initForm(): FormGroup {
    return this._formBuilder.group({
      idRace: ['', [Validators.required]],
      idRunner: ['', [Validators.required]],
      idCategory: ['', [Validators.required]],
      airlineCityOrigin: [null],
      departureDate: [null],
      returnDate: [null],
      idPaymentMethod: ['', [Validators.required]],
      proofPayment: [null],
      detailsPayment: [
        null,
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9]+$'),
        ],
      ],
      tshirtSize: [null, [Validators.required]],
      authorizationListEnrolled: [false],
      club: [null],
      observations: [null],
      acceptanceTyC: [false, [Validators.required]],
    });
  }

  initSelects() {
    this._parametryService.getParametryPayMethods().subscribe((response) => {
      this.payMethods = response as OptionSelect[];
    });
    this._parametryService.getRaces().subscribe((response) => {
      this.races = response.data;
    });
    this._parametryService.getCategories().subscribe((response) => {
      this.categories = response.data;
    });
  }

  onSubmit(): void {
    if (this.inscriptionForm.valid) {
      this._inscriptionService
        .createInscription(this.inscriptionForm.value)
        .subscribe((response) => {
          if (response.code == 0 || response.code == 3) {
            alert(response.message);
            this._inscriptionService.updateInsciption.emit(true);
            this.formModal.hide();
          }
          if (response.code == 2 || response.code == 4) {
            alert(response.message);
          }
        });
    }
  }
}
