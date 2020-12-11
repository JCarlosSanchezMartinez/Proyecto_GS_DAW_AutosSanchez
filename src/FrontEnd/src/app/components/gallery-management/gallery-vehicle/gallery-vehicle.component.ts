import { Component, OnInit } from '@angular/core';
import { PhotoVehicleDto } from 'src/app/model/photo-vehicle-dto';
import { SearchVehicleDto } from 'src/app/model/search-vehicle-dto';
import { PhotoVehicleService } from 'src/app/services/photo-vehicle.service';
import { SearchVehicleDtoService } from 'src/app/services/search-vehicle-dto.service';

@Component({
  selector: 'app-gallery-vehicle',
  templateUrl: './gallery-vehicle.component.html',
  styleUrls: ['./gallery-vehicle.component.css']
})
export class GalleryVehicleComponent implements OnInit {

  
  public vehiclesDto: SearchVehicleDto;
  public photoVehicleDtoList: PhotoVehicleDto[];
  public images: any[] = [];


  constructor() { }

  ngOnInit(): void {
    

    this.vehiclesDto = JSON.parse(sessionStorage.getItem('vehicleId'));
    this.photoVehicleDtoList = this.vehiclesDto.photoVehicleDto;

    
    
    
    sessionStorage.removeItem("vehicleId");
  }


}
