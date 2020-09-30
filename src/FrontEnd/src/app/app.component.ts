import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularUltimo';

  constructor(private router:Router){}


  ngOnInit() {
    
    this.read();
  }
  read(){
    this.router.navigate(["read"]);
  }
  add(){
    this.router.navigate(["add"]);
  }
  edit(){
    this.router.navigate(["edit"]);
  }
}
