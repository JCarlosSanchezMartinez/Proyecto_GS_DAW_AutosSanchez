import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginUser } from 'src/app/model/login-user';
import { Municipality } from 'src/app/model/Municipality';
import { Provinces } from 'src/app/model/Provinces';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged = false;
  isLoginFail= false;
  loginUser: LoginUser;
  userName: string;
  password: string;
  roles: string[] = [];
  errMsj: string;
  loading = false;
 

  constructor(private tokenService: TokenService,
              private authService: AuthService,
              private router: Router,
              private messageService: MessageService
    ) { }

  ngOnInit() {
    if(this.tokenService.getToken()) {
      this.isLogged=true;
      this.isLoginFail=false;
      this.roles = this.tokenService.getAuthorities();

    }
  }

  onLogin(): void {
    this.showLoadingSpinner();
    this.loginUser = new LoginUser(this.userName, this.password);
    this.authService.login(this.loginUser).subscribe(
      data => {
        this.isLogged = true;
        this.isLoginFail = false;

        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.userName);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        this.router.navigate(['/home']);
        window.location.reload();
        this.hideLoadingSpinner();
        this.messageService.add({severity:'success', summary:'Exito!', detail:'Se Inicio Sesion correctamente.'});
      },
      err => {
        this.isLogged = false;
        this.isLoginFail = true;
        this.errMsj = err.error.messaje;
        this.hideLoadingSpinner();
        this.messageService.add({severity:'error', summary:'Error!', detail:"Error al Iniciar Sesion."});
       
      }
    )
  }

  showLoadingSpinner() {
    this.loading = true;
  }
  
  hideLoadingSpinner() {
    this.loading = false;
  }
}
