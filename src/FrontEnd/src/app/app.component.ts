import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})
export class AppComponent {
  title = 'AngularUltimo';

  constructor(private router:Router,
    private messageService: MessageService){}


  ngOnInit() {
    
    
  }
  
}
