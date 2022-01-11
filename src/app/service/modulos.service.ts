import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ModulosService {

  constructor(private apiService: ApiService,private http: HttpClient){}

  getConsultarModulosPorUsuario() {
    return this.apiService.ApiCallSpring("GET","/modulos",null,null);
  }
  
}
