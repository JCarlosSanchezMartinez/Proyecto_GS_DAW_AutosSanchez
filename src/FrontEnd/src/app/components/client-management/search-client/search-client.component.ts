import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, SortEvent } from 'primeng/api';
import { FilterUser } from 'src/app/interfaces/filter-user';
import { User } from 'src/app/model/User';
import { Vehicle } from 'src/app/model/Vehicle';
import { UserCrudService } from 'src/app/services/user-crud.service';


@Component({
  selector: 'app-search-client',
  templateUrl: './search-client.component.html',
  styleUrls: ['./search-client.component.scss'],
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
  public paramSearch: FilterUser;

  public chkActiveStatus;

  isLogged = false;

  constructor(private serviceUser: UserCrudService,
     private router: Router,
     private confirmationService: ConfirmationService,
     private messageService: MessageService
     ) {
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
    this.formSearchUser.addControl('inputFirstName', new FormControl('', Validators.required));
    this.formSearchUser.addControl('inputLastName', new FormControl('', Validators.required));
    this.formSearchUser.addControl('inputNumberPlate', new FormControl('', Validators.required));
    this.formSearchUser.addControl('inputCity', new FormControl('', Validators.required));
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
    this.formSearchUser.controls.inputFirstName.setValue(null);
    this.formSearchUser.controls.inputLastName.setValue(null);
    this.formSearchUser.controls.inputVehicle.setValue(null);
    this.formSearchUser.controls.inputCity.setValue(null);

  }


  searchDni(){
    this.showLoadingSpinner();
    this.paramSearch = this.getParamsSearchUser();
    this.serviceUser.getListUserByFilter(this.paramSearch).subscribe(UserFilterList => {
      if (UserFilterList === null  || UserFilterList.length === 0) {        
        this.hideLoadingSpinner();
        this.messageService.add({severity:'error', summary:'Error!', detail:'No data found.'});
        this.userList = [];  
      } else {  
        UserFilterList.map(resultSearch => ({dni: resultSearch.dni,
          firstName: resultSearch.firstName,
          lastName: resultSearch.lastName,
          city: resultSearch.city,
          codeStatus: resultSearch.codeStatus}));
        this.userList = UserFilterList;
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
 
  }
  getParamsSearchUser(): FilterUser {
    return {
      dni : this.formSearchUser.controls.inputDni.value !== ''
      && this.formSearchUser.controls.inputDni.value !==undefined ? 
      this.formSearchUser.controls.inputDni.value : null,
      firstName : this.formSearchUser.controls.inputFirstName.value !== ''
      && this.formSearchUser.controls.inputFirstName.value !==undefined ? 
      this.formSearchUser.controls.inputFirstName.value : null,
      lastName : this.formSearchUser.controls.inputLastName.value !== ''
      && this.formSearchUser.controls.inputLastName.value !==undefined ? 
      this.formSearchUser.controls.inputLastName.value : null,
      numberPlate : this.formSearchUser.controls.inputNumberPlate.value !== ''
      && this.formSearchUser.controls.inputNumberPlate.value !==undefined ? 
      this.formSearchUser.controls.inputNumberPlate.value : null,
      city : this.formSearchUser.controls.inputCity.value !== ''
      && this.formSearchUser.controls.inputCity.value !==undefined ? 
      this.formSearchUser.controls.inputCity.value : null,
      codeStatus : this.formSearchUser.controls.chkActiveStatus.value === true ? true : null,
      
    };
  }

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
