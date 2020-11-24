import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { UserCrudService } from 'src/app/services/user-crud.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  
  public formNewUser: FormGroup;
  public user : User =  new User();

  isLogged = false;

  constructor(
    private userService: UserCrudService,
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,

  ) { }

  ngOnInit() {
    this.buildFrom();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
    
  }

  private buildFrom(){
    this.formNewUser = new FormGroup({});
    this.formNewUser.addControl('inputFirstName', new FormControl('', Validators.required));
    this.formNewUser.addControl('inputEmail', new FormControl('', Validators.required));
    this.formNewUser.addControl('inputUserName', new FormControl('', Validators.required));
    this.formNewUser.addControl('inputPassWord', new FormControl('', Validators.required));

  }
  onRegister(): void {  
    this.user.firstName =  this.formNewUser.controls.inputFirstName.value
    this.user.email =  this.formNewUser.controls.inputEmail.value
    this.user.username =  this.formNewUser.controls.inputUserName.value
    this.user.password =  this.formNewUser.controls.inputPassWord.value

    this.authService.addUser(this.user).subscribe(
      data => {alert('Cuenta Creada');

      }
    );
  }


}
