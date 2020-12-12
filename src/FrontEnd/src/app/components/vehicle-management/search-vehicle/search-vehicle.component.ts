import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, SortEvent } from 'primeng/api';
import { FilterVehicle } from 'src/app/interfaces/filter-vehicle.interface';
import { User } from 'src/app/model/User';
import { Vehicle } from 'src/app/model/Vehicle';
import { SearchVehicleDtoService } from 'src/app/services/search-vehicle-dto.service';
import { VehicleCRUDService } from 'src/app/services/vehicle-crud.service';

@Component({
  selector: 'app-search-vehicle',
  templateUrl: './search-vehicle.component.html',
  styleUrls: ['./search-vehicle.component.scss'],
  providers: [ConfirmationService]
})
export class SearchVehicleComponent implements OnInit {

  public formSearchVehicle: FormGroup;
  public columnsTableResult: any[]; // array de columnas

  public vehicle: Vehicle = new Vehicle();
  public vehicleList: Vehicle[] = [];
  public client: User = new User();

  public paramSearch: FilterVehicle;
  public SearchVehicle = 'SearchVehicle';
  public SearchClient = 'SearchClient';
  public chkActiveStatus = true;
  public totalRecords: number;
  public tableShow: boolean;
  public headerModal: string;
  public displayModal = false;
  public messageModal: string;
  public loading = false;
  isLogged = false;

  constructor(private serviceVehicle: VehicleCRUDService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,) {
    this.columnsTableResult = [
      { field: 'numberPlate', header: 'Matricula' },
      { field: 'imagen', header: 'Imagen' },
      { field: 'brand', header: 'Marca' },
      { field: 'model', header: 'Modelo' },
      { field: 'color', header: 'Color' },
      { field: 'user', header: 'Cliente' },
      { field: 'price', header: 'Precio' },
      { field: 'action', header: 'Acciones' },

    ];
  }

  ngOnInit(): void {
    this.buildFrom();
    this.searchVehicle();
  }

  private buildFrom() {
    this.formSearchVehicle = new FormGroup({});
    this.formSearchVehicle.addControl('SearchVehicle', new FormControl());
    this.formSearchVehicle.addControl('SearchClient', new FormControl());
    this.formSearchVehicle.addControl('inputBrand', new FormControl());
    this.formSearchVehicle.addControl('inputModel', new FormControl());
    this.formSearchVehicle.addControl('chkActiveStatus', new FormControl(true));
  }

  onChangeChkActiveStatus() {
    this.chkActiveStatus === false ? this.chkActiveStatus = true : this.chkActiveStatus = false;
  }

  cleanAllControls() {
    this.formSearchVehicle.controls.SearchVehicle.setValue(null);
    this.formSearchVehicle.controls.inputBrand.setValue(null);
    this.formSearchVehicle.controls.inputModel.setValue(null);
    this.formSearchVehicle.controls.SearchClient.setValue(null);
  }

  searchVehicle() {
    this.showLoadingSpinner();
    this.paramSearch = this.getParamsSearchVehicle();
    this.serviceVehicle.getListVehicleByFilter(this.paramSearch).subscribe(vehicleFilterList => {
      if (vehicleFilterList === null || vehicleFilterList.length === 0) {
        this.hideLoadingSpinner();
        this.messageService.add({ severity: 'error', summary: 'Error!', detail: 'No data found.' });
        this.vehicleList = [];
      } else {
        vehicleFilterList.map(resultSearch => ({
          numberPlate: resultSearch.numberPlate,
          vin: resultSearch.vin,
          brand: resultSearch.brand,
          model: resultSearch.model,
          user: resultSearch.user,
          codeStatus: resultSearch.codeStatus
        }));
        this.vehicleList = vehicleFilterList;
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

  getParamsSearchVehicle(): FilterVehicle {
    return {
      vehicle: this.formSearchVehicle.controls.SearchVehicle.value !== ''
        && this.formSearchVehicle.controls.SearchVehicle.value !== undefined ?
        this.formSearchVehicle.controls.SearchVehicle.value : null,
      brand: this.formSearchVehicle.controls.inputBrand.value !== ''
        && this.formSearchVehicle.controls.inputBrand.value !== undefined ?
        this.formSearchVehicle.controls.inputBrand.value : null,
      model: this.formSearchVehicle.controls.inputModel.value !== ''
        && this.formSearchVehicle.controls.inputModel.value !== undefined ?
        this.formSearchVehicle.controls.inputModel.value : null,
      user: this.formSearchVehicle.controls.SearchClient.value !== ''
        && this.formSearchVehicle.controls.SearchClient.value !== undefined ?
        this.formSearchVehicle.controls.SearchClient.value : null,
      codeStatus: this.formSearchVehicle.controls.chkActiveStatus.value === true ? true : null,
    };
  }

  onClickEditVehicle(vehicleId: number) {
    this.router.navigate(['/vehicle', vehicleId]);
  }

  confirm() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        //Actual logic to perform a confirmation
      }
    });
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
  delete(id: number) {
    this.serviceVehicle.deleteVehicle(id).subscribe(
      data => { this.messageService.add({ severity: 'success', summary: 'Exito!', detail: 'Se ha DESACTIVADO el Vehiculo correctamente.' });  }
    );
  }

  reactivate(id: number) {
    this.serviceVehicle.reactivateVehicle(id).subscribe(
      data => { this.messageService.add({ severity: 'success', summary: 'Exito!', detail: 'Se ha REACTIVADO el Vehiculo correctamente.' });  }
    );
  }

  showModalConfirmDelete(id: number) {
    this.confirmationService.confirm({
      message: '¿Desea Borrar el Vehiculo?',
      header: 'Confirmacion Reactivacion',
      icon: 'fas fa-question-circle',
      accept: () => { this.delete(id); }
    });
  }

  showModalConfirmReactivate(id: number) {
    this.confirmationService.confirm({
      message: '¿Desea Reactivar el Vehiculo?',
      header: 'Confirmacion Eliminar',
      icon: 'fas fa-question-circle',
      accept: () => { this.reactivate(id); }
    });
  }

  showLoadingSpinner() {
    this.loading = true;
  }

  hideLoadingSpinner() {
    this.loading = false;
  }

}
