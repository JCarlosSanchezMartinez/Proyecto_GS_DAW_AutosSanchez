import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { User } from 'src/app/model/User';
import { UserCrudService } from 'src/app/services/user-crud.service';

@Component({
  selector: 'app-auto-user',
  templateUrl: './auto-user.component.html',
  styleUrls: ['./auto-user.component.css']
})
export class AutoUserComponent implements OnInit {
  @Input() parentFormGroup: FormGroup;
  @Input() controlName: FormControlName;
  
  listClient: User[];
  filteredElemnent: User[];

  init = false;
  minLength: number;
  notFoundMessage = 'No Data Found';

  constructor(private commonService: UserCrudService) {      
   }
  ngOnInit() {

    this.commonService.getUserList().subscribe(client => {
      this.listClient = client;
    });
  }

  filterCountry(event) {
    let filtered : any[] = [];
    let query = event.query;
    const countQuery = query.length;
   
      for(let i = 0; i < this.listClient.length; i++) {
        let client = this.listClient[i];
        
        if (client.dni.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(client);            
            this.filteredElemnent = filtered;
        }
        if (client.firstName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          filtered.push(client);
          this.filteredElemnent = filtered;
        }
      }    
    }

}


