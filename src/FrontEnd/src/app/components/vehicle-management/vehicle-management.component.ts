import { UpperCasePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Fuel } from 'src/app/interfaces/fuel';
import { PhotoVehicle } from 'src/app/model/PhotoVehicle';
import { User } from 'src/app/model/User';
import { Vehicle } from 'src/app/model/Vehicle';
import { UserCrudService } from 'src/app/services/user-crud.service';
import { VehicleCRUDService } from 'src/app/services/vehicle-crud.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { DialogService } from 'primeng/dynamicdialog';
import { UploaderComponent } from '../uploader/uploader.component';
import { PhotoVehicleService } from 'src/app/services/photo-vehicle.service';

@Component({
  selector: 'app-vehicle-management',
  templateUrl: './vehicle-management.component.html',
  styleUrls: ['./vehicle-management.component.css'],
  providers: [MessageService, DialogService]
})
export class VehiculeManagementComponent implements OnInit {


  public formEditVehicle: FormGroup;
  public formVehicle: FormGroup;
  public vehicle: Vehicle = new Vehicle();
  public user: User = new User();
  public userList: User[] = [];
  public chkActiveStatus = false;
  public chkActiveCarrousel = false;
  public listFuel: Fuel[];
  public listPhotoVehicle: PhotoVehicle[] = [];
  public listPhotoVehicleTemp: PhotoVehicle[];
  public selectFuel: Fuel;
  public dateValue: Date;
  public SearchClient = 'SearchClient';
  public loading = false;


  //REVISAR
  public imagenList: any[];
  public inputTextArea: string;



  constructor(private formBuilder: FormBuilder,
    private serviceVehicle: VehicleCRUDService,
    private route: ActivatedRoute,
    private serviceUser: UserCrudService,
    private router: Router,
    private messageService: MessageService,
    private dialogService: DialogService,
    private servicePhotoVehicle: PhotoVehicleService,
  ) {
    this.listFuel = [
      { name: 'Diesel', code: 'D' },
      { name: 'Gasolina', code: 'G' },
      { name: 'Hybrido', code: 'H' },
      { name: 'Electrico', code: 'E' },

    ];

  }

  private buildFrom() {
    this.formEditVehicle = new FormGroup({});
    this.formEditVehicle.addControl('id', new FormControl());
    this.formEditVehicle.addControl('inputNumberPlate', new FormControl('', [Validators.required, Validators.maxLength(9)]));
    this.formEditVehicle.addControl('inputVin', new FormControl('', [Validators.required , Validators.maxLength(17)]));
    this.formEditVehicle.addControl('inputBrand', new FormControl('', [Validators.required]));
    this.formEditVehicle.addControl('inputModel', new FormControl('', [Validators.required]));
    this.formEditVehicle.addControl('selectSellDate', new FormControl('', [Validators.required]));
    this.formEditVehicle.addControl('inputEngine', new FormControl('', [Validators.required]));
    this.formEditVehicle.addControl('inputFuel', new FormControl('', [Validators.required]));
    this.formEditVehicle.addControl('inputKms', new FormControl('', [Validators.required]));
    this.formEditVehicle.addControl('inputColor', new FormControl('', [Validators.required]));
    this.formEditVehicle.addControl('inputChasis', new FormControl('', [Validators.required]));
    this.formEditVehicle.addControl('inputPrice', new FormControl('', [Validators.required]));
    this.formEditVehicle.addControl('inputExtra', new FormControl('', [Validators.required, Validators.maxLength(120)]));
    this.formEditVehicle.addControl('chkActiveStatus', new FormControl(true, [Validators.required]));
    this.formEditVehicle.addControl('chkActiveCarrousel', new FormControl(false, [Validators.required]));
    this.formEditVehicle.addControl('SearchClient', new FormControl('', [Validators.required]));

  }

  ngOnInit() {


    this.route.params.subscribe(
      (params: Params) => {
        if (params.id !== undefined) {
          this.serviceVehicle.getVehicle(params.id).subscribe(resp => {
            this.formEditVehicle.controls.id.setValue(resp.id);
            sessionStorage.setItem("id", resp.id);
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
            this.formEditVehicle.controls.inputExtra.setValue(resp.extra);
            this.formEditVehicle.controls.chkActiveStatus.setValue(resp.codeStatus);
            this.formEditVehicle.controls.chkActiveCarrousel.setValue(resp.carrousel);
            this.formEditVehicle.controls.SearchClient.setValue(resp.userId);
            this.getUserVehicle();
            this.getPhotoVehicle();

          });
        }
      }
    );

    this.buildFrom();

  }


  activeFuel(fuel: string) {
    var activeFuel: Fuel
    for (let i = 0; i < this.listFuel.length; i++) {
      if (this.listFuel[i].name == fuel) {
        activeFuel = this.listFuel[i]
      }
    }
    return activeFuel;
  }

  selectDate(date: string) {
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




  updateVehicle(vehicle: Vehicle) {
    this.vehicle.numberPlate = this.formEditVehicle.controls.inputNumberPlate.value.toUpperCase()
    this.vehicle.vin = this.formEditVehicle.controls.inputVin.value.toUpperCase()
    this.vehicle.brand = this.formEditVehicle.controls.inputBrand.value.toUpperCase()
    this.vehicle.model = this.formEditVehicle.controls.inputModel.value.toUpperCase()
    this.vehicle.sellDate = this.formEditVehicle.controls.selectSellDate.value
    this.vehicle.engine = this.formEditVehicle.controls.inputEngine.value
    this.selectFuel = this.formEditVehicle.controls.inputFuel.value
    this.vehicle.fuel = this.selectFuel.name;
    this.vehicle.kms = this.formEditVehicle.controls.inputKms.value
    this.vehicle.color = this.titleCaseWord(this.formEditVehicle.controls.inputColor.value)
    this.vehicle.chasis = this.formEditVehicle.controls.inputChasis.value.toUpperCase()
    this.vehicle.price = this.formEditVehicle.controls.inputPrice.value
    this.vehicle.extra = this.formEditVehicle.controls.inputExtra.value
    this.vehicle.carrousel = this.formEditVehicle.controls.chkActiveCarrousel.value
    this.vehicle.codeStatus = this.formEditVehicle.controls.chkActiveStatus.value
    this.vehicle.userId = this.formEditVehicle.controls.SearchClient.value

    if (this.listPhotoVehicleTemp == null || this.listPhotoVehicleTemp == undefined || this.listPhotoVehicleTemp.length < 1) {
      var photoVehicle: PhotoVehicle = new PhotoVehicle;
      photoVehicle.id = null;
      photoVehicle.imagen = 'assets/img/imgEmpty.jpg';
      photoVehicle.vehicleId = this.formEditVehicle.controls.id.value;
      this.listPhotoVehicle.push(photoVehicle);
      this.servicePhotoVehicle.deleteePhotoVehicle(this.formEditVehicle.controls.id.value).subscribe();
    }
    this.servicePhotoVehicle.addPhotoVehicle(this.listPhotoVehicle).subscribe(data => {
      if (data) {

        this.listPhotoVehicle = [];
        this.getPhotoVehicle();
      }
    });



    this.route.params.subscribe(
      (params: Params) => {
        this.serviceVehicle.updateVehicle(params.id, this.vehicle).subscribe(data => {
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
        })
      });

  }

  delete() {
    this.serviceVehicle.deleteVehicle(this.vehicle.id).subscribe((data: any) => { this.vehicle = data })
  }

  onSubmit() {

  }

  titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }


  showUploader() {
    const ref = this.dialogService.open(UploaderComponent, {
      width: '80%'
    });
  }

  getUserVehicle() {
    this.serviceUser.getUserDni(this.formEditVehicle.controls.SearchClient.value.dni).subscribe(data => {
      this.userList = data;
    });
  }

  getPhotoVehicle() {
    this.servicePhotoVehicle.getVehicleImagenList(this.formEditVehicle.controls.id.value).subscribe(data => {

      this.listPhotoVehicleTemp = data;
    });
  }

  showLoadingSpinner() {
    this.loading = true;
  }

  hideLoadingSpinner() {
    this.loading = false;
  }

}
