import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Fuel } from 'src/app/interfaces/fuel';
import { PhotoVehicle } from 'src/app/model/PhotoVehicle';
import { User } from 'src/app/model/User';
import { Vehicle } from 'src/app/model/Vehicle';
import { PhotoVehicleService } from 'src/app/services/photo-vehicle.service';
import { UserCrudService } from 'src/app/services/user-crud.service';
import { VehicleCRUDService } from 'src/app/services/vehicle-crud.service';

@Component({
  selector: 'app-new-vehicle',
  templateUrl: './new-vehicle.component.html',
  styleUrls: ['./new-vehicle.component.css']
})
export class NewVehicleComponent implements OnInit {

  public formNewVehicle : FormGroup;
  public vehicle: Vehicle = new Vehicle();
  public user: User = new User(); 
  public userList: User[] = [];
  public chkActiveStatus = null;
  public chkActiveCarrousel = null;
  public listPhone: PhotoVehicle;
  public selectFuel: Fuel;
  public dateValue: Date;
  public SearchClient = 'SearchClient';
  public imagenList:any[];
  public listFuel : Fuel[];
  public listPhotoVehicle: PhotoVehicle[] = [];
  public listPhotoVehicleTemp: PhotoVehicle[];


  constructor( private serviceVehicle: VehicleCRUDService,
    private serviceUser: UserCrudService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private servicePhotoVehicle: PhotoVehicleService,) { 
    this.listFuel = [
      {name: 'Diesel', code: 'D'},
      {name: 'Gasolina', code: 'G'},
      {name: 'Hybrido', code: 'H'},
      {name: 'Electrico', code: 'E'},

  ];

  }

  private buildFrom(){
    this.formNewVehicle = new FormGroup({});
    this.formNewVehicle.addControl('inputNumberPlate', new FormControl());   
    this.formNewVehicle.addControl('inputVin', new FormControl());
    this.formNewVehicle.addControl('inputBrand', new FormControl());
    this.formNewVehicle.addControl('inputModel', new FormControl());
    this.formNewVehicle.addControl('selectSellDate', new FormControl());
    this.formNewVehicle.addControl('inputEngine', new FormControl());
    this.formNewVehicle.addControl('inputFuel', new FormControl());
    this.formNewVehicle.addControl('inputKms', new FormControl());
    this.formNewVehicle.addControl('inputColor', new FormControl());
    this.formNewVehicle.addControl('inputChasis', new FormControl());
    this.formNewVehicle.addControl('inputPrice', new FormControl());
    this.formNewVehicle.addControl('inputExtra', new FormControl());
    this.formNewVehicle.addControl('chkActiveStatus', new FormControl(true));
    this.formNewVehicle.addControl('chkActiveCarrousel', new FormControl(false));
    this.formNewVehicle.addControl('SearchClient', new FormControl());
    
    
  }
  cleanAllControls() {
    this.formNewVehicle.controls.inputNumberPlate.setValue(null);
    this.formNewVehicle.controls.inputVin.setValue(null);
    this.formNewVehicle.controls.inputBrand.setValue(null);
    this.formNewVehicle.controls.inputModel.setValue(null);
    this.formNewVehicle.controls.selectSellDate.setValue(null);
    this.formNewVehicle.controls.inputEngine.setValue(null);
    this.formNewVehicle.controls.inputFuel.setValue(null);
    this.formNewVehicle.controls.inputKms.setValue(null);
    this.formNewVehicle.controls.inputColor.setValue(null);
    this.formNewVehicle.controls.inputChasis.setValue(null);
    this.formNewVehicle.controls.inputPrice.setValue(null);
    this.formNewVehicle.controls.inputExtra.setValue(null);
    this.formNewVehicle.controls.chkActiveStatus.setValue(true);
    this.formNewVehicle.controls.chkActiveCarrousel.setValue(false);
  }

  saveNewVehicle(){

    this.vehicle.numberPlate = this.formNewVehicle.controls.inputNumberPlate.value.toUpperCase()
    this.vehicle.vin = this.formNewVehicle.controls.inputVin.value.toUpperCase()
    this.vehicle.brand = this.formNewVehicle.controls.inputBrand.value.toUpperCase()
    this.vehicle.model = this.formNewVehicle.controls.inputModel.value.toUpperCase()
    this.vehicle.sellDate = this.formNewVehicle.controls.selectSellDate.value
    this.vehicle.engine = this.formNewVehicle.controls.inputEngine.value
    this.selectFuel = this.formNewVehicle.controls.inputFuel.value
    this.vehicle.fuel = this.selectFuel.name;
    this.vehicle.kms = this.formNewVehicle.controls.inputKms.value
    this.vehicle.color = this.titleCaseWord(this.formNewVehicle.controls.inputColor.value)
    this.vehicle.chasis = this.formNewVehicle.controls.inputChasis.value.toUpperCase()
    this.vehicle.price = this.formNewVehicle.controls.inputPrice.value
    this.vehicle.extra = this.formNewVehicle.controls.inputExtra.value
    this.vehicle.carrousel = this.formNewVehicle.controls.chkActiveCarrousel.value
    this.vehicle.codeStatus = this.formNewVehicle.controls.chkActiveStatus.value
    this.vehicle.userId = this.formNewVehicle.controls.SearchClient.value
/*
    if (this.listPhotoVehicleTemp == null || this.listPhotoVehicleTemp == undefined || this.listPhotoVehicleTemp.length < 1) {
      var photoVehicle: PhotoVehicle = new PhotoVehicle;
      photoVehicle.id = null;
      photoVehicle.imagen = 'assets/img/imgEmpty.jpg';
      photoVehicle.vehicleId = this.formNewVehicle.controls.id.value;
      this.listPhotoVehicle.push(photoVehicle);
      this.servicePhotoVehicle.deleteePhotoVehicle(this.formNewVehicle.controls.id.value).subscribe();
    }
    this.servicePhotoVehicle.addPhotoVehicle(this.listPhotoVehicle).subscribe(data => {
      if (data) {
        
        this.listPhotoVehicle = [];
        //this.getPhotoVehicle();
      }
    });*/
    this.serviceVehicle.addVehicle(this.vehicle).subscribe(
      data => {
        if (data == null || data == undefined) {
          this.messageService.add({severity:'error', summary:'Error!', detail:'Se ha producido un error.'});
        } else {
          this.messageService.add({severity:'success', summary:'Exito!', detail:'El Vehiculo se Creo correctamente.'});
        } 
      }
    );
  }

  ngOnInit(): void {
    this.buildFrom();
  }

  titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }

  getUserVehicle(dni:string) {
    this.serviceUser.getUserDni(dni).subscribe(data => {
      this.userList = data;
    });
  }

}
