import { Component, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseApi } from 'src/app/data/interfaces/response-api.model';
import { UserService } from 'src/app/data/services/user.service';

interface FormUser {
  User: FormControl<string | null>;
}

interface FormCode {
  Code: FormControl<string | null>;
}

interface FormRecoverPassword {
  Password: FormControl<string | null>;
  ConfirmPassword: FormControl<string | null>;
}

@Component({
  selector: 'app-login-administrator',
  templateUrl: './login-administrator.component.html',
  styleUrls: ['./login-administrator.component.scss'],
})
export class LoginAdministratorComponent implements OnInit {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _userService = inject(UserService);
  private _router = inject(Router);
  showPassword: boolean[] = [true, false, false, false];
  private code!: string;
  loading: boolean = false;
  errorCode: boolean = false;

  loginForm: FormGroup = {} as FormGroup;

  ngOnInit(): void {
    this.loginForm = this.initForm();
  }

  initForm(): FormGroup {
    return this._formBuilder.group({
      userPlataform: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  formUser = this._formBuilder.group<FormUser>({
    User: new FormControl(null, [Validators.required]),
  });

  formCode = this._formBuilder.group<FormCode>({
    Code: new FormControl(null, [Validators.required]),
  });

  formRecoverPassword = this._formBuilder.group<FormRecoverPassword>({
    Password: new FormControl(null, [
      Validators.required,
      this.handleValidateRepeat('ConfirmPassword'),
    ]),
    ConfirmPassword: new FormControl(null, [
      Validators.required,
      this.handleValidateRepeat('Password'),
    ]),
  });

  onSubmit() {
    this._userService.getUser(this.loginForm.value).subscribe((response) => {
      if (response.data != null) {
        this._userService.SetUser(response.data);
        this._router.navigate(['reportInscriptions']);
      } else {
        alert('Usuario y/o clave incorrecta, por favor validar');
      }
    });
  }

  getValidation(name: string) {
    return this.formRecoverPassword.get(name);
  }

  handleValidateRepeatControl(): void {
    const rq = this.formRecoverPassword.value;
    if (rq.Password === rq.ConfirmPassword) {
      this.getValidation('Password')?.setErrors(null);
      this.getValidation('ConfirmPassword')?.setErrors(null);
    }
  }

  handleValidateRepeat(name: string): ValidatorFn {
    return (control: AbstractControl) => {
      const controlValue = <string>control.value;

      if (!controlValue) return null;

      const controlRepeat = this.formRecoverPassword.get(name)?.value;

      if (!controlRepeat) return null;

      if (controlValue != controlRepeat) {
        return { repeatValidation: true };
      }

      return null;
    };
  }

  onSubmitEmail(model: FormGroup<FormUser>): void {
    if (model.invalid) return;
    this.loading = true;
    this._userService.sendEmail(model.value.User!).subscribe(
      (res: ResponseApi) => {
        this.code = res.data;
        this.showPassword = [false, false, true, false];
      },
      () => (this.loading = false),
      () => (this.loading = false)
    );
  }

  onSubmitCode(model: FormGroup<FormCode>): void {
    if (model.invalid) return;
    if (model.value.Code?.toString() == this.code.toString()) {
      this.errorCode = false;
      this.showPassword = [false, false, false, true];
    } else this.errorCode = true;
  }

  onSubmitRecoverPassword(model: FormGroup<FormRecoverPassword>): void {
    if (model.invalid) return;
    let user = this.formUser.value.User;
    let password = model.value.Password;
    this._userService.updatePassword(user!, password!).subscribe(
      (res: ResponseApi) => {
        if (res.code === 0) {
          alert('¡Clave actualizada!');
          this.showPassword = [true, false, false, false];
        }
      },
      () => {
        this.loading = false
        alert('Error al actualizar la clave');
      },
      () => (this.loading = false)
    );
  }
}
