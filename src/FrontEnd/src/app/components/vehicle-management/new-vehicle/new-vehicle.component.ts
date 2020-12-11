import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  public formNewVehicle: FormGroup;
  public vehicle: Vehicle = new Vehicle();
  public user: User = new User();
  public userList: User[] = [];
  public chkActiveStatus = null;
  public chkActiveCarrousel = null;
  public listPhone: PhotoVehicle;
  public selectFuel: Fuel;
  public dateValue: Date;
  public SearchClient = 'SearchClient';
  public imagenList: any[];
  public listFuel: Fuel[];
  public listPhotoVehicle: PhotoVehicle[] = [];
  public listPhotoVehicleTemp: PhotoVehicle[];
  public loading = false;


  constructor(private serviceVehicle: VehicleCRUDService,
    private serviceUser: UserCrudService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private servicePhotoVehicle: PhotoVehicleService,) {
    this.listFuel = [
      { name: 'Diesel', code: 'D' },
      { name: 'Gasolina', code: 'G' },
      { name: 'Hybrido', code: 'H' },
      { name: 'Electrico', code: 'E' },

    ];

  }

  private buildFrom() {
    this.formNewVehicle = new FormGroup({});
    this.formNewVehicle.addControl('inputNumberPlate', new FormControl('', [Validators.required]));
    this.formNewVehicle.addControl('inputVin', new FormControl('', [Validators.required]));
    this.formNewVehicle.addControl('inputBrand', new FormControl('', [Validators.required]));
    this.formNewVehicle.addControl('inputModel', new FormControl('', [Validators.required]));
    this.formNewVehicle.addControl('selectSellDate', new FormControl('', [Validators.required]));
    this.formNewVehicle.addControl('inputEngine', new FormControl('', [Validators.required]));
    this.formNewVehicle.addControl('inputFuel', new FormControl('', [Validators.required]));
    this.formNewVehicle.addControl('inputKms', new FormControl('', [Validators.required]));
    this.formNewVehicle.addControl('inputColor', new FormControl('', [Validators.required]));
    this.formNewVehicle.addControl('inputChasis', new FormControl('', [Validators.required]));
    this.formNewVehicle.addControl('inputPrice', new FormControl('', [Validators.required]));
    this.formNewVehicle.addControl('inputExtra', new FormControl('', [Validators.required]));
    this.formNewVehicle.addControl('chkActiveStatus', new FormControl(true, [Validators.required]));
    this.formNewVehicle.addControl('chkActiveCarrousel', new FormControl(false, [Validators.required]));
    this.formNewVehicle.addControl('SearchClient', new FormControl('', [Validators.required]));


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

  saveNewVehicle() {

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
    this.serviceVehicle.addVehicle(this.vehicle).subscribe(data => {
      {
        this.messageService.add({ severity: 'success', summary: 'Exito!', detail: 'Se ha creado el Vehiculo correctamente.' });
        this.hideLoadingSpinner();
      }
    }, error => {
      if (error.status === 403) {
        this.hideLoadingSpinner();
        this.messageService.add({ severity: 'error', summary: 'Error!', detail: 'No tienes privilegios suficientes para realizar esta acción' });
      } else if (error.status === 401) {
        this.hideLoadingSpinner();
        this.messageService.add({ severity: 'error', summary: 'Error!', detail: 'Acceso denegado' });
      } else if (error.status === 400) {
        this.hideLoadingSpinner();
        this.messageService.add({ severity: 'error', summary: 'Error!', detail: error.error.message });
      } else if (error.status === 404) {
        this.hideLoadingSpinner();
        this.messageService.add({ severity: 'error', summary: 'Error!', detail: 'Datos no encontrados' });
      } else {
        this.hideLoadingSpinner();
        this.messageService.add({ severity: 'error', summary: 'Error!', detail: 'Se produjo un error, inténtelo de nuevo más tarde y si el error persiste, comuníquese con el administrador del sistema' });
      }
    });
  }

  ngOnInit(): void {
    this.buildFrom();
  }

  titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }

  getUserVehicle(dni: string) {
    this.serviceUser.getUserDni(dni).subscribe(data => {
      this.userList = data;
    });
  }


  showLoadingSpinner() {
    this.loading = true;
  }

  hideLoadingSpinner() {
    this.loading = false;
  }


}
