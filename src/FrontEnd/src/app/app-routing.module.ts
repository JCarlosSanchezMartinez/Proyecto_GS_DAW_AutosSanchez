import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HistoriaComponent } from './components/historia/historia.component';
import { ManagementComponent } from './components/management/management.component';
import { ClientManagementComponent } from './components/client-management/client-management.component';
import { VehiculeManagementComponent } from './components/vehicule-management/vehicule-management.component';
import { GalleryManagementComponent } from './components/gallery-management/gallery-management.component';


const routes: Routes = [ 
      {
        path: 'historia',
        component: HistoriaComponent
      },
      {
        path: 'contacto',
        component: ManagementComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'vehiculo',
        component: VehiculeManagementComponent
      },
      {
        path: 'cliente',
        component: ClientManagementComponent
      },
      {
        path: 'gallery',
        component: GalleryManagementComponent
      }  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
