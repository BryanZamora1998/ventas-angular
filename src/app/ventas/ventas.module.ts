import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentasRoutingModule } from './ventas-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ShareModule } from '../share/share.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CambiarContrasenaComponent } from './cambiar-contrasena/cambiar-contrasena.component';
import { OlvidoContrasenaComponent } from './olvido-contrasena/olvido-contrasena.component';


@NgModule({
  declarations: [LoginComponent,HomeComponent, CambiarContrasenaComponent,OlvidoContrasenaComponent],
  imports: [
    CommonModule,
    VentasRoutingModule,
    FormsModule,
    ShareModule,           
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [ HttpClient ]
      }
    }),
    NgxSkeletonLoaderModule.forRoot()
  ]
})
export class VentasModule { }
