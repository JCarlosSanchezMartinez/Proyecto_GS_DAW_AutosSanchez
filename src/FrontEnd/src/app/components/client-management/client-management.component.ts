import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Municipality } from 'src/app/model/Municipality';
import { Provinces } from 'src/app/model/Provinces';
import { User } from 'src/app/model/User';
import { Vehicle } from 'src/app/model/Vehicle';
import { CommonCrudService } from 'src/app/services/common-crud.service';
import { UserCrudService } from 'src/app/services/user-crud.service';
import { VehicleCRUDService } from 'src/app/services/vehicle-crud.service';

@Component({
  selector: 'app-client-management',
  templateUrl: './client-management.component.html',
  styleUrls: ['./client-management.component.css']
})
export class ClientManagementComponent implements OnInit {

 
  public formEditUser: FormGroup;
  public columnsTableResult: any[]; // array de columnas
public loading = false;
  public vehicle: Vehicle = new Vehicle();
 
  public vehicleList: Vehicle[] = [];
  public provincesList: { id: string; province: string; }[];
  public municipalityList: { id: string; municipio: string; }[];
  public selectedActiveProvince: Provinces;
  public selectedActiveMunicipality: Municipality;
  

  public chkActiveStatus = true;

  public user : User =  new User();
  isLogged = false;

  private buildFrom(){
    this.formEditUser = new FormGroup({});
    this.formEditUser.addControl('inputDni', new FormControl('', Validators.required));
    this.formEditUser.addControl('inputFirstName', new FormControl('', Validators.required));
    this.formEditUser.addControl('inputLastName', new FormControl('', Validators.required));
    this.formEditUser.addControl('inputAddress', new FormControl('', Validators.required));
    this.formEditUser.addControl('selectProvince', new FormControl());
    this.formEditUser.addControl('selectMunicipality', new FormControl());
    this.formEditUser.addControl('inputPhone', new FormControl('', Validators.required));
    this.formEditUser.addControl('inputEmail', new FormControl('', Validators.required));
    this.formEditUser.addControl('inputUserName', new FormControl('', Validators.required));
    this.formEditUser.addControl('inputPassWord', new FormControl('', Validators.required));
    this.formEditUser.addControl('chkActiveStatus', new FormControl(''));
  }

  constructor(private formBuilder: FormBuilder,
    private serviceVehicle: VehicleCRUDService , 
    private route: ActivatedRoute,
    private serviceUser: UserCrudService,
    private router: Router,
    private messageService: MessageService,
    private common: CommonCrudService,) { 
      
    this.columnsTableResult = [
      { field: 'numberPlate', header: 'Matricula' },
      { field: 'brand', header: 'Marca' },
      { field: 'model', header: 'Modelo' },
    ];
  }


  updateUser(){
        this.user.dni = this.formEditUser.controls.inputDni.value
        this.user.firstName = this.formEditUser.controls.inputFirstName.value
        this.user.lastName = this.formEditUser.controls.inputLastName.value
        this.user.address = this.formEditUser.controls.inputAddress.value
        this.user.municipality = this.selectedActiveMunicipality
        this.user.phone = this.formEditUser.controls.inputPhone.value
        this.user.email = this.formEditUser.controls.inputEmail.value
        this.user.username = this.formEditUser.controls.inputUserName.value
        this.user.password = this.formEditUser.controls.inputPassWord.value
        this.user.codeStatus = this.formEditUser.controls.chkActiveStatus.value
           
    this.route.params.subscribe(
      (params: Params) => {
        this.serviceUser.updateUser(params.id,this.user).subscribe(data=>{{
          this.messageService.add({severity:'success', summary:'Exito!', detail:'Se ha creado el Usuario correctamente.'});
            this.hideLoadingSpinner();  
          }
        }, error => {
          if (error.status === 403) {
            this.hideLoadingSpinner();
            this.messageService.add({severity:'error', summary:'Error!', detail:'No tienes privilegios suficientes para realizar esta acción'});
          } else if (error.status === 401) {
            this.hideLoadingSpinner();
            this.messageService.add({severity:'error', summary:'Error!', detail:'Acceso denegado'});
          } else if (error.status === 400) {
            this.hideLoadingSpinner();          
            this.messageService.add({severity:'error', summary:'Error!', detail: error.error.message});
          } else if (error.status === 404) {
            this.hideLoadingSpinner();
            this.messageService.add({severity:'error', summary:'Error!', detail:'Datos no encontrados'});
          } else {
            this.hideLoadingSpinner();
            this.messageService.add({severity:'error', summary:'Error!', detail:'Se produjo un error, inténtelo de nuevo más tarde y si el error persiste, comuníquese con el administrador del sistema'});
          }
        })});
  }
  
    
  ngOnInit() {
    
    
    this.buildFrom();
    this.route.params.subscribe(
      (params: Params) => {
        if (params.id !== undefined) {            
          this.serviceVehicle.getVehicleForUserId(params.id).subscribe((data:any)=>{this.vehicleList=data});

          this.serviceUser.getUserId(params.id).subscribe(resp => {
            this.formEditUser.controls.inputDni.setValue(resp.dni);
            this.formEditUser.controls.inputFirstName.setValue(resp.firstName);
            this.formEditUser.controls.inputLastName.setValue(resp.lastName);
            this.formEditUser.controls.inputAddress.setValue(resp.address);
            this.selectedActiveProvince = resp.municipality.provinceId
            this.selectedActiveMunicipality = resp.municipality
            this.formEditUser.controls.inputPhone.setValue(resp.phone);
            this.formEditUser.controls.inputEmail.setValue(resp.email);
            this.formEditUser.controls.inputUserName.setValue(resp.username);
            this.formEditUser.controls.inputPassWord.setValue(resp.password);
            this.formEditUser.controls.chkActiveStatus.setValue(resp.codeStatus);
          });
        }
      }   
    );
    this.loadCombos();
    
  }
  
  cleanAllControls() {
    this.formEditUser.controls.inputDni.setValue(null);
    this.formEditUser.controls.inputFirstName.setValue(null);
    this.formEditUser.controls.inputLastName.setValue(null);
    this.formEditUser.controls.inputAddress.setValue(null);
    this.formEditUser.controls.inputProvince.setValue(null);
    this.formEditUser.controls.inputMunicipality.setValue(null);
    this.formEditUser.controls.inputPhone.setValue(null);
    this.formEditUser.controls.inputEmail.setValue(null);
    this.formEditUser.controls.inputUserName.setValue(null);
    this.formEditUser.controls.inputPassWord.setValue(null);
    this.formEditUser.controls.chkActiveStatus.setValue(true);

  }

  onChangeProvinces(event: any) {
    if (this.formEditUser.controls.selectProvince.value != null) {
      this.common.getMunicipalityProvince(this.formEditUser.controls.selectProvince.value.id)
        .subscribe(municipality => {
          this.municipalityList = municipality.map(municipio =>
            ({ id: municipio.id, municipio: municipio.municipio }))
        });
    }
  }
 

  loadCombos(){
    this.common.getProvinceList().subscribe(provinces => {
      this.provincesList = provinces.map(province => ({id: province.id,  province: province.province}))
      console.log(this.selectedActiveProvince);
      this.common.getMunicipalityProvince(this.selectedActiveProvince.id)
    .subscribe(municipality => {this.municipalityList = municipality.map(municipio =>
       ({id: municipio.id,  municipio: municipio.municipio, provinceId: municipio.provinceId}) )});
    });
  }

  showLoadingSpinner() {
    this.loading = true;
  }

  hideLoadingSpinner() {
    this.loading = false;
  }
}
