import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, SelectControlValueAccessor, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OptionSelect } from 'src/app/data/interfaces/option-select.model';
import { Runner } from 'src/app/data/interfaces/runner.model';
import { ParametryService } from 'src/app/data/services/parametry.service';
import { RunnerService } from 'src/app/data/services/runner.service';

@Component({
  selector: 'app-create-runner',
  templateUrl: './create-runner.component.html',
  styleUrls: ['./create-runner.component.scss']
})
export class CreateRunnerComponent implements OnInit{

  private readonly _formBuilder = inject(FormBuilder);
  private _runnerService = inject(RunnerService);
  private _parametryService = inject(ParametryService);
  private _router = inject(Router);

  runnerForm: FormGroup = {} as FormGroup;
  runner: Runner = {} as Runner;
  progress: number = 0;
  step: number = 0;
  documentTypes: OptionSelect[] = [];
  cities: OptionSelect[] = [];
  countries: OptionSelect[] = [];
  genders: OptionSelect[] = [];

  ngOnInit(): void {
    this.runnerForm = this.initForm();
    this.initSelects();
  }

  initForm(): FormGroup {
    return this._formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      birthDate: ['', [Validators.required]],
      codeDocumentType: ['CC', [Validators.required]],
      //documentNumber: ['79856908', [Validators.required]],
      documentNumber: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9]+$/)]],
      codeCity: ['', [Validators.required]],
      address: ['', [Validators.required]],
      bloodType: ['', [Validators.required]],
      codeCountryNationality: ['', [Validators.required]],
      idGender: ['', [Validators.required]],
      emergencyContactName: ['', [Validators.required]],
      emergencyContactPhone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }

  initSelects() {
    this._parametryService
      .getParametryDocumentTypes()
      .subscribe((data) => {
        this.documentTypes = data as OptionSelect[];
      });
    this._parametryService
      .getParametryCities()
      .subscribe((data) => {
        this.cities = data as OptionSelect[];
      });
    this._parametryService
      .getParametryCountries()
      .subscribe((data) => {
        this.countries = data as OptionSelect[];
      });
    this._parametryService
      .getParametryGenders()
      .subscribe((data) => {
        this.genders = data as OptionSelect[];
      });
  }

  changeStep(step: number) {
    switch (step) {
      case 0:
        this.progress = 0;
        this.step = 0;
        break;
      case 1:
        if (
          this.runnerForm.get('documentNumber') &&
          this.runnerForm.get('codeDocumentType')
        ) {
          this._runnerService.searchRunner(
            this.runnerForm.get('documentNumber')?.value,
            this.runnerForm.get('codeDocumentType')?.value
          ).subscribe(response => {
            if(response.data != null){
              this.runner = response.data;
              this.goToRunnerData();
            }
            else{
              this.progress = 25;
              this.step = 1;
            }
          });
        }
        break;
      case 2:
        this.progress = 50;
        this.step = 2;
        break;
    }
  }

  onSubmit(): void {
    if (this.runnerForm.valid){
      this.progress = 75;
      this._runnerService.createRunner(this.runnerForm.value).subscribe((response) => {
        if (response.code == 0) {
          this.runner = response.data;
          alert(response.message);
          this.goToRunnerData();
        }
      });
    }
  }

  goToRunnerData(){
    this._runnerService.setLocalRunner$(this.runner);
    this._router.navigate(['runnerData']);
  }


  //#region Validators
  getValidation(name: string) {
    return this.runnerForm.get(name)
  }

  handleInvalidOne(): boolean {
    return this.getValidation('codeDocumentType')?.invalid as boolean
    || this.getValidation('documentNumber')?.invalid as boolean
  }

  handleInvalidSecond(): boolean {
    return this.getValidation('firstName')?.invalid as boolean
    || this.getValidation('lastName')?.invalid as boolean
    || this.getValidation('bloodType')?.invalid as boolean
    || this.getValidation('email')?.invalid as boolean
    || this.getValidation('phone')?.invalid as boolean
    || this.getValidation('birthDate')?.invalid as boolean
  }

  handleInvalidThird(): boolean {
    return this.getValidation('codeCity')?.invalid as boolean
    || this.getValidation('address')?.invalid as boolean
    || this.getValidation('codeCountryNationality')?.invalid as boolean
    || this.getValidation('idGender')?.invalid as boolean
    || this.getValidation('emergencyContactName')?.invalid as boolean
    || this.getValidation('emergencyContactPhone')?.invalid as boolean
  }

  //#endregion
}
