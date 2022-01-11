import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  
  constructor(private http: HttpClient){}

 token(){

   var data = JSON.parse(localStorage.getItem('data'));
   var token=this.parseJwt(data['token']);
   var exp=new Date(1000*token.exp);

   if(exp<=new Date()){
       this.getRefreshToken(data['token']).subscribe(
           Response=>{
              data['token']=Response['data'].token;
              localStorage.setItem('data',JSON.stringify(data)); 
           },
           error=>{
             console.log("Error: ",error.error);
           }
       ); 
   }
   return data["token"];
 }

 getRefreshToken(token) {

  const headers = new HttpHeaders({
   'Authorization': "Bearer "+token
 });

  return this.http.get(environment.apiUrlSpring+"/autenticacion/refreshToken",{headers:headers});

}

 parseJwt (token) {
   var base64Url = token.split('.')[1];
   var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
   var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
       return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
   }).join(''));

   return JSON.parse(jsonPayload);
 };

}
