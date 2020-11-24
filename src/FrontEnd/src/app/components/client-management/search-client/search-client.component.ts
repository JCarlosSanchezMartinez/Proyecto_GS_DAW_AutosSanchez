import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, SortEvent } from 'primeng/api';
import { User } from 'src/app/model/User';
import { Vehicle } from 'src/app/model/Vehicle';
import { UserCrudService } from 'src/app/services/user-crud.service';


@Component({
  selector: 'app-search-client',
  templateUrl: './search-client.component.html',
  styleUrls: ['./search-client.component.css'],
  providers: [ConfirmationService]
})
export class SearchClientComponent implements OnInit {

  public formSearchUser : FormGroup;
  public columnsTableResult: any[]; // array de columnas

  public vehicle: Vehicle = new Vehicle(); 
  public vehicleList: Vehicle[] = [];
  public user: User = new User(); 
  public userList: User[] = [];
  public loading = null;

  public chkActiveStatus;

  isLogged = false;

  constructor(private serviceUser: UserCrudService, private router: Router,private confirmationService: ConfirmationService) {
    this.columnsTableResult = [
      { field: 'dni', header: 'DNI' },
      { field: 'nameComplete', header: 'Nombre' },
      { field: 'address', header: 'Direccion' },
      { field: 'phone', header: 'Telefono' },
      { field: 'email', header: 'Email' },
      { field: 'action', header: 'Acciones' },

    ];
   }

  private buildFrom(){
    this.formSearchUser = new FormGroup({});
    this.formSearchUser.addControl('inputDni', new FormControl('', Validators.required));
    this.formSearchUser.addControl('inputName', new FormControl('', Validators.required));
    this.formSearchUser.addControl('chkActiveStatus', new FormControl(true));    
  }

  delete(id: number) {
    this.serviceUser.deleteUser(id).subscribe(
      data => {alert('Usuario Desactivado');  }
      );
  }

  reactivate(id: number) {
    this.serviceUser.reactivateUser(id).subscribe(
      data => {alert('Usuario Reactivado');  }
      );    

  }

  ngOnInit(): void {

    this.buildFrom();
    this.serviceUser.getUserList().subscribe((data:any)=>{this.userList=data})

  }

  cleanAllControls(event:any){
    this.formSearchUser.controls.inputDni.setValue(null);
    this.formSearchUser.controls.inputName.setValue(null);

  }


  searchDni(){
    var search = this.formSearchUser.value;   
    this.serviceUser.getUserDni(search.inputDni).subscribe((data:any)=>{this.userList=data})
 
  }
/*
  getParamsSearchCompanies() {
    return {
      NumberPlate : this.serviceUser.controls.inputNumberPlate.value ?
            this.serviceUser.controls.inputNumberPlate.value : null,
      Vin : this.serviceUser.controls.inputVin.value ?
      this.serviceUser.controls.inputVin.value : null,
      
    };
  }*/

  onClickEditUser(userId: number){
    this.router.navigate(['/user',userId]);
  }
  
  showModalConfirmDelete(id: number) {
  
    this.confirmationService.confirm({
      message: '¿Desea Borrar el Usuario?',
      header: 'Confirmacion Reactivacion',
      icon: 'fas fa-question-circle',
      accept: () => { this.delete(id);  this.showLoadingSpinner(); }
    });
    this.hideLoadingSpinner();
  }

  showModalConfirmReactivate(id: number) {
    this.confirmationService.confirm({
      message: '¿Desea Reactivar el Usuario?',
      header: 'Confirmacion Eliminar',
      icon: 'fas fa-question-circle',
      accept: () => { this.reactivate(id); window.onload; }
    });
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

showLoadingSpinner() {
  this.loading = true;
}

hideLoadingSpinner() {
  this.loading = false;
}

}
