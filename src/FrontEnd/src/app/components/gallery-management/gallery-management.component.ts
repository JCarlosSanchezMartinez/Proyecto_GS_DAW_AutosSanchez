import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SearchVehicleDto } from 'src/app/model/search-vehicle-dto';
import { Vehicle } from 'src/app/model/Vehicle';
import { SearchVehicleDtoService } from 'src/app/services/search-vehicle-dto.service';
import { TokenService } from 'src/app/services/token.service';
import { VehicleCRUDService } from 'src/app/services/vehicle-crud.service';
import { GalleryVehicleComponent } from './gallery-vehicle/gallery-vehicle.component';

@Component({
  selector: 'app-gallery-management',
  templateUrl: './gallery-management.component.html',
  styleUrls: ['./gallery-management.component.css'],
  providers: [DialogService]
})
export class GalleryManagementComponent implements OnInit {
  
  showTable: boolean;
  vehiclesDto:SearchVehicleDto[];
  public visibleSidebar= false;
  isLogged = false;
 
  
  constructor (private service:SearchVehicleDtoService,
     private seriveToken: TokenService,
     private common: CommonModule,
     private router: Router,
     public dialogService: DialogService,) { }

  
  ngOnInit() {

    


    if(this.seriveToken.getToken()){
      this.isLogged = true;
      this.service.readVehicleALL().subscribe((data:any)=>{this.vehiclesDto=data});
      
    }else {
      this.isLogged = false;
    }   
  }

  onClickVehicleDetails(vehicleId: number){
   /* const ref = this.dialogService.open(GalleryVehicleComponent, {
      width: '80%'});*/
      
  
    this.router.navigate(['/vehicleDetails',vehicleId]);
  }


  gallery(){
    this.showTable = true;
  }



}
