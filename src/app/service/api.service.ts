import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { TokenService } from './token.service';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    
    URL_API_SPRING = environment.apiUrlSpring;
    URL_API_NODEJS = environment.apiUrlNodeJS;

    constructor(private http: HttpClient,private _tokenService:TokenService) { }
    public ApiLoginSpring(method,endpoint,data,headers):Observable<any>{

        if(headers!=null){
            headers.set("Content-Type","application/json");
        }

        switch (method) {
            case "POST":
                return this.http.post(this.URL_API_SPRING + endpoint, data, { headers: headers , params : data});
        }        
    }


    public ApiCallSpring(method,endpoint,data,headers):Observable<any>{
        
        if(headers!=null){
            headers.set("Content-Type","application/json");
            headers.set("Authorization","Bearer " + this.getToken());
        }else{
            headers = new HttpHeaders({
              "Content-Type":"application/json",
              "Authorization":"Bearer " + this.getToken()
            });
        }

        switch (method) {
            case "GET":
                return this.http.get(this.URL_API_SPRING + endpoint, { headers: headers , params: data })
            case "POST":
                return this.http.post(this.URL_API_SPRING + endpoint, data, { headers: headers , params : data});
            
            case "PUT":
                return this.http.put(this.URL_API_SPRING + endpoint, data, { headers: headers , params : data});
            case "DELETE":
            return this.http.delete(this.URL_API_SPRING + endpoint, { headers: headers, params: data });
        }        
    }

    public ApiCallSpringSinSeg(method,endpoint,data,headers):Observable<any>{

        if(headers!=null){
            headers.set("Content-Type","application/json");
        }else{
            headers = new HttpHeaders({
              "Content-Type":"application/json"
            });
        }

        switch (method) {
            case "GET":
                return this.http.get(this.URL_API_SPRING + endpoint, { headers: headers , params: data })
            case "POST":
                return this.http.post(this.URL_API_SPRING + endpoint, data, { headers: headers , params : data});
            
            case "PUT":
                return this.http.put(this.URL_API_SPRING + endpoint, data, { headers: headers , params : data});
            case "DELETE":
            return this.http.delete(this.URL_API_SPRING + endpoint, { headers: headers, params: data });
        }        
    }


    public ApiCallNodeJS(method,endpoint,data,headers):Observable<any>{

        if(headers!=null){
            headers.set("Content-Type","application/json");
        }else{
            headers = new HttpHeaders({
              "Content-Type":"application/json",
            });
        }

        switch (method) {
            case "GET":
                return this.http.get(this.URL_API_NODEJS + endpoint, { headers: headers , params: data })
            case "POST":
                return this.http.post(this.URL_API_NODEJS + endpoint, data, { headers: headers , params : data});
            
            case "PUT":
                return this.http.put(this.URL_API_NODEJS + endpoint, data, { headers: headers , params : data});
            case "DELETE":
            return this.http.delete(this.URL_API_NODEJS + endpoint, { headers: headers, params: data });
        }        
    }

    public ApiCallMultiFormSpring(method,endpoint,data,headers):Observable<any>{

        if(headers!=null){
            headers.set("Content-Type","application/json");
            headers.set("Authorization","Bearer " + this.getToken());
        }else{
            headers = new HttpHeaders({
              "Content-Type":"application/json",
              "Authorization":"Bearer " + this.getToken()
            });
        }

        switch (method) {
           
            case "POST":
                return this.http.post(this.URL_API_SPRING + endpoint, data,headers);
        }        
    }


    getToken(){
        return this._tokenService.token();
    }
}
