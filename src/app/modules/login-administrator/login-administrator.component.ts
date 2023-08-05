import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/data/services/user.service';

@Component({
  selector: 'app-login-administrator',
  templateUrl: './login-administrator.component.html',
  styleUrls: ['./login-administrator.component.scss']
})
export class LoginAdministratorComponent implements OnInit {

  private readonly _formBuilder = inject(FormBuilder);
  private readonly _userService = inject(UserService);
  private _router = inject(Router);

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

  onSubmit(){
    this._userService.getUser(this.loginForm.value).subscribe(response => {
      if(response.data != null){
        this._userService.SetUser(response.data);
        this._router.navigate(['reportInscriptions']);
      }
      else{
        alert('Usuario y/o clave incorrecta, por favor validar')
      }
    })
  }
}
