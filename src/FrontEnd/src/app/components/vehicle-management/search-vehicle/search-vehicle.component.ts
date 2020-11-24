import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SortEvent } from 'primeng/api';
import { User } from 'src/app/model/User';
import { Vehicle } from 'src/app/model/Vehicle';
import { VehicleCRUDService } from 'src/app/services/vehicle-crud.service';
import {ConfirmationService} from 'primeng/api';
import {Message} from 'primeng/api';

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

  public chkActiveStatus = true;

  public client : User =  new User();
  isLogged = false;

  constructor(private serviceVehicle: VehicleCRUDService, private router: Router,private confirmationService: ConfirmationService) {
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
    this.formSearchVehicle.addControl('chkActiveStatus', new FormControl(''));
    
    
  }

  

  ngOnInit(): void {
    this.buildFrom();
    this.serviceVehicle.readVehicleALL().subscribe((data:any)=>{this.vehicleList=data})

  }

  cleanAllControls(event:any){
    this.formSearchVehicle.controls.inputNumberPlate.setValue(null);
    this.formSearchVehicle.controls.inputVin.setValue(null);

  }


  searchNumber_Plate(){
    var search = this.formSearchVehicle.value;
    this.serviceVehicle.getVehicleNumberPlate(search.inputNumberPlate).subscribe((data:any)=>{this.vehicleList=data});    
      
   /* this.serviceVehicle.getVehicleNumberPlate(event.query).subscribe(data => {
      this.vehicleList = data;});*/  
 
  }

  getParamsSearchCompanies() {
    return {
      NumberPlate : this.formSearchVehicle.controls.inputNumberPlate.value ?
            this.formSearchVehicle.controls.inputNumberPlate.value : null,
      Vin : this.formSearchVehicle.controls.inputVin.value ?
      this.formSearchVehicle.controls.inputVin.value : null,
      
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

}
