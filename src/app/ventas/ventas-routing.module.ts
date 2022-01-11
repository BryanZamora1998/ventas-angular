import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../service/auth.guard';
import { CambiarContrasenaComponent } from './cambiar-contrasena/cambiar-contrasena.component';
import { LoginComponent } from './login/login.component';
import { OlvidoContrasenaComponent } from './olvido-contrasena/olvido-contrasena.component';
import { VentasComponent } from './ventas.component';


const routes: Routes = [
  {
     path: '', component: VentasComponent, children: [
      { 
        path: 'olvido-contrasena',  component: OlvidoContrasenaComponent 
      },
      { 
        path: 'login',  component: LoginComponent 
      },
      { 
        path: 'cambiar-contrasena',  component: CambiarContrasenaComponent
      },
      {
        path: 'home',loadChildren:()=> import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: '', redirectTo: 'login', pathMatch: 'full'
      },
      { 
        path: '**', component: LoginComponent 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentasRoutingModule { }
