import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguridadRoutingModule } from './seguridad-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RolesComponent } from './roles/roles.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShareModule } from 'src/app/share/share.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';


@NgModule({
  declarations: [UsuariosComponent, RolesComponent],
  imports: [
    CommonModule,
    SeguridadRoutingModule,
    MatStepperModule,
    MatInputModule,
    ReactiveFormsModule,
    ShareModule,
    FormsModule,
    CommonModule,
    MatTooltipModule,
    NgxSkeletonLoaderModule.forRoot(),
  ]
})
export class SeguridadModule { }
