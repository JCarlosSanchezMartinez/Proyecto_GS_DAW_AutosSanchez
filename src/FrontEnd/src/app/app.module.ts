import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HistoriaComponent } from './components/historia/historia.component';
import { HttpClientModule } from '@angular/common/http';
import { VehicleCRUDService } from './services/vehicle-crud.service';
import { ManagementComponent } from './components/management/management.component';
import { UserCrudService } from './services/user-crud.service';
import { ClientManagementComponent } from './components/client-management/client-management.component';
import { GalleryManagementComponent } from './components/gallery-management/gallery-management.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { interceptorProvider } from './interceptors/vehicle-interceptor.service';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CheckboxModule} from 'primeng/checkbox';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { VehiculeManagementComponent } from './components/vehicle-management/vehicle-management.component';
import { SearchVehicleComponent } from './components/vehicle-management/search-vehicle/search-vehicle.component';
import { SearchClientComponent } from './components/client-management/search-client/search-client.component';
import { NewVehicleComponent } from './components/vehicle-management/new-vehicle/new-vehicle.component';
import { HomeComponent } from './components/home/home.component';
import { CarouselModule } from 'primeng/carousel';
import {FileUploadModule} from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';



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
    RegisterComponent,
    SearchVehicleComponent,
    SearchClientComponent,
    NewVehicleComponent,
    HomeComponent,
 


    
    

    
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    ConfirmDialogModule,
    BrowserAnimationsModule,
    CheckboxModule,
    AutoCompleteModule,
    CarouselModule,
    FileUploadModule,
    DropdownModule







   
  ],
  providers: [VehicleCRUDService,UserCrudService,interceptorProvider],
  bootstrap: [AppComponent]

})
export class AppModule { }
