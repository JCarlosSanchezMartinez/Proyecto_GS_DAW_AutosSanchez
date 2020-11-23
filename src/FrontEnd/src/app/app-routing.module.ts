import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistoriaComponent } from './components/historia/historia.component';
import { ClientManagementComponent } from './components/client-management/client-management.component';
import { GalleryManagementComponent } from './components/gallery-management/gallery-management.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { VehicleGuardService as guard} from './interceptors/vehicle-guard.service';
import { ManagementComponent } from './components/management/management.component';
import { VehiculeManagementComponent } from './components/vehicle-management/vehicle-management.component';
import { SearchVehicleComponent } from './components/vehicle-management/search-vehicle/search-vehicle.component';
import { SearchClientComponent } from './components/client-management/search-client/search-client.component';
import { NewVehicleComponent } from './components/vehicle-management/new-vehicle/new-vehicle.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [ 
      {path: 'home', component: HomeComponent},
      {path: 'historia', component: HistoriaComponent},
      {path: 'contacto', component: ManagementComponent ,canActivate: [guard], data: { expectedRol: ['admin', 'user'] } },
      {path: 'login', component: LoginComponent},
      {path: 'vehicle', component: SearchVehicleComponent ,canActivate: [guard], data: { expectedRol: ['admin', 'user'] } },
      {path: 'vehicle/:id', component: VehiculeManagementComponent},
      {path: 'newVehicle' , component: NewVehicleComponent},
      {path: 'user/:id', component: ClientManagementComponent},
      {path: 'cliente',component: SearchClientComponent},
      {path: 'registro',component: RegisterComponent},
      {path: 'gallery',component: GalleryManagementComponent}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
