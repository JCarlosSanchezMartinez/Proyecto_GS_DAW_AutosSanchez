import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vehicle } from 'src/app/model/Vehicle';
import { TokenService } from 'src/app/services/token.service';
import { VehicleCRUDService } from 'src/app/services/vehicle-crud.service';

@Component({
  selector: 'app-gallery-management',
  templateUrl: './gallery-management.component.html',
  styleUrls: ['./gallery-management.component.css'],
  
})
export class GalleryManagementComponent implements OnInit {
  
  showTable: boolean;
  vehicles:Vehicle[];
  isLogged = false;
  
  constructor (private service:VehicleCRUDService, private seriveToken: TokenService) { }

  
  ngOnInit() {

    if(this.seriveToken.getToken()){
      this.isLogged = true;
      console.log(this.seriveToken)
      this.service.readVehicleALL().subscribe((data:any)=>{this.vehicles=data})
    }else {
      this.isLogged = false;
    }
    

    
  }

  listar(){
   this.ngOnInit();
  }

  gallery(){
    this.showTable = true;
  }



}
