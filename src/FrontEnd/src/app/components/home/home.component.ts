import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { RegisterComponent } from 'src/app/auth/register/register.component';
import { Vehicle } from 'src/app/model/Vehicle';
import { SearchVehicleDtoService } from 'src/app/services/search-vehicle-dto.service';
import { VehicleCRUDService } from 'src/app/services/vehicle-crud.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { PhotoVehicleDto } from 'src/app/model/photo-vehicle-dto';
import { SearchVehicleDto } from 'src/app/model/search-vehicle-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public loading = false;

  public images: PhotoVehicleDto[] = [];
  vehiclesDto:SearchVehicleDto[];


 


  constructor(private serviceVehicleDto: SearchVehicleDtoService,
    private serviceVehicle:SearchVehicleDtoService,
    private router: Router,
    ) { 

  }

  ngOnInit(): void {
    this.showLoadingSpinner();
    this.serviceVehicleDto.getVehicleCarrousel().subscribe( data=>{
      this.vehiclesDto=data

      
      
    });
    console.log(this.images)
    this.hideLoadingSpinner();
    
  }
  onClickVehicleDetails(vehicleId: number){
    /* const ref = this.dialogService.open(GalleryVehicleComponent, {
       width: '80%'});*/
       
   
     this.router.navigate(['/vehicleDetails',vehicleId]);
   }
  showLoadingSpinner() {
    this.loading = true;
  }

  hideLoadingSpinner() {
    this.loading = false;
  }

}
