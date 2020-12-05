import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/model/User';
import { Vehicle } from 'src/app/model/Vehicle';
import { UserCrudService } from 'src/app/services/user-crud.service';
import { VehicleCRUDService } from 'src/app/services/vehicle-crud.service';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})
export class NewUserComponent implements OnInit {

 
  public formNewUser: FormGroup;
  public columnsTableResult: any[]; // array de columnas

  public vehicle: Vehicle = new Vehicle();
 
  public vehicleList: Vehicle[] = [];

  public chkActiveStatus = true;

  public user : User =  new User();
  isLogged = false;

  private buildFrom(){
    this.formNewUser = new FormGroup({});
    this.formNewUser.addControl('inputDni', new FormControl('', Validators.required));
    this.formNewUser.addControl('inputFirstName', new FormControl('', Validators.required));
    this.formNewUser.addControl('inputLastName', new FormControl('', Validators.required));
    this.formNewUser.addControl('inputAddress', new FormControl('', Validators.required));
    this.formNewUser.addControl('inputProvince', new FormControl('', Validators.required));
    this.formNewUser.addControl('inputMunicipality', new FormControl('', Validators.required));
    this.formNewUser.addControl('inputPhone', new FormControl('', Validators.required));
    this.formNewUser.addControl('inputEmail', new FormControl('', Validators.required));
    this.formNewUser.addControl('inputUserName', new FormControl('', Validators.required));
    this.formNewUser.addControl('inputPassWord', new FormControl('', Validators.required));
    this.formNewUser.addControl('chkActiveStatus', new FormControl(''));
  }

  constructor(private formBuilder: FormBuilder,
    private serviceVehicle: VehicleCRUDService , 
    private route: ActivatedRoute,
    private serviceUser: UserCrudService,
    private router: Router,
    private messageService: MessageService) { 
    
  }
  

  create(){

    this.user.dni =  this.formNewUser.controls.inputDni.value
    this.user.firstName =  this.formNewUser.controls.inputFirstName.value
    this.user.lastName =  this.formNewUser.controls.inputLastName.value
    this.user.address =  this.formNewUser.controls.inputAddress.value
    this.user.municipality =  this.formNewUser.controls.inputMunicipality.value
    this.user.phone =  this.formNewUser.controls.inputPhone.value
    this.user.email =  this.formNewUser.controls.inputEmail.value
    this.user.username =  this.formNewUser.controls.inputUserName.value
    this.user.password =  this.formNewUser.controls.inputPassWord.value
    this.user.codeStatus =  this.formNewUser.controls.chkActiveStatus.value

    console.log(this.formNewUser.value)

    this.serviceUser.addUser(this.user).subscribe(data=>{
      if (data == null || data == undefined) {
        this.messageService.add({severity:'error', summary:'Error!', detail:'Se ha producido un error.'});
      } else {
        this.messageService.add({severity:'success', summary:'Exito!', detail:'Se ha creado el Usuario correctamente.'});
      }    
    });
    
  }

 
    
  ngOnInit() {


    this.buildFrom();
  
  }
  
  cleanAllControls() {
    this.formNewUser.controls.inputDni.setValue(null);
    this.formNewUser.controls.inputFirstName.setValue(null);
    this.formNewUser.controls.inputLastName.setValue(null);
    this.formNewUser.controls.inputAddress.setValue(null);
    this.formNewUser.controls.inputMunicipality.setValue(null);
    this.formNewUser.controls.inputProvince.setValue(null);
    this.formNewUser.controls.inputPhone.setValue(null);
    this.formNewUser.controls.inputEmail.setValue(null);
    this.formNewUser.controls.inputUserName.setValue(null);
    this.formNewUser.controls.inputPassWord.setValue(null);
    this.formNewUser.controls.chkActiveStatus.setValue(true);

  }
  onSubmit(){
  
  } 

}
