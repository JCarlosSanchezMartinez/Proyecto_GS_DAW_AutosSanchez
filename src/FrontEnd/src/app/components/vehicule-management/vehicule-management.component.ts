import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { VehicleCRUDService } from 'src/app/services/vehicle-crud.service';
import { Vehicle } from '../Vehicle/model/Vehicle';

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
      id: new FormControl(''),
      vin: new FormControl(''),
      number_plate: new FormControl(''),
      brand: new FormControl(''),
      model: new FormControl(''),
      engine: new FormControl(''),
      price: new FormControl(''),
      fuel: new FormControl(''),
      color: new FormControl(''),
      extra: new FormControl(''),
      user_id: new FormControl(''),

    })
  }

  constructor(private formBuilder: FormBuilder,private service: VehicleCRUDService) { 
   
  }
  

searchID(){
  var search = this.formVehicle.value;
  this.service.getVehicle(search.number_plate).subscribe((data:any)=>{this.vehicle=data});
  
}

readID(id: number){ 
 this.service.getVehicle(id).subscribe((data:any)=>{this.vehicle=data});
}

update(vehicle: Vehicle){  

  this.service.updateVehicle(this.vehicle.id,this.vehicle).subscribe((data:any)=>{this.vehicle=data})  
}

delete(){
  this.service.deleteVehicle(this.vehicle.id).subscribe((data:any)=>{this.vehicle=data})
  
}
  
ngOnInit() {
  this.buildFrom();
  
}
onSubmit(){
 
}

  

}

