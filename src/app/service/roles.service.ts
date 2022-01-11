import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  putRol(dataRolId: { secuenciaRol: number; nombre: string; secuenciaModulo: number; }) {
    return this.apiService.ApiCallSpring("PUT","/roles",JSON.stringify(dataRolId),null);
  }

  getRolId(secuenciaRol: any) {
    return this.apiService.ApiCallSpring("GET","/roles/"+secuenciaRol,null,null);
  }

  eliminarRol(secuenciaRol: any) {
    return this.apiService.ApiCallSpring("DELETE","/roles/"+secuenciaRol,null,null);
  }
  postRol(nombre,secuenciaModulo) {
    var json={
      "nombre":nombre,
      "secuenciaModulo":secuenciaModulo
    }
    console.log(json);
    return this.apiService.ApiCallSpring("POST","/roles",JSON.stringify(json),null);
  }
  postGuardarRutasPorRol(secuenciaRol, data) {
    var json = JSON.stringify(data);
    console.log("JSON",json);
    return this.apiService.ApiCallSpring("PUT","/roles/ruta/usuario/"+secuenciaRol,json,null);
  }

  postGuardarUsuarioPorRol(secuenciaUsuario, data) {
    var json = JSON.stringify(data);
    console.log("JSON",json);
    return this.apiService.ApiCallSpring("PUT",`/roles/usuario/${secuenciaUsuario}`,json,null);
  }

  constructor(private apiService: ApiService,private http: HttpClient){}
  
  getConsultarRolesPorUsuario() {
    return this.apiService.ApiCallSpring("GET","/roles/usuario",null,null);
  }

  getConsultarRolesPorNoUsuario(idUsuario) {
    return this.apiService.ApiCallSpring("GET",`/roles/noUsuario/${idUsuario}`,null,null);
  }

  getConsultarRoles(page,perPage) {
    return this.apiService.ApiCallSpring("GET",`/roles?perPage=${perPage}&page=${page}`,null,null);
  }
  
  getConsultarRolesPorRutas(ruta) {
    return this.apiService.ApiCallSpring("GET",`/roles/ruta?ruta=${ruta}`,null,null);
  }

  getConsultarRutasPorRol(idRol) {
    return this.apiService.ApiCallSpring("GET",`/roles/ruta/usuario/${idRol}`,null,null);
  }

  getConsultarRolesPorUsuarioTodo(idPaciente) {
    return this.apiService.ApiCallSpring("GET",`/roles/usuario/${idPaciente}`,null,null);
  }

}
