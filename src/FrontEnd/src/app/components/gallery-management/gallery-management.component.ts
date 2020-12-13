import { Component, OnInit } from '@angular/core';
import { MessageService, SortEvent } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { SearchVehicleDto } from 'src/app/model/search-vehicle-dto';
import { Vehicle } from 'src/app/model/Vehicle';
import { SearchVehicleDtoService } from 'src/app/services/search-vehicle-dto.service';
import { TokenService } from 'src/app/services/token.service';
import { GalleryVehicleComponent } from './gallery-vehicle/gallery-vehicle.component';

@Component({
  selector: 'app-gallery-management',
  templateUrl: './gallery-management.component.html',
  styleUrls: ['./gallery-management.component.css'],
  providers: [DialogService]
})
export class GalleryManagementComponent implements OnInit {

  public columnsTableResult: any[]; // array de columnas
  public totalRecords: number;
  public loading = false;
  public showTable = false;
  public showGallery = true;
  public vehicle: Vehicle = new Vehicle();
  public vehiclesDtoList: SearchVehicleDto[];
  public visibleSidebar = false;
  isLogged = false;


  constructor(private service: SearchVehicleDtoService,
    private seriveToken: TokenService,
    private messageService: MessageService,
    public dialogService: DialogService,) {
    this.columnsTableResult = [
      { field: 'brand', header: 'Marca' },
      { field: 'model', header: 'Modelo' },
      { field: 'imagen', header: 'Imagen' },
      { field: 'kms', header: 'Kilometros' },
      { field: 'fuel', header: 'Combustible' },
      { field: 'sellDate', header: 'Matriculacion' },
      { field: 'price', header: 'Precio' },
      { field: 'action', header: 'Acciones' },
    ];
  }


  ngOnInit() {

    if (this.seriveToken.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }

    this.service.readVehicleALL().subscribe(
      data => {
        if (data === null || data.length === 0) {
          this.hideLoadingSpinner();
          this.messageService.add({ severity: 'error', summary: 'Error!', detail: 'No data found.' });
          this.vehiclesDtoList = [];
        } else {
          data.map(resultSearch => ({
            brand: resultSearch.brand,
            model: resultSearch.model,
            imagen: resultSearch.image,
            kms: resultSearch.kms,
            fuel: resultSearch.fuel,
            sellDate: resultSearch.sellDate,
            price: resultSearch.price,
            codeStatus: resultSearch.codeStatus
          }));
          this.vehiclesDtoList = data;
          this.hideLoadingSpinner();
        }
      }, error => {
        if (error.status === 403) {
          this.hideLoadingSpinner();
          this.messageService.add({ severity: 'error', summary: 'Error!', detail: 'No tienes privilegios suficientes para realizar esta acción' });
        } else if (error.status === 401) {
          this.hideLoadingSpinner();
          this.messageService.add({ severity: 'error', summary: 'Error!', detail: 'Acceso denegado' });
        } else if (error.status === 404) {
          this.hideLoadingSpinner();
          this.messageService.add({ severity: 'error', summary: 'Error!', detail: 'Datos no encontrados' });
        } else if (error.status === 400) {
          this.hideLoadingSpinner();
          this.messageService.add({ severity: 'error', summary: 'Error!', detail: error.error.message });
        } else {
          this.hideLoadingSpinner();
          this.messageService.add({ severity: 'error', summary: 'Error!', detail: 'Se produjo un error, inténtelo de nuevo más tarde y si el error persiste, comuníquese con el administrador del sistema' });
        }
      });


  }

  onClickVehicleDetails(vehicleId: any) {
    this.service.getVehicle(vehicleId).subscribe((data: any) => {
      sessionStorage.setItem("vehicleId", JSON.stringify(data));

      const ref = this.dialogService.open(GalleryVehicleComponent, {
        width: '80%',
        showHeader: true,
        closable: true,
        contentStyle: { "overflow": "auto" }
      });

    });

  }


  showTableOrCard() {

    if (this.showTable) {
      this.showTable = false
      this.showGallery = true;
    } else {
      this.showTable = true
      this.showGallery = false;
    }
   
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

  showLoadingSpinner() {
    this.loading = true;
  }

  hideLoadingSpinner() {
    this.loading = false;
  }

}
