import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../Vehicle/model/Vehicle';
import { User } from 'src/app/model/User';
import { VehicleCRUDService } from 'src/app/services/vehicle-crud.service';
import { UserCrudService } from 'src/app/services/user-crud.service';


@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  
  vehicle: Vehicle = new Vehicle();
  user: User = new User();
  
  constructor(private service:VehicleCRUDService,private serviceUser:UserCrudService) { 
   
  }
  
 
  readID(){
    
    this.service.getVehicle(this.vehicle.id).subscribe((data:any)=>{this.vehicle=data})
    
  }
  readUser(){
    this.serviceUser.getUser(this.user.id).subscribe((data1:any)=>{this.user=data1})
    console.log("entre")
  }
  update(vehicle: Vehicle){  

    this.service.updateVehicle(this.vehicle.id,this.vehicle).subscribe((data:any)=>{this.vehicle=data})  
  }
  delete(){
    this.service.deleteVehicle(this.vehicle.id).subscribe((data:any)=>{this.vehicle=data})
    this.readID();
  }
  
  ngOnInit() {
    this.serviceUser.readUserALL().subscribe((data2:any)=>{this.user=data2})
  }

}
