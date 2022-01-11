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

  compararContrasena(){
    if(this.contrasena2!="" && this.contrasena1!=""
     && this.contrasena2==this.contrasena1){
      console.log("Si");
      $("#aceptar").prop('disabled', false);
    }else{
      console.log("No");
      $("#aceptar").prop('disabled', true);
    }
  }

  cambiarContrasena(){
    this.sweetalert2Component.loading(true);
    this._usuarioService.postCambiarContrasena(this.contrasena1).subscribe(
      Response=>{
        this.sweetalert2Component.loading(false);
        this.sweetalert2Component.showModalConfirmacion(Response.message,"../ventas/home/modulos");
      },
      error=>{
        this.sweetalert2Component.loading(false);
        this.sweetalert2Component.showModalError(error.error.message);
      }
    ); 
  }

}
