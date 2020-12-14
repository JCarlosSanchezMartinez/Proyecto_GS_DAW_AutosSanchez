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
import { GalleryVehicleComponent } from '../gallery-management/gallery-vehicle/gallery-vehicle.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DialogService]
})
export class HomeComponent implements OnInit {
  public loading = false;
  public responsiveOptions;
  public images: PhotoVehicleDto[] = [];
  vehiclesDto:SearchVehicleDto[];


 


  constructor(private serviceVehicleDto: SearchVehicleDtoService,
    private serviceVehicle:SearchVehicleDtoService,
    private router: Router,
    public dialogService: DialogService,
    ) {  this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 6,
          numScroll: 6
      },
      {
          breakpoint: '768px',
          numVisible: 6,
          numScroll: 6
      },
      {
          breakpoint: '560px',
          numVisible: 4,
          numScroll: 4
      }
  ];

  }

  ngOnInit(): void {
    this.showLoadingSpinner();
    this.serviceVehicleDto.getVehicleCarrousel().subscribe( data=>{
      this.vehiclesDto=data

      
      
    });
    console.log(this.images)
    this.hideLoadingSpinner();
    
  }
  
  onClickVehicleDetails(vehicleId: any){
    this.serviceVehicleDto.getVehicle(vehicleId).subscribe((data:any)=>{
      sessionStorage.setItem("vehicleId" ,JSON.stringify(data));

      const ref = this.dialogService.open(GalleryVehicleComponent, {
        width: '80%', 
        showHeader: true,
        closable:true,
        contentStyle: { "overflow": "auto"}});

    });
    
  }

  showLoadingSpinner() {
    this.loading = true;
  }

  hideLoadingSpinner() {
    this.loading = false;
  }

}
