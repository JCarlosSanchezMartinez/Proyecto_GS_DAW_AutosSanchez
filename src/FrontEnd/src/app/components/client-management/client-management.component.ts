import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/model/User';
import { UserCrudService } from 'src/app/services/user-crud.service';

@Component({
  selector: 'app-client-management',
  templateUrl: './client-management.component.html',
  styleUrls: ['./client-management.component.css']
})
export class ClientManagementComponent implements OnInit {

 
  public formClient: FormGroup;

 
  public client: User = new User();

  private buildFrom(){
    this.formClient = this.formBuilder.group({
    id:new FormControl(''),
    dni:new FormControl(''),
    first_name:new FormControl(''),
    last_name:new FormControl(''),
    address:new FormControl(''),
    email:new FormControl(''),
    phone:new FormControl(''),
    username:new FormControl(''),
    password:new FormControl(''),
   

    })
  }

  constructor(private formBuilder: FormBuilder,private serviceUser: UserCrudService) { 
   
  }
  


readID(id: number){ 
 
}

readUser(id: number){
  this.serviceUser.getUser(id).subscribe((data:any)=>{this.client=data})  
}


update(client: User){  
 
}
delete(){

  
}
  
ngOnInit() {
  this.buildFrom();
  
}
onSubmit(){
  
}

  

}
