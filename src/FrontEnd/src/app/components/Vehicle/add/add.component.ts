import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,FormsModule, FormControl,FormBuilder } from '@angular/forms';
import { Vehicle } from '../model/Vehicle';
import { VehicleCRUDService } from 'src/app/services/vehicle-crud.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

 
  vehicle: Vehicle = new Vehicle();
 
  constructor(private service:VehicleCRUDService) { 
   
  }
  

  onSubmit() {
   this.service.addVehicle(this.vehicle).subscribe(data => {
    console.log(data)
    this.vehicle = new Vehicle();
   
  }, 
  error => console.log(error));;

  }
  
  ngOnInit() {
    
  }

}
