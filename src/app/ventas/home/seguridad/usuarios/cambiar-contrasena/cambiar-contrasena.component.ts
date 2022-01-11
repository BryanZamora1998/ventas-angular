import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Sweetalert2Component } from 'src/app/share/sweetalert2/sweetalert2.component';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrls: ['./cambiar-contrasena.component.css'],
  providers:[UsuarioService]
})
export class CambiarContrasenaComponent implements OnInit {

  constructor(  private _usuarioService:UsuarioService,
    private sweetalert2Component:Sweetalert2Component,) { 
    
  }

  ngOnInit(): void {
  }

   /**
   * @author Bryan Zamora
   * @description Valida el ojito de la contraseña
   */
  typeInputF1="password";
  showPF1:boolean=true;
  contrasena1:any="";
  mostrarPassword1(){

    if(this.typeInputF1=="text"){
      this.showPF1=true;
      this.typeInputF1="password";
    }else{
      this.showPF1=false;
      this.typeInputF1="text";
    }
  }

     /**
   * @author Bryan Zamora
   * @description Valida el ojito de la contraseña
   */
  typeInputF2="password";
  showPF2:boolean=true;
  contrasena2:any="";
  mostrarPassword2(){

    if(this.typeInputF2=="text"){
      this.showPF2=true;
      this.typeInputF2="password";
    }else{
      this.showPF2=false;
      this.typeInputF2="text";
    }
  }

  /**
   * @author Bryan Zamora
   * @description Compara las contraseña y valida si no son iguales para 
   * habilitar el boton de envio de contraseña
   */
  compararContrasena(){
    if(this.contrasena2!="" && this.contrasena1!=""
     && this.contrasena2==this.contrasena1){
      $("#aceptar").prop('disabled', false);
    }else{
      $("#aceptar").prop('disabled', true);
    }
  }

   /**
   * @author Bryan Zamora
   * @description Cambia la contraseña
   * 
   */
  cambiarContrasena(){
    this.sweetalert2Component.loading(true);
    this._usuarioService.postCambiarContrasena(this.contrasena1).subscribe(
      Response=>{
        this.sweetalert2Component.loading(false);
        this.sweetalert2Component.showModalConfirmacion(Response.message,"../usuarios");
      },
      error=>{
        this.sweetalert2Component.loading(false);
        this.sweetalert2Component.showModalError(error.error.message);
      }
    ); 
  }

}
