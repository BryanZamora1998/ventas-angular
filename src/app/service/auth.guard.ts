import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { RolesService } from './roles.service';
import "rxjs/add/operator/map"; 

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  autenticado;
  constructor(private auth: AuthService,
              private router:Router,
              private _rolesService:RolesService
              ){  
              }

  rolesUsu=[];
  rolesRut:any;
  entro=false;
  canActivate(route: ActivatedRouteSnapshot):Observable<boolean>{

        this.entro=false;
        this._rolesService.getConsultarRolesPorRutas(route.url[0].path).subscribe(Response => {
          this.rolesRut=Response['data'];
          console.log("ruta: ",route.url[0].path,"Roles: ",this.rolesRut);
        });


        return  this._rolesService.getConsultarRolesPorUsuario().map(Response => {
            this.rolesUsu=Response['data'];
            console.log("ruta: ",this.rolesUsu);
            if(this.auth.estaAutenticado()){
              this.entro=false;
              this.rolesUsu.forEach(a => {
                this.rolesRut.forEach(b=> {
                  if(a.secuenciaRol==b.secuenciaRol){
                    this.entro=true;
                  }
                });
              });
            }

            if(this.entro){
              console.log("Entro: ",this.entro);
              return this.entro;
            }else{
              localStorage.setItem("autenticado",JSON.stringify(false));
              this.router.navigate(['../ventas/login']);
              console.log("Entro: ",false);
              return false;
            }
          
      });
  }
}
