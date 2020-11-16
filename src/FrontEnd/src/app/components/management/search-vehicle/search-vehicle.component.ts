import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/User';
import { Vehicle } from 'src/app/model/Vehicle';
import { VehicleCRUDService } from 'src/app/services/vehicle-crud.service';


@Component({
  selector: 'app-search-vehicle',
  templateUrl: './search-vehicle.component.html',
  styleUrls: ['./search-vehicle.component.css']
})
export class SearchVehicleComponent implements OnInit {

  public formSearchVehicle : FormGroup;
  public columnsTableResult: any[]; // array de columnas

  public vehicle: Vehicle = new Vehicle();
  public vehicleList: Vehicle[] = [];
  public client : User =  new User();
  isLogged = false;

  constructor(private service: VehicleCRUDService) {
    this.columnsTableResult = [
      { field: 'numberPlate', header: 'Matricula' },
      { field: 'brand', header: 'Marca' },
      { field: 'model', header: 'Modelo' },
      { field: 'engine', header: 'Motor' },
      { field: 'chasis', header: 'Chasis' },
      { field: 'years', header: 'Año' },
      { field: 'kms', header: 'Kms' },
      { field: 'color', header: 'Color' },
      { field: 'price', header: 'Precio' },

    ];
   }

  private buildFrom(){
    this.formSearchVehicle = new FormGroup({});
    this.formSearchVehicle.addControl('inputNumberPlate', new FormControl('', Validators.required));
    this.formSearchVehicle.addControl('inputVin', new FormControl('', Validators.required));
    
    
  }

  

  ngOnInit(): void {
    this.buildFrom();
    this.service.readVehicleALL().subscribe((data:any)=>{this.vehicleList=data})
  }

  cleanAllControls(event:any){
    this.formSearchVehicle.controls.inputNumberPlate.setValue(null);
    this.formSearchVehicle.controls.inputVin.setValue(null);

  }

  searchID(){
    var search = this.formSearchVehicle.value;
    this.service.getVehicle(search.id).subscribe((data:any)=>{this.vehicle=data},err=> console.log(alert));    
  }

  searchNumber_Plate(){
    var search = this.formSearchVehicle.value;
    this.service.getVehicleNumberPlate(search.inputNumberPlate).subscribe((data:any)=>{this.vehicle=data});    
  }

  getParamsSearchCompanies() {
    return {
      NumberPlate : this.formSearchVehicle.controls.inputNumberPlate.value ?
            this.formSearchVehicle.controls.inputNumberPlate.value : null,
      Vin : this.formSearchVehicle.controls.inputVin.value ?
      this.formSearchVehicle.controls.inputVin.value : null,
      
    };
  }


  
}
