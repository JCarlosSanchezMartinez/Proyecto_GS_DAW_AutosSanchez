import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistoriaComponent } from './components/historia/historia.component';
import { ManagementComponent } from './components/management/management.component';
import { ClientManagementComponent } from './components/client-management/client-management.component';
import { GalleryManagementComponent } from './components/gallery-management/gallery-management.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { VehicleGuardService as guard} from './interceptors/vehicle-guard.service';
import { VehiculeManagementComponent } from './components/management/vehicule-management/vehicule-management.component';


const routes: Routes = [ 
      {path: 'historia', component: HistoriaComponent},
      {path: 'contacto', component: ManagementComponent ,canActivate: [guard], data: { expectedRol: ['admin', 'user'] } },
      {path: 'login', component: LoginComponent},
      {path: 'vehiculo', component: VehiculeManagementComponent},
      {path: 'cliente',component: ClientManagementComponent},
      {path: 'registro',component: RegisterComponent},
      {path: 'gallery',component: GalleryManagementComponent}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
