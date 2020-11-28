import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/model/Vehicle';
import { VehicleCRUDService } from 'src/app/services/vehicle-crud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public vehicleList: Vehicle[] = [];


  constructor(private serviceVehicle: VehicleCRUDService) { 
   
  }

  ngOnInit(): void {
    this.serviceVehicle.getVehicleCarrousel().subscribe((data:any)=>{this.vehicleList=data})
  }

}
