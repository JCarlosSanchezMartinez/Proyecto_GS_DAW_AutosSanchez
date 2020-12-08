import { Component, Input, OnInit } from '@angular/core';
import { FormControlName, FormGroup } from '@angular/forms';
import { Vehicle } from 'src/app/model/Vehicle';
import { VehicleCRUDService } from 'src/app/services/vehicle-crud.service';

@Component({
  selector: 'app-auto-vehicle',
  templateUrl: './auto-vehicle.component.html',
  styleUrls: ['./auto-vehicle.component.css']
})
export class AutoVehicleComponent implements OnInit {
  @Input() parentFormGroup: FormGroup;
  @Input() controlName: FormControlName;
  
  listVehicle: Vehicle[];
  filteredElemnent: Vehicle[];

  init = false;
  minLength: number;
  notFoundMessage = 'No Data Found';

  constructor(private commonService: VehicleCRUDService) {
   }

  ngOnInit() {
    this.commonService.readVehicleALL().subscribe(vehicle => {
      this.listVehicle = vehicle;
    });
  }

  filterVehicle(event) {
    let filtered : any[] = [];
    let query = event.query;
    const countQuery = query.length;
   
      for(let i = 0; i < this.listVehicle.length; i++) {
        let vehicle = this.listVehicle[i];
        
        if (vehicle.numberPlate.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(vehicle);            
            this.filteredElemnent = filtered;
        }
        if (vehicle.vin.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          filtered.push(vehicle);
          this.filteredElemnent = filtered;
        }
      }    
    }

}


