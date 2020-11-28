import { Component, Input, OnInit } from '@angular/core';
import { FormControlName, FormGroup } from '@angular/forms';
import { User } from 'src/app/model/User';
import { UserCrudService } from 'src/app/services/user-crud.service';

@Component({
  selector: 'app-auto-user',
  templateUrl: './auto-user.component.html',
  styleUrls: ['./auto-user.component.css']
})
export class AutoUserComponent implements OnInit {


  @Input() parentFormGroup: FormGroup;
  @Input() codeStatus: string;

  @Input() isMultiple: boolean;
  @Input() inputClient: FormControlName;
  filteredElemnent: User[];
  form: FormGroup;
  listClient: User[];
  init = false;
  minLength: number;
  notFoundMessage = 'No Data Found';

  constructor(private commonService: UserCrudService) { }

  ngOnInit() {
    this.minLength = 1;
  }
  methodAutocomplete(event) {
    this.commonService.getClient(event.query).subscribe(data => {
        this.listClient = data;

    });
}

}
