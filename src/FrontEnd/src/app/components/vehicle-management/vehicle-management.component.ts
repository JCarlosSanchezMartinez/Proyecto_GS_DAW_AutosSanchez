import { UpperCasePipe } from '@angular/common';
import { Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Fuel } from 'src/app/interfaces/fuel';
import { PhotoVehicle } from 'src/app/model/PhotoVehicle';
import { User } from 'src/app/model/User';
import { Vehicle } from 'src/app/model/Vehicle';
import { UserCrudService } from 'src/app/services/user-crud.service';
import { VehicleCRUDService } from 'src/app/services/vehicle-crud.service';


@Component({
  selector: 'app-vehicle-management',
  templateUrl: './vehicle-management.component.html',
  styleUrls: ['./vehicle-management.component.css'],
  providers: [MessageService]
})
export class VehiculeManagementComponent implements OnInit {

  
  public formEditVehicle : FormGroup;
  public formVehicle: FormGroup;
  public vehicle: Vehicle = new Vehicle();
  public user: User = new User();
  public userList: User[] = [];
  public chkActiveStatus = false;
  public chkActiveCarrousel = false;
  public listFuel : Fuel[];
  public listPhone: PhotoVehicle;
  public selectFuel: Fuel;
  public dateValue: Date;
  public SearchClient = 'SearchClient';

  public uploadedFiles: any[] = [];
  url = "src/assets/img/";


  public inputTextArea: string;



  constructor(private formBuilder: FormBuilder,
    private serviceVehicle: VehicleCRUDService , 
    private route: ActivatedRoute,
    private serviceUser: UserCrudService,
    private router: Router,
    private messageService: MessageService) { 
      this.listFuel = [
        {name: 'Diesel', code: 'D'},
        {name: 'Gasolina', code: 'G'},
        {name: 'Hybrido', code: 'H'},
        {name: 'Electrico', code: 'E'},
  
    ];

    this.listPhone = {id: 1, imagen: '1.jpeg'};

   
  }
 
  private buildFrom(){
    this.formEditVehicle = new FormGroup({});
    this.formEditVehicle.addControl('inputNumberPlate', new FormControl());   
    this.formEditVehicle.addControl('inputVin', new FormControl());
    this.formEditVehicle.addControl('inputBrand', new FormControl());
    this.formEditVehicle.addControl('inputModel', new FormControl());
    this.formEditVehicle.addControl('selectSellDate', new FormControl());
    this.formEditVehicle.addControl('inputEngine', new FormControl());
    this.formEditVehicle.addControl('inputFuel', new FormControl());
    this.formEditVehicle.addControl('inputKms', new FormControl());
    this.formEditVehicle.addControl('inputColor', new FormControl());
    this.formEditVehicle.addControl('inputChasis', new FormControl());
    this.formEditVehicle.addControl('inputPrice', new FormControl());
   // this.formEditVehicle.addControl('inputExtra', new FormControl());
    this.formEditVehicle.addControl('chkActiveStatus', new FormControl());
    this.formEditVehicle.addControl('chkActiveCarrousel', new FormControl());
    this.formEditVehicle.addControl('SearchClient', new FormControl());
       
  }
   
    ngOnInit() {
        
    this.route.params.subscribe(
      (params: Params) => {
        if (params.id !== undefined) {
          this.serviceVehicle.getVehicle(params.id).subscribe(resp => {
            this.formEditVehicle.controls.inputNumberPlate.setValue(resp.numberPlate);
            this.formEditVehicle.controls.inputVin.setValue(resp.vin);
            this.formEditVehicle.controls.inputBrand.setValue(resp.brand);
            this.formEditVehicle.controls.inputModel.setValue(resp.model);
            this.selectDate(resp.sellDate);
            this.formEditVehicle.controls.inputEngine.setValue(resp.engine);
            this.selectFuel = this.activeFuel(resp.fuel);          
            this.formEditVehicle.controls.inputKms.setValue(resp.kms);
            this.formEditVehicle.controls.inputColor.setValue(resp.color);
            this.formEditVehicle.controls.inputChasis.setValue(resp.chasis);
            this.formEditVehicle.controls.inputPrice.setValue(resp.price);
           // this.formEditVehicle.controls.inputExtra.setValue(resp.extra);
            this.formEditVehicle.controls.chkActiveStatus.setValue(resp.codeStatus);
            this.formEditVehicle.controls.chkActiveCarrousel.setValue(resp.carrousel);
            this.formEditVehicle.controls.SearchClient.setValue( resp.userId);
          });
        }
      }
    );
    this.buildFrom();
    }


    activeFuel(fuel: string){
      var activeFuel: Fuel
      for (let i = 0; i < this.listFuel.length; i++) {
        if (this.listFuel[i].name == fuel) {
          activeFuel = this.listFuel[i]
        }
      }
      return activeFuel;
    }

    selectDate(date: string){
      var mydate = new Date(date);
      this.dateValue = mydate;
 
    }
    cleanAllControls() {
      this.formEditVehicle.controls.inputNumberPlate.setValue(null);
      this.formEditVehicle.controls.inputVin.setValue(null);
      this.formEditVehicle.controls.inputBrand.setValue(null);
      this.formEditVehicle.controls.inputModel.setValue(null);
      this.formEditVehicle.controls.selectSellDate.setValue(null);
      this.formEditVehicle.controls.inputEngine.setValue(null);
      this.formEditVehicle.controls.inputFuel.setValue(null);
      this.formEditVehicle.controls.inputKms.setValue(null);
      this.formEditVehicle.controls.inputColor.setValue(null);
      this.formEditVehicle.controls.inputChasis.setValue(null);
      this.formEditVehicle.controls.inputPrice.setValue(null);
      this.formEditVehicle.controls.inputExtra.setValue(null);
      this.formEditVehicle.controls.chkActiveStatus.setValue(true);
      this.formEditVehicle.controls.chkActiveCarrousel.setValue(false);
    }

    
   

    updateVehicle(vehicle: Vehicle){
      this.vehicle.numberPlate = this.formEditVehicle.controls.inputNumberPlate.value.toUpperCase()
      this.vehicle.vin = this.formEditVehicle.controls.inputVin.value.toUpperCase()
      this.vehicle.brand = this.formEditVehicle.controls.inputBrand.value.toUpperCase()
      this.vehicle.model = this.formEditVehicle.controls.inputModel.value.toUpperCase()
      this.vehicle.sellDate = this.formEditVehicle.controls.selectSellDate.value
      this.vehicle.engine = this.formEditVehicle.controls.inputEngine.value
      this.selectFuel = this.formEditVehicle.controls.inputFuel.value 
      this.vehicle.fuel = this.selectFuel.name;
      this.vehicle.kms = this.formEditVehicle.controls.inputKms.value
      this.vehicle.color =  this.titleCaseWord(this.formEditVehicle.controls.inputColor.value)
      this.vehicle.chasis = this.formEditVehicle.controls.inputChasis.value.toUpperCase()
      this.vehicle.price = this.formEditVehicle.controls.inputPrice.value
      this.vehicle.extra = JSON.parse(this.inputTextArea);
      this.vehicle.carrousel = this.formEditVehicle.controls.chkActiveCarrousel.value
      this.vehicle.codeStatus = this.formEditVehicle.controls.chkActiveStatus.value
      this.vehicle.photoId = this.listPhone;
      this.serviceUser.getUserDni(this.formEditVehicle.controls.SearchClient.value.dni).subscribe(data => 
        {this.userList=data});

      this.vehicle.userId = this.userList[0];

      this.route.params.subscribe(
        (params: Params) => {
          this.serviceVehicle.updateVehicle(params.id,this.vehicle).subscribe(
            data => {
              if (data == null || data == undefined) {
                this.messageService.add({severity:'error', summary:'Error!', detail:'Se ha producido un error.'});
              } else {
                this.messageService.add({severity:'success', summary:'Exito!', detail:'El Vehiculo se Actualizo correctamente.'});
              }           
             
            }
            );
        });
    }

    delete(){
      this.serviceVehicle.deleteVehicle(this.vehicle.id).subscribe((data:any)=>{this.vehicle=data})      
    }

    onSubmit(){
      
    } 

    titleCaseWord(word: string) {
      if (!word) return word;
      return word[0].toUpperCase() + word.substr(1).toLowerCase();
    }
 
    onUpload(event) {
      for(let file of event.files) {
          this.uploadedFiles.push(file);
          console.log(file)

      }

      this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }

 
}


