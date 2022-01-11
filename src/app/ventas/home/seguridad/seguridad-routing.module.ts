import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/service/auth.guard';
import { RolesComponent } from './roles/roles.component';
import { SeguridadComponent } from './seguridad.component';
import { UsuariosComponent } from './usuarios/usuarios.component';


const routes: Routes = [
  {
     path: '', component: SeguridadComponent, children: [
      { 
          path: 'usuarios',loadChildren:()=> import('./usuarios/usuarios.module').then(m => m.UsuariosModule),canActivate:[AuthGuard]
      },
      { 
        path: 'roles',component: RolesComponent,canActivate:[AuthGuard]
      },
      {
        path: '', redirectTo: 'usuarios', pathMatch: 'full'
      },
      { 
        path: '**', component: UsuariosComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
