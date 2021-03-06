import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/User';
import { VehicleCRUDService } from 'src/app/services/vehicle-crud.service';
import { Vehicle } from '../../model/Vehicle';



@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css'],
  
})
export class ManagementComponent implements OnInit {

  

  public formSearch : FormGroup;
  public vehicle: Vehicle = new Vehicle();
  public client : User =  new User();
  

  private buildFrom(){
    this.formSearch = this.formBuilder.group({
    id:new FormControl(''),
    number_plate:['',Validators.required],
    vin:new FormControl(''),
    

    })
  }

  constructor(private formBuilder: FormBuilder,private service: VehicleCRUDService) { 
   
  }

  

  searchID(){
    var search = this.formSearch.value;
    this.service.getVehicle(search.id).subscribe((data:any)=>{this.vehicle=data},err=> console.log(alert));    


  }

  searchNumber_Plate(){
    var search = this.formSearch.value;
    this.service.getVehicleNumberPlate(search.number_plate).subscribe((data:any)=>{this.vehicle=data});    
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
  
  