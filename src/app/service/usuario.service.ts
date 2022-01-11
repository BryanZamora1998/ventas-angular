import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  eliminarUsuario(secuenciaUsuario: any) {
    return this.apiService.ApiCallSpring("DELETE",`/usuarios/${secuenciaUsuario}/eliminarUsuario`,null,null);
  }
  putActivarOInactivarUsuario(secuenciaUsuario: any) {
    return this.apiService.ApiCallSpring("PUT",`/usuarios/activarOInactivarUsuario/${secuenciaUsuario}`,null,null);
  }
  getConsultarUsuarioDisponible(primerNombre: string, segundoNombre: string, primerApellido: string, segundoApellido: string) {
    return this.apiService.ApiCallSpring("GET",`/usuarios/usuarioDisponible?primerNombre=${primerNombre}&segundoNombre=${segundoNombre}&primerApellido=${primerApellido}&segundoApellido=${segundoApellido}`,null,null);
  }

    constructor(private apiService: ApiService,private http: HttpClient){}

    postCrearUsuario(user):Observable<any>{
      user.password=btoa(user.password1);
      user.photo=null;
      return this.apiService.ApiCallSpring("POST","/usuarios/crearUsuario",user,null);
    }

    postRecuperarContrasena(correo):Observable<any>{

      const objCorreo={
        "correo":correo
      }

      return this.apiService.ApiCallSpringSinSeg("POST","/usuarios/recuperarContrasena",objCorreo,null);
    }

    postCambiarContrasena(contrasenia):Observable<any>{

      const objcontrasenia={
        "contrasenia":btoa(contrasenia)
      }

      return this.apiService.ApiCallSpring("POST","/usuarios/cambioContrasena",objcontrasenia,null);
    }

    putActualizarUsuario(user):Observable<any>{
      return this.apiService.ApiCallSpring("PUT",`/usuarios/actualizarUsuario`,user,null);
    }

    getConsultaUsuario(page,perPage,valor,estado):Observable<any>{
      return this.apiService.ApiCallSpring("GET",`/usuarios?page=${page}&perPage=${perPage}&cedulaCodigoUsuario=${valor}&estado=${estado}`,null,null);
    }

    getUsuarioXId(idUsuario):Observable<any>{
      return this.apiService.ApiCallSpring("GET",`/usuarios/${idUsuario}/basica`,null,null);
    }

    postPhoto(photo,idPersona):Observable<any>{
      const data: FormData = new FormData();
      data.append('idPersona',idPersona);
      data.append('photo',photo);

      var headers = new HttpHeaders();
      headers.append('reportProgress',JSON.stringify(true));
      headers.append('responseType','text');

      return this.apiService.ApiCallMultiFormSpring("POST",`/usuarios/photo`,data,headers);
  }



}
