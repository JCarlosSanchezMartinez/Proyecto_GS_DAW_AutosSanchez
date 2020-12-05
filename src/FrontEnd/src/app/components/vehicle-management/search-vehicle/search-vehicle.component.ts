import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, SortEvent } from 'primeng/api';
import { User } from 'src/app/model/User';
import { Vehicle } from 'src/app/model/Vehicle';
import { VehicleCRUDService } from 'src/app/services/vehicle-crud.service';
import {ConfirmationService} from 'primeng/api';
import {Message} from 'primeng/api';
import { FilterVehicle } from 'src/app/interfaces/filter-vehicle.interface';

@Component({
  selector: 'app-search-vehicle',
  templateUrl: './search-vehicle.component.html',
  styleUrls: ['./search-vehicle.component.scss'],
  providers: [ConfirmationService]
})
export class SearchVehicleComponent implements OnInit {

  public formSearchVehicle : FormGroup;
  public columnsTableResult: any[]; // array de columnas

  public vehicle: Vehicle = new Vehicle(); 
  public vehicleList: Vehicle[] = [];
  public client : User =  new User();
  public paramSearch: FilterVehicle;

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
     private messageService: MessageService) {
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

  private buildFrom(){
    this.formSearchVehicle = new FormGroup({});
    this.formSearchVehicle.addControl('inputNumberPlate', new FormControl('', Validators.required));
    this.formSearchVehicle.addControl('inputVin', new FormControl('', Validators.required));
    this.formSearchVehicle.addControl('inputBrand', new FormControl('', Validators.required));
    this.formSearchVehicle.addControl('inputModel', new FormControl('', Validators.required));
    this.formSearchVehicle.addControl('chkActiveStatus', new FormControl(true));
    
    
  }

  onChangeChkActiveStatus() {
    this.chkActiveStatus === false ? this.chkActiveStatus = true : this.chkActiveStatus = false;
  }

  ngOnInit(): void {
    this.buildFrom();
    this.searchVehicle();

  }

  cleanAllControls(){
    this.formSearchVehicle.controls.inputNumberPlate.setValue(null);
    this.formSearchVehicle.controls.inputVin.setValue(null);
    this.formSearchVehicle.controls.inputBrand.setValue(null);
    this.formSearchVehicle.controls.inputModel.setValue(null);

  }


  searchVehicle(){
    this.showLoadingSpinner();
    this.paramSearch = this.getParamsSearchVehicle();
    this.serviceVehicle.getListVehicleByFilter(this.paramSearch).subscribe(vehicleFilterList => {
      if (vehicleFilterList === null  || vehicleFilterList.length === 0) {        
        this.hideLoadingSpinner();
        this.messageService.add({severity:'error', summary:'Error!', detail:'No data found.'});
        this.vehicleList = [];  
      } else {  
        vehicleFilterList.map(resultSearch => ({numberPlate: resultSearch.numberPlate,
          vin: resultSearch.vin,
          brand: resultSearch.brand,
          model: resultSearch.model,
          user: resultSearch.user,
          codeStatus: resultSearch.codeStatus}));
        this.vehicleList = vehicleFilterList;
        this.hideLoadingSpinner();

      }
    }, error => {
      if (error.status === 403) {
        this.hideLoadingSpinner();
        this.messageService.add({severity:'error', summary:'Error!', detail:'You have insufficient privileges to perform this action'});
      } else if (error.status === 401) {
        this.hideLoadingSpinner();
        this.messageService.add({severity:'error', summary:'Error!', detail:'Access is denied'});
      } else if (error.status === 404) {
        this.hideLoadingSpinner();
        this.messageService.add({severity:'error', summary:'Error!', detail:'No data found.'});
      } else {
        this.hideLoadingSpinner();
        this.messageService.add({severity:'error', summary:'Error!', detail:'An error occurred, try again later and if the error persists contact the System Administrator'});
      }
    });


   /* var search = this.formSearchVehicle.value;
    this.serviceVehicle.getVehicleNumberPlate(search.inputNumberPlate).subscribe((data:any)=>{this.vehicleList=data});    
      
   /* this.serviceVehicle.getVehicleNumberPlate(event.query).subscribe(data => {
      this.vehicleList = data;});*/  
 
  }

  getParamsSearchVehicle(): FilterVehicle {
    return {
      numberPlate : this.formSearchVehicle.controls.inputNumberPlate.value !== ''
      && this.formSearchVehicle.controls.inputNumberPlate.value !==undefined ? 
      this.formSearchVehicle.controls.inputNumberPlate.value : null,
      vin : this.formSearchVehicle.controls.inputVin.value !== ''
      && this.formSearchVehicle.controls.inputVin.value !==undefined ? 
      this.formSearchVehicle.controls.inputVin.value : null,
      brand : this.formSearchVehicle.controls.inputBrand.value !== ''
      && this.formSearchVehicle.controls.inputBrand.value !==undefined ? 
      this.formSearchVehicle.controls.inputBrand.value : null,
      model : this.formSearchVehicle.controls.inputModel.value !== ''
      && this.formSearchVehicle.controls.inputModel.value !==undefined ? 
      this.formSearchVehicle.controls.inputModel.value : null,
      codeStatus : this.formSearchVehicle.controls.chkActiveStatus.value === true ? true : null,
      
    };
  }

  onClickEditVehicle(vehicleId: number){
    this.router.navigate(['/vehicle',vehicleId]);
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
    data => {alert('Usuario Desactivado');  }
    );
}

reactivate(id: number) {
  this.serviceVehicle.reactivateVehicle(id).subscribe(
    data => {alert('Usuario Reactivado');  }
    );    

}

showModalConfirmDelete(id: number) {
  
  this.confirmationService.confirm({
    message: '¿Desea Borrar el Vehiculo?',
    header: 'Confirmacion Reactivacion',
    icon: 'fas fa-question-circle',
    accept: () => { this.delete(id);}
  });
  
}

showModalConfirmReactivate(id: number) {
  this.confirmationService.confirm({
    message: '¿Desea Reactivar el Vehiculo?',
    header: 'Confirmacion Eliminar',
    icon: 'fas fa-question-circle',
    accept: () => { this.reactivate(id);}
  });
}

showLoadingSpinner() {
  this.loading = true;
}

hideLoadingSpinner() {
  this.loading = false;
}

}
