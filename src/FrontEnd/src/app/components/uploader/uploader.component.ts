import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { PhotoVehicle } from 'src/app/model/PhotoVehicle';
import { PhotoVehicleService } from 'src/app/services/photo-vehicle.service';
import { delay, finalize } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { VehicleCRUDService } from 'src/app/services/vehicle-crud.service';
import { Vehicle } from 'src/app/model/Vehicle';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css'],
  providers: [MessageService]
})
export class UploaderComponent implements OnInit {

  @Input() parentFormGroup: FormGroup;
  public uploaderForm: FormGroup;

  public uploadedFiles: any[] = [];
  path: any;
  public selectedFile: any;
  public photoVehicle: PhotoVehicle = null;
  public listPhotoVehicle: PhotoVehicle[] = [];
  public listPhotoVehicleTemp: PhotoVehicle[];
  URLPublic: any;
  public pv: PhotoVehicle = new PhotoVehicle;
  public vehicle: Vehicle;

  constructor(private messageService: MessageService,
    private serviceFirebase: AngularFireStorage,
    private servicePhotoVehicle: PhotoVehicleService,
    private serviceVehicle: VehicleCRUDService,) { }

  ngOnInit(): void {
    this.getPhotoVehicle();
    this.uploaderForm = this.parentFormGroup;
    

  }

  Uploader($event) {

    var cont = 0;
    var numberPlate = this.uploaderForm.controls.inputNumberPlate.value;
    var id: number = this.uploaderForm.controls.id.value;

    for (let file of $event.files) {
      cont++;
      this.pv.vehicleId = id;
      this.pv.id = null;
      var URLpath = "imagenVehicles/" + numberPlate + cont;
      var fileRef = this.serviceFirebase.ref(URLpath);
      this.URLPublic = fileRef.getDownloadURL().subscribe(url => { //Subcribirse para esperar la variable url
        if (url) {
          this.pv.imagen = url;
          this.listPhotoVehicle.push(this.pv);
        }
      }
      
      );
      this.serviceFirebase.upload(URLpath, file);
    }
    this.servicePhotoVehicle.deleteePhotoVehicle(id).subscribe( data => {});
    
   setTimeout(() =>{
     this.getBd();
   },2000);
    
    
    
    //this.messageService.add({ severity: 'info', summary: 'Imagenes Guardadas', detail: 'Las Imagenes se han guadado Correctamente.' });
  }

  getPhotoVehicle() {

    this.servicePhotoVehicle.getVehicleImagenList(sessionStorage.getItem("id")).subscribe(data => {
      //sessionStorage.removeItem("id");
      this.listPhotoVehicleTemp = data;

    });
  }

  getVehicle() {
    this.serviceVehicle.getVehicle(this.uploaderForm.controls.id.value).subscribe(data => {
      this.vehicle = data;
    });
  }

  getBd(){

    this.servicePhotoVehicle.addPhotoVehicle(this.listPhotoVehicle).subscribe(
      data => {
        if (data == null || data == undefined) {
          this.messageService.add({ severity: 'error', summary: 'Error!', detail: 'Se ha producido un error.' });
        } else {
          console.log(this.listPhotoVehicle)
          this.listPhotoVehicle = [];
          this.messageService.add({ severity: 'success', summary: 'Exito!', detail: 'El PHOTo se Actualizo correctamente.' });
        }
      }
    );
  }


}
