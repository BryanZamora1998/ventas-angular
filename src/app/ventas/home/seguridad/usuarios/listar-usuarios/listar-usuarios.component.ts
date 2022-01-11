import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/service/general.service';
import { RolesService } from 'src/app/service/roles.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Sweetalert2Component } from 'src/app/share/sweetalert2/sweetalert2.component';
declare var $:any;

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css'],
  providers:[UsuarioService,GeneralService,RolesService]
})
export class ListarUsuariosComponent implements OnInit {

  constructor(private _usuarioService:UsuarioService,
    private sweetalert2Component:Sweetalert2Component,
    private _rolesService:RolesService) { }

  public data=null;

  ngOnInit(): void {
    this.listarUsuario();
  }
  actualizarUsuario(data){
      this.sweetalert2Component.loading(true);
      this._usuarioService.putActualizarUsuario(data).subscribe(
        Response=>{
          this.dataUsuarioId=Response.data;
          this.sweetalert2Component.showModalConfirmacion(Response.message,null);
        },
        error=>{
          console.log(error.error.message);
          this.sweetalert2Component.loading(false);
          this.sweetalert2Component.showModalError(error.error.message);
        }
      ); 
  }

  dataUsuarioId=[];
  getUsuarioXId(idUsuario){
    this._usuarioService.getUsuarioXId(idUsuario).subscribe(
      Response=>{
        this.dataUsuarioId=Response.data;
      },
      error=>{
        console.log(error.error.message);
      }
    ); 
   }

getpaginacion(page){
  this.page=page;
  this.listarUsuario();
}

/*
*Valida si es vacio
*/
validarVacio(target){
  if(target=="")
   this.listarUsuario();
};

public page:Number=1;
public perPage:Number=5;
public totalRows:Number=0;
public mostrarPag:Boolean=false;
public valor:String="";
public estado:String="TODOS";
estadoUsuario(){
  console.log(this.estado);
  this.listarUsuario();
}

guardar(idUsuario){
  var data=[];
  $(".checkboxRol:checked").each(function() {
    data.push($(this).val());
  });
  this.putGuardarRolesPorUsuario(idUsuario,data);
}
putGuardarRolesPorUsuario(idUsuario: any, data: any[]) {
  this.sweetalert2Component.loading(true);
  this._rolesService.postGuardarUsuarioPorRol(idUsuario,data).subscribe(
    Response=>{
      this.sweetalert2Component.loading(false);
    },
    error=>{
      console.log(error.error.message);
      this.sweetalert2Component.loading(false);
      this.sweetalert2Component.showModalError(error.error.message);
    }
  ); 
}

getConsultaRolPorUsuarioTodos(idUsuario){
  this._rolesService.getConsultarRolesPorUsuarioTodo(idUsuario).subscribe(
    Response=>{
      this.data.forEach(e=>{
          if(e.secuenciaUsuario==idUsuario){
            console.log(this.data);
            e.roles=Response['data'];
          }
      });
    },
    error=>{
      console.log(error.error.message);
    }
  );
}

/**
 * @author Bryan Zamora
 * @description Consulta la lista de usuarios
 */
listarUsuario(){
  this._usuarioService.getConsultaUsuario(this.page,this.perPage,this.valor,this.estado).subscribe(
    Response=>{
      this.mostrarPag=false;
      this.data=Response["data"].rows;
      this.totalRows=Response["data"].totalRows;
      if(this.data.length>=this.perPage || this.page!=1){
        this.mostrarPag=true;
      }
    },
    error=>{
      console.log(error.error.message);
    }
  ); 
}

/**
 * @author Bryan Zamora
 * @description Activa o inactiva el usuario
 */
activarOInactivarUsuario(secuenciaUsuario){
  this._usuarioService.putActivarOInactivarUsuario(secuenciaUsuario).subscribe(
    Response=>{
      this.listarUsuario();
    },
    error=>{
      console.log(error.error.message);
      this.sweetalert2Component.showModalError(error.error.message);
    }
  ); 
}

/**
 * @author Bryan Zamora
 * @param secuenciaUsuario 
 * @description Elimina el usuario
 */
  deleteEliminarUsuario(secuenciaUsuario){ 
    this.sweetalert2Component.loading(true);
    this._usuarioService.eliminarUsuario(secuenciaUsuario).subscribe(
      Response=>{
        this.listarUsuario();
        this.sweetalert2Component.loading(false);
      },
      error=>{
        console.log(error.error.message);
        this.sweetalert2Component.loading(false);
        this.sweetalert2Component.showModalError(error.error.message);
      }
    ); 
  }
}
