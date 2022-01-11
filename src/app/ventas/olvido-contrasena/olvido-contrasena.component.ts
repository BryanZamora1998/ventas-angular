import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Sweetalert2Component } from 'src/app/share/sweetalert2/sweetalert2.component';

@Component({
  selector: 'app-olvido-contrasena',
  templateUrl: './olvido-contrasena.component.html',
  styleUrls: ['./olvido-contrasena.component.css'],
  providers:[UsuarioService]
})
export class OlvidoContrasenaComponent implements OnInit {

  constructor(  private _usuarioService:UsuarioService,
    private sweetalert2Component:Sweetalert2Component,) { 
    
  }

  ngOnInit(): void {
  }

  correo:any="";

  /**
   * @description: Si el campo es null desabilita el input correo
   * @author: Bryan Zamora
   */
  validaSiEsVacio(){
    if(this.correo!=""){
      console.log("Si");
      $("#aceptar").prop('disabled', false);
    }else{
      console.log("No");
      $("#aceptar").prop('disabled', true);
    }
  }

  /**
   * @description: Hace el envio de la nueva contraseña al correo
   * @author: Bryan Zamora
   */
  recuperarContrasena(){
    this.sweetalert2Component.loading(true);
    this._usuarioService.postRecuperarContrasena(this.correo).subscribe(
      Response=>{
        this.sweetalert2Component.loading(false);
        this.sweetalert2Component.showModalConfirmacion(Response.message,"../ventas/login");
      },
      error=>{
        this.sweetalert2Component.loading(false);
        this.sweetalert2Component.showModalError(error.error.message);
      }
    ); 
  }

}
