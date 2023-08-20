import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InscriptionData } from 'src/app/data/interfaces/inscription-data.model';
import { OptionSelect } from 'src/app/data/interfaces/option-select.model';
import { InscriptionService } from 'src/app/data/services/inscription.service';
import { ParametryService } from 'src/app/data/services/parametry.service';
import { TriggerService } from 'src/app/data/services/trigger.service';

@Component({
  selector: 'app-form-runner',
  templateUrl: './form-runner.component.html',
  styleUrls: ['./form-runner.component.scss'],
})
export class FormRunnerComponent {
  private readonly _formBuilder = inject(FormBuilder);
  private _parametryService = inject(ParametryService);
  private _inscriptionService = inject(InscriptionService);
  private _trigger = inject(TriggerService);

  inscriptionForm: FormGroup = {} as FormGroup;
  payMethods: OptionSelect[] = [];
  races: OptionSelect[] = [];
  categories: OptionSelect[] = [];
  formModal!: any;
  loading: boolean = false;

  ngOnInit(): void {
    this.inscriptionForm = this.initForm();
    this.initSelects();
    this.getDataRunner();
  }

  getDataRunner(): void {
    this.loading = true;
    this._trigger.raceForm$.subscribe((res: InscriptionData | null) => {
      if (!res) return;
      this.inscriptionForm = this.initForm();

      const raceData = {
        idRace: res.idRace,
        idRunner: res.idRunner,
        idCategory: res.idCategory,
        airlineCityOrigin: res.airlineCityOrigin,
        departureDate: this._trigger.convertDate(res.departureDate),
        returnDate: this._trigger.convertDate(res.returnDate),
        idPaymentMethod: res.idPaymentMethod,
        proofPayment: res.proofPayment,
        detailsPayment: res.detailsPayment,
        tshirtSize: res.tshirtSize,
        authorizationListEnrolled: res.authorizationListEnrolled,
        club: res.club,
        observations: res.observations,
        acceptanceTyC: res.acceptanceTyC,
        registrationDate: res.registrationDate,
      };
      Object.keys(raceData).forEach((element) => {
        this.inscriptionForm.controls?.[element].setValue(
          (raceData as any)[element]
        );
      });
      this.loading = false;
    });
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
        [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')],
      ],
      tshirtSize: [null, [Validators.required]],
      authorizationListEnrolled: [false],
      club: [null],
      observations: [null],
      acceptanceTyC: [false, [Validators.required]],
      registrationDate: [''],
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
      this.loading = true;
      this._inscriptionService
        .updateInscription(this.inscriptionForm.value)
        .subscribe(
          (response) => {
            if (response.code == 0 || response.code == 3) {
              this._trigger.setRaceForm(null);
              alert(response.message);
            }
            if (response.code == 2 || response.code == 4) {
              alert(response.message);
            }
          },
          null,
          () => {
            this.loading = false;
          }
        );
    }
  }
}
