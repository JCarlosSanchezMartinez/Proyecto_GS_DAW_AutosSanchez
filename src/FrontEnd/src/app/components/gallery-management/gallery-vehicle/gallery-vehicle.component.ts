import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PhotoVehicle } from 'src/app/model/PhotoVehicle';
import { SearchVehicleDto } from 'src/app/model/search-vehicle-dto';
import { SearchVehicleDtoService } from 'src/app/services/search-vehicle-dto.service';

@Component({
  selector: 'app-gallery-vehicle',
  templateUrl: './gallery-vehicle.component.html',
  styleUrls: ['./gallery-vehicle.component.css']
})
export class GalleryVehicleComponent implements OnInit {

  public vehiclesDto: SearchVehicleDto;
  public images: PhotoVehicle[] = [new PhotoVehicle()];
  

  constructor(private serviceVehicleDto: SearchVehicleDtoService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        if (params.id !== undefined) {
          this.serviceVehicleDto.getVehicle(params.id).subscribe((data:any)=>{ 
            this.vehiclesDto = data;
         

          this.images.push(this.vehiclesDto.photoId);
          this.images.push(this.vehiclesDto.photoId);
          this.images.push(this.vehiclesDto.photoId);
          
          
          console.log(this.images)
         
          })
          
      }});
     
  }
  
 
}
