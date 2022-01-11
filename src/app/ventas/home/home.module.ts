import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { ShareModule } from 'src/app/share/share.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule} from '@angular/forms';
import { ModulosComponent } from './modulos/modulos.component';
import { SeguridadComponent } from './seguridad/seguridad.component';
import { ProductosComponent } from './productos/productos.component';


@NgModule({
  declarations: [ModulosComponent,SeguridadComponent,ProductosComponent],
  imports: [
    CommonModule,
     HomeRoutingModule,
     ShareModule,
     MatTooltipModule,
    FormsModule
  ]
})
export class HomeModule { }
