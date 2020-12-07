import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Municipality } from 'src/app/model/Municipality';
import { Provinces } from 'src/app/model/Provinces';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/services/auth.service';
import { CommonCrudService } from 'src/app/services/common-crud.service';
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
  public provincesList: { id: string; province: string; }[];
  public municipalityList: { id: string; municipio: string; }[];
  public selectedActiveProvince: Provinces;
  public selectedActiveMunicipality: Municipality;
  public countryActive = false;
  public loading = false;
  errMsj: string;
  isLogged = false;

  constructor(
    private userService: UserCrudService,
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private common: CommonCrudService,
    private messageService: MessageService

  ) { }

  ngOnInit() {
    this.buildFrom();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
    
    this.loadCombos();
  }

  private buildFrom(){
    this.formNewUser = new FormGroup({});
    this.formNewUser.addControl('inputFirstName', new FormControl('',[Validators.required]));
    this.formNewUser.addControl('inputEmail', new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100)]));
    this.formNewUser.addControl('inputUserName', new FormControl('',[Validators.required]));
    this.formNewUser.addControl('inputPassWord', new FormControl('',[Validators.required]));
    this.formNewUser.addControl('selectProvince', new FormControl('',[Validators.required]));
    this.formNewUser.addControl('selectMunicipality', new FormControl('',[Validators.required]));

  }
  onRegister(): void {  
    this.user.firstName =  this.formNewUser.controls.inputFirstName.value
    this.user.email =  this.formNewUser.controls.inputEmail.value
    this.user.username =  this.formNewUser.controls.inputUserName.value
    this.user.password =  this.formNewUser.controls.inputPassWord.value

    this.common.getMunicipality(this.formNewUser.controls.selectMunicipality.value.id).subscribe((data:any)=>{this.municipalityList=data})
    this.user.municipality =  this.selectedActiveMunicipality;
    
    
    
    this.authService.addUser(this.user).subscribe(
      data => {{
        this.messageService.add({severity:'success', summary:'Exito!', detail:'Se ha creado el Usuario correctamente.'});
          this.hideLoadingSpinner();
  
        }
      }, error => {
        if (error.status === 403) {
          this.hideLoadingSpinner();
          this.messageService.add({severity:'error', summary:'Error!', detail:'You have insufficient privileges to perform this action'});
        } else if (error.status === 401) {
          this.hideLoadingSpinner();
          this.messageService.add({severity:'error', summary:'Error!', detail:'Access is denied'});
        } else if (error.status === 400) {
          this.hideLoadingSpinner();          
          this.messageService.add({severity:'error', summary:'Error!', detail: error.error.message});
        } else if (error.status === 404) {
          this.hideLoadingSpinner();
          this.messageService.add({severity:'error', summary:'Error!', detail:'No data found.'});
        } else {
          this.hideLoadingSpinner();
          this.messageService.add({severity:'error', summary:'Error!', detail:'An error occurred, try again later and if the error persists contact the System Administrator'});
        }
      });
  }

  onChangeProvinces(event: any){

    this.common.getMunicipalityProvince(this.formNewUser.controls.selectProvince.value.id)
    .subscribe(municipality => {this.municipalityList = municipality.map(municipio =>
       ({id: municipio.id,  municipio: municipio.municipio}) )});
      
  }

  loadCombos(){
    this.common.getProvinceList().subscribe(provinces => {
      this.provincesList = provinces.map(province => ({id: province.id,  province: province.province}))
        
    });
  }

  showLoadingSpinner() {
    this.loading = true;
  }

  hideLoadingSpinner() {
    this.loading = false;
  }

}

