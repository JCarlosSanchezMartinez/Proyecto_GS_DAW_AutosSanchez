import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/User';
import { TokenService } from 'src/app/services/token.service';
import { VehicleCRUDService } from 'src/app/services/vehicle-crud.service';
import { Vehicle } from '../../model/Vehicle';



@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css'],
  
})
export class ManagementComponent implements OnInit {

  


  public columnsActionTable: any[];



  public vehicle: Vehicle = new Vehicle();
  public vehicles: Vehicle[] = [];
  public client : User =  new User();
  isLogged = false;


  constructor(private formBuilder: FormBuilder,private service: VehicleCRUDService, private seriveToken: TokenService) { 
  // this.columnsActionTable = [field: 'actionName', Header: ]
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
  
    this.service.readVehicleALL().subscribe((data:any)=>{this.vehicles=data})
  

    if(this.seriveToken.getToken()){
      this.isLogged = true;
      
    }else {
      this.isLogged = false;
    }
    
  }
  onSubmit(){
   
  }
  
    
  
  }
  
  