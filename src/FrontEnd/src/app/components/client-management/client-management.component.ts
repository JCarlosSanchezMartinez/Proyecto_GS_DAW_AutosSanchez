import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/model/User';
import { Vehicle } from 'src/app/model/Vehicle';
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

  public vehicle: Vehicle = new Vehicle();
 
  public vehicleList: Vehicle[] = [];

  public chkActiveStatus = true;

  public user : User =  new User();
  isLogged = false;

  private buildFrom(){
    this.formEditUser = new FormGroup({});
    this.formEditUser.addControl('inputDni', new FormControl('', Validators.required));
    this.formEditUser.addControl('inputFirstName', new FormControl('', Validators.required));
    this.formEditUser.addControl('inputLastName', new FormControl('', Validators.required));
    this.formEditUser.addControl('inputAddress', new FormControl('', Validators.required));
    this.formEditUser.addControl('inputCity', new FormControl('', Validators.required));
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
    private messageService: MessageService) { 
      
    this.columnsTableResult = [
      { field: 'numberPlate', header: 'Matricula' },
      { field: 'brand', header: 'Marca' },
      { field: 'model', header: 'Modelo' },
    ];
  }
  

  create(){
    console.log(this.formEditUser.value)
    //this.service.addVehicle(this.vehicle).subscribe((data:any)=>{this.vehicle=data})
  }


  updateUser(){
        this.user.dni = this.formEditUser.controls.inputDni.value
        this.user.firstName = this.formEditUser.controls.inputFirstName.value
        this.user.lastName = this.formEditUser.controls.inputLastName.value
        this.user.address = this.formEditUser.controls.inputAddress.value
        this.user.city = this.formEditUser.controls.inputCity.value
        this.user.phone = this.formEditUser.controls.inputPhone.value
        this.user.email = this.formEditUser.controls.inputEmail.value
        this.user.username = this.formEditUser.controls.inputUserName.value
        this.user.password = this.formEditUser.controls.inputPassWord.value
        this.user.codeStatus = this.formEditUser.controls.chkActiveStatus.value
           
    this.route.params.subscribe(
      (params: Params) => {
        this.serviceUser.updateUser(params.id,this.user).subscribe(
          data => {
            if (data == null || data == undefined) {
              this.messageService.add({severity:'error', summary:'Error!', detail:'Se ha producido un error.'});
            } else {
              this.messageService.add({severity:'success', summary:'Exito!', detail:'El Usuario se Actualizo correctamente.'});
            }    
            }
          );
      });
 
    

  }
  
    
  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        if (params.id !== undefined) {            
          this.serviceVehicle.getVehicleForUserId(params.id).subscribe((data:any)=>{this.vehicleList=data});

          this.serviceUser.getUserId(params.id).subscribe(resp => {
            this.formEditUser.controls.inputDni.setValue(resp.dni);
            this.formEditUser.controls.inputFirstName.setValue(resp.firstName);
            this.formEditUser.controls.inputLastName.setValue(resp.lastName);
            this.formEditUser.controls.inputAddress.setValue(resp.address);
            this.formEditUser.controls.inputCity.setValue(resp.city);
            this.formEditUser.controls.inputPhone.setValue(resp.phone);
            this.formEditUser.controls.inputEmail.setValue(resp.email);
            this.formEditUser.controls.inputUserName.setValue(resp.username);
            this.formEditUser.controls.inputPassWord.setValue(resp.password);
            this.formEditUser.controls.chkActiveStatus.setValue(resp.codeStatus);
          });
        }
      }   
    );
    this.buildFrom();
  
  }
  
  cleanAllControls() {
    this.formEditUser.controls.inputDni.setValue(null);
    this.formEditUser.controls.inputFirstName.setValue(null);
    this.formEditUser.controls.inputLastName.setValue(null);
    this.formEditUser.controls.inputAddress.setValue(null);
    this.formEditUser.controls.inputCity.setValue(null);
    this.formEditUser.controls.inputPhone.setValue(null);
    this.formEditUser.controls.inputEmail.setValue(null);
    this.formEditUser.controls.inputUserName.setValue(null);
    this.formEditUser.controls.inputPassWord.setValue(null);
    this.formEditUser.controls.chkActiveStatus.setValue(true);

  }



  onSubmit(){
  
  } 

}
