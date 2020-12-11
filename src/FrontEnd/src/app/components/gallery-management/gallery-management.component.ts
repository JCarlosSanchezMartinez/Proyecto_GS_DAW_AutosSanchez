import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SortEvent } from 'primeng/api';
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

  public columnsTableResult: any[]; // array de columnas
  showTable: boolean;
  vehiclesDto:SearchVehicleDto[];
  public visibleSidebar= false;
  isLogged = false;
 
  
  constructor (private service:SearchVehicleDtoService,
     private seriveToken: TokenService,
     private common: CommonModule,
     private router: Router,
     public dialogService: DialogService,) {
      this.columnsTableResult = [

        { field: 'brand', header: 'Marca' },
        { field: 'model', header: 'Modelo' },
        { field: 'imagen', header: 'Imagen' },
        { field: 'kms', header: 'Kilometros' },
        { field: 'fuel', header: 'Combustible' },
        { field: 'sellDate', header: 'Matriculacion' },
        { field: 'price', header: 'Precio' },

  
      ];
      }

  
  ngOnInit() {

    this.service.readVehicleALL().subscribe((data:any)=>{this.vehiclesDto=data});


    if(this.seriveToken.getToken()){
      this.isLogged = true;
      
      
    }else {
      this.isLogged = false;
    }   
  }

  onClickVehicleDetails(vehicleId: any){
    this.service.getVehicle(vehicleId).subscribe((data:any)=>{
      sessionStorage.setItem("vehicleId" ,JSON.stringify(data));

      const ref = this.dialogService.open(GalleryVehicleComponent, {
        width: '80%', 
        showHeader: true,
        closable:true,
        contentStyle: { "overflow": "auto"}});

    });
    
  }


  showTableOrCard(){
    this.showTable = true;
  }
    // ORDENACION DE COLUMNAS
    customSort(event: SortEvent) {
      event.data.sort((data1, data2) => {
        let value1 = data1[event.field];
        let value2 = data2[event.field];
        let result = null;
  
        if (value1 == null && value2 != null)
          result = -1;
        else if (value1 != null && value2 == null)
          result = 1;
        else if (value1 == null && value2 == null)
          result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string')
          result = value1.localeCompare(value2);
        else
          result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
  
        return (event.order * result);
      });
    }



}
