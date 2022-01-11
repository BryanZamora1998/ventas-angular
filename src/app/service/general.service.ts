import { Injectable} from '@angular/core';
import {ApiService} from './api.service'
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeneralService{
  getModulos() {
    return this.apiService.ApiCallNodeJS("GET","/general/modulos",null,null);
  }
  getConsultarEdad(fechaNacimiento: string) {
    return this.apiService.ApiCallSpring("GET",`/general/calcularEdad?fechaNacimiento=${fechaNacimiento}`,null,null);
  }

  constructor(private apiService: ApiService,private http: HttpClient){}

    getTipoIdentificacion():Observable<any>{
      return this.apiService.ApiCallNodeJS("GET","/general/tipoIdentificacion",null,null);
    }

    getGenero():Observable<any>{
      return this.apiService.ApiCallNodeJS("GET","/general/genero",null,null);
    }

    getPais():Observable<any>{
      return this.apiService.ApiCallNodeJS("GET","/general/pais",null,null);
    }
 
    getProvincia(secuenciaPais):Observable<any>{
      return this.apiService.ApiCallNodeJS("GET",`/general/provincia/${secuenciaPais}`,null,null);
    }

    getCiudad(secuenciaPais,secuenciaProvincia):Observable<any>{
      return this.apiService.ApiCallNodeJS("GET",`/general/ciudad/${secuenciaPais}/${secuenciaProvincia}`,null,null);
    }
}
