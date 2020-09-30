import { Component, OnInit } from '@angular/core';
import { VehicleCRUDService } from 'src/app/services/vehicle-crud.service';
import { Router } from '@angular/router';
import { Vehicle } from '../model/Vehicle';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
  
  vehicles:Vehicle[];
  constructor (private service:VehicleCRUDService, private router:Router) { }

  
  ngOnInit() {
    this.service.readVehicleALL().subscribe((data:any)=>{this.vehicles=data})
  }

  listar(){
   this.ngOnInit();
  }

}
