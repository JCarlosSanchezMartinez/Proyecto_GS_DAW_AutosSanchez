import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }  from '@angular/router';


@Component({
  selector: 'app-coche-detalles',
  templateUrl: './coche-detalles.component.html',
  styleUrls: ['./coche-detalles.component.css']
})
export class CocheDetallesComponent implements OnInit {

  
  constructor(
    private ruta:ActivatedRoute
  ) { 
    this.ruta.params.subscribe(params=>{
      console.log(params['id'])
    })
  }

  ngOnInit() {
  }

}
