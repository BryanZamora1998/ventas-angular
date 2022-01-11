import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Sweetalert2Component} from '../../share/sweetalert2/sweetalert2.component'
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public usuario:String;
  public contrasena:String;
  public activeLang:string;
  
  constructor(
    private _router:Router,
    private sweetalert2Component:Sweetalert2Component,
    private translate: TranslateService,
    private auth: AuthService 
  ) { 

  }
      
   typeInputF="password";
   showPF:boolean=true;
    mostrarPassword(){
  
      if(this.typeInputF=="text"){
        this.showPF=true;
        this.typeInputF="password";
      }else{
        this.showPF=false;
        this.typeInputF="text";
      }
    }

 
  public data:any;

  ngOnInit(): void {
    localStorage.removeItem("data");
    localStorage.removeItem("autenticado");
    this.translate.use(environment.languaje);
  }

  /**
   * @author Bryan Zamora
   * @param user 
   * @param password 
   * @description Autenticacion de usuario
   */
  postAutenticacion(){
    this.sweetalert2Component.loading(true);
    this.auth.loginP(this.usuario,this.contrasena).subscribe(
        Response=>{
          this.sweetalert2Component.loading(false);
          if(Response['data'].esContrasenaPrimeraVez==null || Response['data'].esContrasenaPrimeraVez==false){
             this._router.navigate(['../ventas/home']);
          }else{
            this._router.navigate(['../ventas/cambiar-contrasena']);
          }
          localStorage.setItem("data",JSON.stringify(Response['data']));
        },
        error=>{
          this.sweetalert2Component.showModalError(error.error.message);
        }
      );
    }

  /**
   * @author Bryan Zamora
   * @description  Captura el lenguage que existe en memoria caso contrario setea 'es' por defecto.
   **/
    capturarLenguaje(){
      if(this.activeLang!=null || this.activeLang==undefined){
        this.activeLang=JSON.parse(localStorage.getItem("languaje"));
        this.translate.use(this.activeLang);
      }else{
        this.activeLang=environment.languaje;
        this.translate.setDefaultLang(this.activeLang);
      }
    }
  }


  
