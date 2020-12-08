import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Fuel } from 'src/app/interfaces/fuel';
import { PhotoVehicle } from 'src/app/model/PhotoVehicle';
import { User } from 'src/app/model/User';
import { Vehicle } from 'src/app/model/Vehicle';
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

  constructor( private serviceVehicle: VehicleCRUDService,
    private serviceUser: UserCrudService,
    private messageService: MessageService,
    private route: ActivatedRoute,) { 
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
   // this.formNewVehicle.addControl('inputExtra', new FormControl());
    this.formNewVehicle.addControl('chkActiveStatus', new FormControl());
    this.formNewVehicle.addControl('chkActiveCarrousel', new FormControl());
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

    this.serviceVehicle.addVehicle(this.vehicle).subscribe(
      data => {
        if (data == null || data == undefined) {
          this.messageService.add({severity:'error', summary:'Error!', detail:'Se ha producido un error.'});
        } else {
          this.messageService.add({severity:'success', summary:'Exito!', detail:'El Vehiculo se Creo correctamente.'});
        } 
      }
    );
    
    this.vehicle.numberPlate = this.formNewVehicle.controls.inputNumberPlate.value.toUpperCase()
    this.vehicle.vin = this.formNewVehicle.controls.inputVin.value.toUpperCase()
    this.vehicle.brand = this.formNewVehicle.controls.inputBrand.value.toUpperCase()
    this.vehicle.model = this.formNewVehicle.controls.inputModel.value.toUpperCase()
    this.vehicle.sellDate = this.formNewVehicle.controls.selectSellDate.value
    this.vehicle.engine = this.formNewVehicle.controls.inputEngine.value
    this.selectFuel = this.formNewVehicle.controls.inputFuel.value 
    this.vehicle.fuel = this.selectFuel.name;
    this.vehicle.kms = this.formNewVehicle.controls.inputKms.value
    this.vehicle.color =  this.titleCaseWord(this.formNewVehicle.controls.inputColor.value)
    this.vehicle.chasis = this.formNewVehicle.controls.inputChasis.value.toUpperCase()
    this.vehicle.price = this.formNewVehicle.controls.inputPrice.value
    //this.vehicle.extra = JSON.parse(this.inputTextArea);
    this.vehicle.carrousel = this.formNewVehicle.controls.chkActiveCarrousel.value
    this.vehicle.codeStatus = this.formNewVehicle.controls.chkActiveStatus.value
    this.vehicle.photoId = this.listPhone;
    this.serviceUser.getUserDni(this.formNewVehicle.controls.SearchClient.value.dni).subscribe(data => 
      {this.userList=data});

    this.vehicle.userId = this.userList[0];
        
  }
  
  
  ngOnInit(): void {
    this.buildFrom();
  }

  titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }

}
