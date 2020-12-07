import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, SortEvent } from 'primeng/api';
import { FilterUser } from 'src/app/interfaces/filter-user';
import { Municipality } from 'src/app/model/Municipality';
import { Provinces } from 'src/app/model/Provinces';
import { User } from 'src/app/model/User';
import { Vehicle } from 'src/app/model/Vehicle';
import { CommonCrudService } from 'src/app/services/common-crud.service';
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
  public provincesList: { id: string; province: string; }[];
  public municipalityList: { id: string; municipio: string; }[];
  public selectedActiveProvince: Provinces;
  public selectedActiveMunicipality: Municipality;
  public countryActive = false;
  public SearchClient = 'SearchClient';
  public chkActiveStatus;

  isLogged = false;

  constructor(private serviceUser: UserCrudService,
     private router: Router,
     private confirmationService: ConfirmationService,
     private messageService: MessageService,
     private common: CommonCrudService,

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
    this.formSearchUser.addControl('SearchClient', new FormControl()); 
    this.formSearchUser.addControl('inputNumberPlate', new FormControl(''));
    this.formSearchUser.addControl('selectProvince', new FormControl(''));
    this.formSearchUser.addControl('selectMunicipality', new FormControl(''));
    this.formSearchUser.addControl('chkActiveStatus', new FormControl(true));
     
  }

  delete(id: number) {
    this.serviceUser.deleteUser(id).subscribe(
      data => { this.messageService.add({severity:'success', summary:'Exito!', detail:'Se ha BORRADO el Usuario correctamente.'}); }
      );
  }

  reactivate(id: number) {
    this.serviceUser.reactivateUser(id).subscribe(
      data => {this.messageService.add({severity:'success', summary:'Exito!', detail:'Se ha ACTIVADO el Usuario correctamente.'}); }
      );    

  }

  ngOnInit(): void {

    this.buildFrom();
    this.loadCombos();
    this.serviceUser.getUserList().subscribe((data:any)=>{this.userList=data})

  }

  cleanAllControls(event:any){
    this.formSearchUser.controls.inputFullName.setValue(null);
    this.formSearchUser.controls.inputNumberPlate.setValue(null);
    this.formSearchUser.controls.selectProvince.setValue(null);
    this.formSearchUser.controls.selectMunicipality.setValue(null);
    this.formSearchUser.controls.chkActiveStatus.setValue(true);

  }


  searchDni(){
    this.showLoadingSpinner();
    this.paramSearch = this.getParamsSearchUser();
    console.log( this.getParamsSearchUser())
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
      
      dni : this.formSearchUser.controls.SearchClient.value !== ''
      && this.formSearchUser.controls.SearchClient.value !==undefined ? 
      this.formSearchUser.controls.SearchClient.value : null,
      numberPlate : this.formSearchUser.controls.inputNumberPlate.value !== ''
      && this.formSearchUser.controls.inputNumberPlate.value !==undefined ? 
      this.formSearchUser.controls.inputNumberPlate.value : null,
      province : this.formSearchUser.controls.selectProvince.value !== ''
      && this.formSearchUser.controls.selectProvince.value !==undefined ? 
      this.formSearchUser.controls.selectProvince.value : null,
      municipality : this.formSearchUser.controls.selectMunicipality.value !== ''
      && this.formSearchUser.controls.selectMunicipality.value !==undefined ? 
      this.formSearchUser.controls.selectMunicipality.value : null,
      codeStatus : this.formSearchUser.controls.chkActiveStatus.value === true ? true : null,
      
    };
  }

  onClickEditUser(userId: number){
    this.router.navigate(['/user',userId]);
  }
  
  showModalConfirmDelete(id: number) {
    this.showLoadingSpinner();
    this.confirmationService.confirm({
      message: '¿Desea Borrar el Usuario?',
      header: 'Confirmacion Reactivacion',
      icon: 'fas fa-question-circle',
      accept: () => { this.delete(id);/* window.location.reload();*/  }
    });
    this.hideLoadingSpinner();
  }

  showModalConfirmReactivate(id: number) {
    this.showLoadingSpinner();
    this.confirmationService.confirm({
      message: '¿Desea Reactivar el Usuario?',
      header: 'Confirmacion Eliminar',
      icon: 'fas fa-question-circle',
      accept: () => { this.reactivate(id);/* window.location.reload();*/ }
    });
    this.hideLoadingSpinner();
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
  onChangeProvinces(event: any){

    this.common.getMunicipalityProvince(this.formSearchUser.controls.selectProvince.value.id)
    .subscribe(municipality => {this.municipalityList = municipality.map(municipio =>
       ({id: municipio.id,  municipio: municipio.municipio}) )});
     
  }

  loadCombos(){
    this.common.getProvinceList().subscribe(provinces => {
      this.provincesList = provinces.map(province => ({id: province.id,  province: province.province}));
      
    
     
    });
  }

}
