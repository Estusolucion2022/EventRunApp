import { Component, Input, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { OptionSelect } from 'src/app/data/interfaces/option-select.model';
import { Runner } from 'src/app/data/interfaces/runner.model';
import { ParametryService } from 'src/app/data/services/parametry.service';
import { RunnerService } from 'src/app/data/services/runner.service';
import { TriggerService } from 'src/app/data/services/trigger.service';

@Component({
  selector: 'app-form-report',
  templateUrl: './form-report.component.html',
  styleUrls: ['./form-report.component.scss'],
})
export class FormReportComponent {
  private readonly _formBuilder = inject(FormBuilder);
  private _runnerService = inject(RunnerService);
  private _parametryService = inject(ParametryService);
  private _trigger = inject(TriggerService);

  runnerForm: FormGroup = {} as FormGroup;
  runner: Runner = {} as Runner;
  progress: number = 0;
  step: number = 0;
  documentTypes: OptionSelect[] = [];
  cities: OptionSelect[] = [];
  countries: OptionSelect[] = [];
  genders: OptionSelect[] = [];
  formModal!: any;
  loading: boolean = false;

  ngOnInit(): void {
    this.runnerForm = this.initForm();
    this.initSelects();
    this.getDataRunner()
  }

  getDataRunner(): void {
    this.loading = true
    this._trigger.runnerForm$.subscribe((res: Runner | null) => {
      this.step = 0;
      this.progress = 0;
      this.runnerForm = this.initForm();

      if (!res) return
      
      const runnerData = {
        id: res.id,
        codeDocumentType: res.codeDocumentType,
        documentNumber: res.documentNumber,
        firstName: res.firstName,
        lastName: res.lastName,
        email: res.email,
        phone: res.phone,
        birthDate: this._trigger.convertDate(res.birthDate),
        codeCity: res.codeCity,
        address: res.address,
        bloodType: res.bloodType,
        codeCountryNationality: res.codeCountryNationality,
        idGender: res.idGender,
        emergencyContactName: res.emergencyContactName,
        emergencyContactPhone: res.emergencyContactPhone,
      }
      Object.keys(runnerData).forEach((element)  => {
        this.runnerForm.controls?.[element].setValue((runnerData as any)[element])
      });
      this.loading = false
    })
  }

  initForm(): FormGroup {
    return this._formBuilder.group({
      id: '',
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      birthDate: ['', [Validators.required, this.handleValidateDate()]],
      codeDocumentType: ['CC', [Validators.required]],
      documentNumber: [
        '',
        [Validators.required, Validators.pattern(/^[A-Za-z0-9]+$/)],
      ],
      codeCity: ['', [Validators.required]],
      address: ['', [Validators.required]],
      bloodType: ['', [Validators.required]],
      codeCountryNationality: ['', [Validators.required]],
      idGender: ['', [Validators.required]],
      emergencyContactName: ['', [Validators.required]],
      emergencyContactPhone: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+$')],
      ],
      description: ['', [Validators.required]]
    });
  }

  initSelects() {
    this._parametryService.getParametryDocumentTypes().subscribe((data) => {
      this.documentTypes = data as OptionSelect[];
    });
    this._parametryService.getParametryCities().subscribe((data) => {
      this.cities = data as OptionSelect[];
    });
    this._parametryService.getParametryCountries().subscribe((data) => {
      this.countries = data as OptionSelect[];
    });
    this._parametryService.getParametryGenders().subscribe((data) => {
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
        this.progress = 33;
        this.step = 1;
        break;
      case 2:
        this.progress = 66;
        this.step = 2;
        break;
    }
  }

  onSubmit(): void {
    if (this.runnerForm.valid) {
      const descripcion = this.runnerForm.controls?.['description'].value
      this.progress = 100;
      console.log(this.runnerForm.value)
    
      this._runnerService
        .updateRunner(descripcion, this.runnerForm.value)
        .subscribe((response) => {
          if (response.code == 0) {
            this._trigger.setRunnerForm(null)
            alert(response.message);
          }
        });
    }
  }


  //#region Validators
  getValidation(name: string) {
    return this.runnerForm.get(name);
  }

  handleInvalidOne(): boolean {
    return (
      (this.getValidation('codeDocumentType')?.invalid as boolean) ||
      (this.getValidation('documentNumber')?.invalid as boolean)
    );
  }

  handleInvalidSecond(): boolean {
    return (
      (this.getValidation('firstName')?.invalid as boolean) ||
      (this.getValidation('lastName')?.invalid as boolean) ||
      (this.getValidation('bloodType')?.invalid as boolean) ||
      (this.getValidation('birthDate')?.invalid as boolean) ||
      (this.getValidation('email')?.invalid as boolean) ||
      (this.getValidation('phone')?.invalid as boolean)
    );
  }

  handleInvalidThird(): boolean {
    return (
      (this.getValidation('codeCity')?.invalid as boolean) ||
      (this.getValidation('address')?.invalid as boolean) ||
      (this.getValidation('codeCountryNationality')?.invalid as boolean) ||
      (this.getValidation('idGender')?.invalid as boolean) ||
      (this.getValidation('emergencyContactName')?.invalid as boolean) ||
      (this.getValidation('emergencyContactName')?.invalid as boolean) ||
      (this.getValidation('description')?.invalid as boolean)
    );
  }

  handleValidateDate(): ValidatorFn {
    return (control: AbstractControl) => {
      const controlValue = <string>control.value;
      if (!controlValue) return null;

      let dateNow = new Date(new Date().getFullYear() - 7, new Date().getMonth(), new Date().getDate())
      let dateMax = new Date(new Date(controlValue).getFullYear() + 90, new Date(controlValue).getMonth(), new Date(controlValue).getDate())
      const minDate = Math.round((dateNow.getTime() - new Date(controlValue).getTime()) / (1000*60*60*24));
      const maxDate = Math.round((dateMax.getTime() - new Date().getTime()) / (1000*60*60*24));

      if (minDate < 0 || maxDate < 0) {
        return { dateValidation: true };
      }

      return null;
    };
  }

  //#endregion
}
