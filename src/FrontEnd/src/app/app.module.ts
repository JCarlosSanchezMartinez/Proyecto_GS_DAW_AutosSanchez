import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HistoriaComponent } from './components/historia/historia.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { VehicleCRUDService } from './services/vehicle-crud.service';
import { ManagementComponent } from './components/management/management.component';
import { UserCrudService } from './services/user-crud.service';
import { VehiculeManagementComponent } from './components/vehicule-management/vehicule-management.component';
import { ClientManagementComponent } from './components/client-management/client-management.component';
import { GalleryManagementComponent } from './components/gallery-management/gallery-management.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    HistoriaComponent,
    LoginComponent,
    ManagementComponent,
    VehiculeManagementComponent,
    ClientManagementComponent,
    GalleryManagementComponent,
 
    
 
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
