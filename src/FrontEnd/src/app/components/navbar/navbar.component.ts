import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { RegisterComponent } from 'src/app/auth/register/register.component';
import { VehicleGuardService } from 'src/app/interceptors/vehicle-guard.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [DialogService,ConfirmationService]
})
export class NavbarComponent implements OnInit {

  constructor(private tokenService: TokenService,
    public dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
    private guard: VehicleGuardService) { }
  isAdmin = false;
  isLogged = false;
  isCollapse = true;
  public loading = null;


  ngOnInit() {
   
    if(this.tokenService.getToken()){
    this.isLogged=true;
    const roles = this.tokenService.getAuthorities();
    roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
       this.isAdmin=true;
      }
    });

    } else {
      this.isLogged=false;
    }

  } 
  toggleState() {
    let foo = this.isCollapse
    this.isCollapse = foo === false ? true : false;
  }

  logout(){
    this.tokenService.logOut();
    window.location.reload();
    this.router.navigate(['/home']);
    
  }

  showModalLogin() {
    const ref = this.dialogService.open(LoginComponent, {
        width: '40%'
    });
  }
  showModalRegister() {
    const ref = this.dialogService.open(RegisterComponent, {
        width: '60%'
    });
  }

  showModalConfirmLogOut() {
    this.showLoadingSpinner();
    this.confirmationService.confirm({
      message: '¿Desea Cerrar la sesion?',
      header: 'Cerrar Sesion',
      icon: 'fas fa-question-circle',
      accept: () => { this.logout();/* window.location.reload();*/  }
    });
    this.hideLoadingSpinner();
  }

  showLoadingSpinner() {
    this.loading = true;
  }

  hideLoadingSpinner() {
    this.loading = false;
  }
  
}

