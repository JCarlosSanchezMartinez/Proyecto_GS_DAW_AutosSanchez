import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HistoriaComponent } from './components/historia/historia.component';
import { ReadComponent } from './components/Vehicle/read/read.component';
import { AddComponent } from './components/Vehicle/add/add.component';
import { EditComponent } from './components/Vehicle/edit/edit.component';
import { ManagementComponent } from './components/management/management.component';


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
        path: 'read',
        component: ReadComponent
      },
      {
        path: 'add',
        component: AddComponent
      },
      {
        path: 'edit',
        component: EditComponent
      }    
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
