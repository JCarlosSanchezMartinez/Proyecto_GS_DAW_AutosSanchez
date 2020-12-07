import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { RegisterComponent } from 'src/app/auth/register/register.component';
import { Vehicle } from 'src/app/model/Vehicle';
import { VehicleCRUDService } from 'src/app/services/vehicle-crud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public vehicleList: Vehicle[] = [];
  responsiveOptions: any[];
  public imagen: String[]


  constructor(private serviceVehicle: VehicleCRUDService) { 
    this.responsiveOptions = [
      
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }

  ngOnInit(): void {
    this.serviceVehicle.getVehicleCarrousel().subscribe((data:any)=>{this.vehicleList=data});
    for (let index = 0; index < this.vehicleList.length; index++) {
      this.imagen.push();
      
    }
  }


}
