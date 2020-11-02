import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private tokenService: TokenService) { }

  isLogged = false;
  isCollapse = true;


  ngOnInit() {
    if(this.tokenService.getToken()){
    this.isLogged=true;

    } else {
      this.isLogged=false;
    }

  } 
  toggleState() {
    let foo = this.isCollapse
    this.isCollapse = foo === false ? true : false;
  }

  logout(){
    this.tokenService.logOut();
    window.location.reload();
  }

  
}

