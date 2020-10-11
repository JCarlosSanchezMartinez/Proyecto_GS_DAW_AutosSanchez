import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { VehicleCRUDService } from 'src/app/services/vehicle-crud.service';
import { Vehicle } from '../../model/Vehicle';

@Component({
  selector: 'app-vehicule-management',
  templateUrl: './vehicule-management.component.html',
  styleUrls: ['./vehicule-management.component.css']
})
export class VehiculeManagementComponent implements OnInit {

  public formVehicle: FormGroup;
  public vehicle: Vehicle = new Vehicle();

  private buildFrom(){
    this.formVehicle = this.formBuilder.group({
      id: [''],
      vin: ['',Validators.required],
      number_plate: ['',Validators.required],
      brand: ['',Validators.required],
      model: ['',Validators.required],
      years: ['',Validators.required],
      engine: ['',Validators.required],
      price: ['',Validators.required],
      fuel: [''],
      kms: ['',Validators.required],
      color: ['',Validators.required],
      extra: [''],
      user_id: [''],

    })
  }
  constructor(private formBuilder: FormBuilder,private service: VehicleCRUDService) { 
   
  }
 

    searchID(){
      var search = this.formVehicle.value;
      this.service.getVehicle(search.number_plate).subscribe((data:any)=>{this.vehicle=data});
      
    }

   
    create(){
      console.log(this.formVehicle.value)
      //this.service.addVehicle(this.vehicle).subscribe((data:any)=>{this.vehicle=data})
    }

    update(vehicle: Vehicle){
      this.service.updateVehicle(this.vehicle.id,this.vehicle).subscribe((data:any)=>{this.vehicle=data})  
    }

    delete(){
      this.service.deleteVehicle(this.vehicle.id).subscribe((data:any)=>{this.vehicle=data})      
    }
      
    ngOnInit() {
      this.buildFrom();
      console.log(this.formVehicle.value)
      
    }
    onSubmit(){
      
    }    

}

