import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vehicle } from 'src/app/model/Vehicle';
import { VehicleCRUDService } from 'src/app/services/vehicle-crud.service';

@Component({
  selector: 'app-gallery-management',
  templateUrl: './gallery-management.component.html',
  styleUrls: ['./gallery-management.component.css']
})
export class GalleryManagementComponent implements OnInit {
  
  vehicles:Vehicle[];
  constructor (private service:VehicleCRUDService) { }

  
  ngOnInit() {
    this.service.readVehicleALL().subscribe((data:any)=>{this.vehicles=data})
  }

  listar(){
   this.ngOnInit();
  }

}
