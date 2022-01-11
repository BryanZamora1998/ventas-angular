import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/service/auth.guard';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { ListarUsuariosComponent } from './listar-usuarios/listar-usuarios.component';
import { UsuariosComponent } from './usuarios.component';


const routes: Routes = [
  {
     path: '', component: UsuariosComponent, children: [
      { 
        path: 'crear-usuario',  component: CrearUsuarioComponent, canActivate:[AuthGuard]
      },
      { 
        path: 'listar-usuarios',  component: ListarUsuariosComponent ,canActivate:[AuthGuard]
      },
      {
        path: '', redirectTo: 'listar-usuarios', pathMatch: 'full',canActivate:[AuthGuard]
      },
      { 
        path: '**', component: ListarUsuariosComponent ,canActivate:[AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
