import { Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Fuel } from 'src/app/interfaces/fuel';
import { User } from 'src/app/model/User';
import { Vehicle } from 'src/app/model/Vehicle';
import { UserCrudService } from 'src/app/services/user-crud.service';
import { VehicleCRUDService } from 'src/app/services/vehicle-crud.service';


@Component({
  selector: 'app-vehicle-management',
  templateUrl: './vehicle-management.component.html',
  styleUrls: ['./vehicle-management.component.css']
})
export class VehiculeManagementComponent implements OnInit {

  
  public formEditVehicle : FormGroup;
  public formVehicle: FormGroup;
  public vehicle: Vehicle = new Vehicle();
  public user: User = new User();
  public chkActiveStatus = true;
  public listFuel = [];
  public selectFuel: Fuel;


  constructor(private formBuilder: FormBuilder,
    private serviceVehicle: VehicleCRUDService , 
    private route: ActivatedRoute,
    private serviceUser: UserCrudService,
    private router: Router) { 
      this.listFuel = [
        {name: 'Diesel', code: 'D'},
        {name: 'Gasolina', code: 'G'},
        {name: 'Hybrido', code: 'H'},
        {name: 'Electrico', code: 'E'},
  
    ];
   
  }
 
  private buildFrom(){
    this.formEditVehicle = new FormGroup({});
    this.formEditVehicle.addControl('inputNumberPlate', new FormControl());   
    this.formEditVehicle.addControl('inputVin', new FormControl());
    this.formEditVehicle.addControl('inputBrand', new FormControl());
    this.formEditVehicle.addControl('inputModel', new FormControl());
    this.formEditVehicle.addControl('inputClient', new FormControl());
    this.formEditVehicle.addControl('inputYears', new FormControl());
    this.formEditVehicle.addControl('inputEngine', new FormControl());
    this.formEditVehicle.addControl('inputFuel', new FormControl());
    this.formEditVehicle.addControl('inputKms', new FormControl());
    this.formEditVehicle.addControl('inputColor', new FormControl());
    this.formEditVehicle.addControl('inputPrice', new FormControl());
    this.formEditVehicle.addControl('inputExtra', new FormControl());
    this.formEditVehicle.addControl('chkActiveStatus', new FormControl());
    
    
  }
   


    update(vehicle: Vehicle){
      this.serviceVehicle.updateVehicle(this.vehicle.id,this.vehicle).subscribe((data:any)=>{this.vehicle=data})  
    }

    delete(){
      this.serviceVehicle.deleteVehicle(this.vehicle.id).subscribe((data:any)=>{this.vehicle=data})      
    }
      
    ngOnInit() {
        
    this.route.params.subscribe(
      (params: Params) => {
        if (params.id !== undefined) {
          this.serviceVehicle.getVehicle(params.id).subscribe(resp => {
            this.formEditVehicle.controls.inputNumberPlate.setValue(resp.numberPlate);
            this.formEditVehicle.controls.inputVin.setValue(resp.vin);
            this.formEditVehicle.controls.inputBrand.setValue(resp.brand);
            this.formEditVehicle.controls.inputModel.setValue(resp.model);
            this.formEditVehicle.controls.inputYears.setValue(resp.years);
            this.formEditVehicle.controls.inputEngine.setValue(resp.engine);
            this.formEditVehicle.controls.inputFuel.setValue(resp.fuel);
            this.formEditVehicle.controls.inputKms.setValue(resp.kms);
            this.formEditVehicle.controls.inputColor.setValue(resp.color);
            this.formEditVehicle.controls.inputPrice.setValue(resp.price);
            this.formEditVehicle.controls.inputExtra.setValue(resp.extra);
            this.formEditVehicle.controls.chkActiveStatus.setValue(true);
            this.formEditVehicle.controls.inputClient.setValue( resp.userId.dni + " - " + 
              resp.userId.firstName +" "+ resp.userId.lastName);
          });
        }
      }
    );
    this.buildFrom();
    }

    cleanAllControls() {
      this.formEditVehicle.controls.inputNumberPlate.setValue(null);
      this.formEditVehicle.controls.inputVin.setValue(null);
      this.formEditVehicle.controls.inputBrand.setValue(null);
      this.formEditVehicle.controls.inputModel.setValue(null);
      this.formEditVehicle.controls.inputYears.setValue(null);
      this.formEditVehicle.controls.inputEngine.setValue(null);
      this.formEditVehicle.controls.inputFuel.setValue(null);
      this.formEditVehicle.controls.inputKms.setValue(null);
      this.formEditVehicle.controls.inputColor.setValue(null);
      this.formEditVehicle.controls.inputPrice.setValue(null);
      this.formEditVehicle.controls.inputExtra.setValue(null);
      this.formEditVehicle.controls.chkActiveStatus.setValue(true);
    }
    onSubmit(){
      
    }    

}

