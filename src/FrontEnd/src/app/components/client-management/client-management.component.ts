import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
    private router: Router) { 
      
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

  update(client: User){  
  
  }
  delete(){

    
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
            this.formEditUser.controls.chkActiveStatus.setValue(true);
          });
        }
      }   
    );
    this.buildFrom();
  
  }
  
  onSubmit(){
  
  } 

}
