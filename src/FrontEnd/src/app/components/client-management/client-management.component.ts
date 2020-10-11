import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    id:[''],
    dni: ['',Validators.required],
    first_name :['',Validators.required],
    last_name: ['',Validators.required],
    address: ['',Validators.required],
    email: ['',Validators.required],
    phone: ['',Validators.required],
    username: ['',Validators.required],
    password: ['',Validators.required], 
   

    })
  }

  constructor(private formBuilder: FormBuilder,private serviceUser: UserCrudService) { 
   
  }
  


readID(id: number){ 
 
}

readUser(id: number){
  this.serviceUser.getUser(id).subscribe((data:any)=>{this.client=data})  
}
create(){
  console.log(this.formClient.value)
  //this.service.addVehicle(this.vehicle).subscribe((data:any)=>{this.vehicle=data})
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
