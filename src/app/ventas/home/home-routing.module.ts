import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/service/auth.guard';
import { HomeComponent } from './home.component';
import { ModulosComponent } from './modulos/modulos.component';
import { ProductosComponent } from './productos/productos.component';

const routes: Routes = [
  {
     path: '', component: HomeComponent, children: [
      { 
        path: 'seguridad',loadChildren:()=> import('./seguridad/seguridad.module').then(m => m.SeguridadModule)
      },
      { 
        path: 'modulos',  component: ModulosComponent
      },
      { 
        path: 'productos',  component: ProductosComponent,//canActivate:[AuthGuard]
      }
      ,
      {
        path: '', redirectTo: 'modulos'
      },
      { 
        path: '**', component: ModulosComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
