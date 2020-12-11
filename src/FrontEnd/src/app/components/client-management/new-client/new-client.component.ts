import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Municipality } from 'src/app/model/Municipality';
import { Provinces } from 'src/app/model/Provinces';
import { User } from 'src/app/model/User';
import { Vehicle } from 'src/app/model/Vehicle';
import { CommonCrudService } from 'src/app/services/common-crud.service';
import { UserCrudService } from 'src/app/services/user-crud.service';
import { VehicleCRUDService } from 'src/app/services/vehicle-crud.service';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})
export class NewUserComponent implements OnInit {

 
  public formNewUser: FormGroup;
  public columnsTableResult: any[]; // array de columnas

  public vehicle: Vehicle = new Vehicle(); 
  public vehicleList: Vehicle[] = [];
  public chkActiveStatus = true;
  public user : User =  new User();

  public provincesList: { id: string; province: string; }[];
  public municipalityList: { id: string; municipio: string; }[];
  public selectedActiveProvince: Provinces;
  public selectedActiveMunicipality: Municipality;
  isLogged = false;

  private buildFrom(){
    this.formNewUser = new FormGroup({});
    this.formNewUser.addControl('inputDni', new FormControl('',[Validators.required,Validators.maxLength(9)]));
    this.formNewUser.addControl('inputFirstName', new FormControl(''));
    this.formNewUser.addControl('inputLastName', new FormControl(''));
    this.formNewUser.addControl('inputAddress', new FormControl(''));
    this.formNewUser.addControl('selectProvince', new FormControl());
    this.formNewUser.addControl('selectMunicipality', new FormControl());
    this.formNewUser.addControl('inputPhone', new FormControl(''));
    this.formNewUser.addControl('inputEmail', new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100)]));
    this.formNewUser.addControl('inputUserName', new FormControl('',[Validators.required]));
    this.formNewUser.addControl('inputPassWord', new FormControl('',[Validators.required]));
    this.formNewUser.addControl('chkActiveStatus', new FormControl(true));
  }

  constructor(private formBuilder: FormBuilder,
    private serviceVehicle: VehicleCRUDService , 
    private route: ActivatedRoute,
    private serviceUser: UserCrudService,
    private router: Router,
    private messageService: MessageService,
    private common: CommonCrudService,) { 
    
  }
  

  create(){

    this.user.dni =  this.formNewUser.controls.inputDni.value.toUpperCase()
    this.user.firstName = this.titleCaseWord(this.formNewUser.controls.inputFirstName.value) 
    this.user.lastName =  this.titleCaseWord(this.formNewUser.controls.inputLastName.value)
    this.user.address =  this.titleCaseWord(this.formNewUser.controls.inputAddress.value)
    this.user.municipality =  this.selectedActiveMunicipality
    this.user.phone =  this.formNewUser.controls.inputPhone.value
    this.user.email =  this.formNewUser.controls.inputEmail.value
    this.user.username =  this.formNewUser.controls.inputUserName.value
    this.user.password =  this.formNewUser.controls.inputPassWord.value
    this.user.codeStatus =  this.formNewUser.controls.chkActiveStatus.value

    console.log(this.formNewUser.value)

    this.serviceUser.addUser(this.user).subscribe(data=>{
      if (data == null || data == undefined) {
        this.messageService.add({severity:'error', summary:'Error!', detail:'Se ha producido un error.'});
      } else {
        this.messageService.add({severity:'success', summary:'Exito!', detail:'Se ha creado el Usuario correctamente.'});
      }    
    });
    
  }

 
    
  ngOnInit() {


    this.buildFrom();
    this.loadCombos();
  
  }
  
  cleanAllControls() {
    this.formNewUser.controls.inputDni.setValue(null);
    this.formNewUser.controls.inputFirstName.setValue(null);
    this.formNewUser.controls.inputLastName.setValue(null);
    this.formNewUser.controls.inputAddress.setValue(null);
    this.formNewUser.controls.inputMunicipality.setValue(null);
    this.formNewUser.controls.inputProvince.setValue(null);
    this.formNewUser.controls.inputPhone.setValue(null);
    this.formNewUser.controls.inputEmail.setValue(null);
    this.formNewUser.controls.inputUserName.setValue(null);
    this.formNewUser.controls.inputPassWord.setValue(null);
    this.formNewUser.controls.chkActiveStatus.setValue(true);

  }
  
  titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }

  onChangeProvinces(event: any) {
    if (this.formNewUser.controls.selectProvince.value != null) {
      this.common.getMunicipalityProvince(this.formNewUser.controls.selectProvince.value.id)
        .subscribe(municipality => {
          this.municipalityList = municipality.map(municipio =>
            ({ id: municipio.id, municipio: municipio.municipio }))
        });
    }
  }
 

  loadCombos(){
    this.common.getProvinceList().subscribe(provinces => {
      this.provincesList = provinces.map(province => ({id: province.id,  province: province.province}))
      console.log(this.selectedActiveProvince);
      this.common.getMunicipalityProvince(this.selectedActiveProvince.id)
    .subscribe(municipality => {this.municipalityList = municipality.map(municipio =>
       ({id: municipio.id,  municipio: municipio.municipio, provinceId: municipio.provinceId}) )});

    });
  }

}
