import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { Articulo2Component } from './components/articulo2/articulo2.component';
import { HistoriaComponent } from './components/historia/historia.component';
import { CocheDetallesComponent } from './components/coche-detalles/coche-detalles.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ReadComponent } from './components/Vehicle/read/read.component';
import { AddComponent } from './components/Vehicle/add/add.component';
import { EditComponent } from './components/Vehicle/edit/edit.component';
import { DeleteComponent } from './components/Vehicle/delete/delete.component';
import { VehicleCRUDService } from './services/vehicle-crud.service';
import { ManagementComponent } from './components/management/management.component';
import { UserCrudService } from './services/user-crud.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    Articulo2Component,
    HistoriaComponent,
    CocheDetallesComponent,
    LoginComponent,
    ReadComponent,
    AddComponent,
    EditComponent,
    DeleteComponent,
    ManagementComponent,
 
    
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
   
  ],
  providers: [VehicleCRUDService,UserCrudService],
  bootstrap: [AppComponent]

})
export class AppModule { }
