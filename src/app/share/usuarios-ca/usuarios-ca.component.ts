import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GeneralService } from 'src/app/service/general.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { environment } from 'src/environments/environment';
declare var $:any;

@Component({
  selector: 'app-usuarios-ca',
  templateUrl: './usuarios-ca.component.html',
  styleUrls: ['./usuarios-ca.component.css'],
  providers:[GeneralService,UsuarioService,DatePipe]
})
export class UsuariosCAComponent implements OnInit {
  @Output () valueResponse: EventEmitter<any> = new EventEmitter();

  crearOActualizarUsuario(){
    this.valueResponse.emit(this.data);
  }

  constructor(
    private _generalService:GeneralService,
    private _usuarioService:UsuarioService,
    private translate: TranslateService,

  ) {
    this.translate.setDefaultLang(environment.languaje);
   }
   consultarUsuarioDisponible(){
     if(this.data.primerNombre.length>0 && this.data.primerApellido.length>0)
        this.getConsultarUsuarioDisponible();
   }

   ngOnChanges(){
    if(this.data.secuenciaPais!=null && this.data.secuenciaPais!=0){
      this.getProvincia();
    }
   }

   /**
    * @description: Consulta la edad según la fecha de nacimiento 
    * 
    * @author: Bryan Zamora
    * @param:  fechaNaciemiento
    * 
    */
   consultarEdad(){
    this._generalService.getConsultarEdad(this.data.fechaNacimiento).subscribe(
      Response=>{
        this.data.edad=Response.data.edad;
      },
      error=>{
        console.log(error.error.message);
      }
    ); 
      console.log(this.data);
   }

   /**
    * @description: Consulta los usuarios disponibles 
    * 
    * @author: Bryan Zamora
    * @param:  primerNombre
    * @param:  segundoNombre
    * 
    */
   getConsultarUsuarioDisponible(){
    this._usuarioService.getConsultarUsuarioDisponible(this.data.primerNombre,this.data.segundoNombre,this.data.primerApellido,this.data.segundoApellido).subscribe(
      Response=>{
        this.data.usuario=Response.data.usuarioDisponible;
      },
      error=>{
        console.log(error.error.message);
      }
    ); 
   }

   photo:File=null;
   @Input() data=
    {
      secuenciaUsuario:0,
      primerNombre:"",
      primerApellido:"",
      segundoNombre:"",
      segundoApellido:"",
      secuenciaTipoIdentificacion:0,
      secuenciaGenero:0,
      fechaNacimiento:"",
      usuario:"",
      numeroIdentificacion:"",
      secuenciaPais:0,
      secuenciaProvincia:0,
      secuenciaCiudad:0,
      email:"",
      edad:"",
      telefonoMovil:"",
      telefonoFijo:"",
      direccion:""
  }

  ngOnInit(): void {
    this.getTipoIdentificacion();
    this.getGenero();
    this.getPais();
  }

  secuenciaPais=0;
  secuenciaProvincia=0;

  public tipoIdentificacion:any=[
                    {
                      secuenciaTipoIdentificacion:0,
                      nombre:""
                   }
                ];
  public genero:any=[
                    {
                      secuenciaGenero:0,
                      nombre:"",
                      descripcionGenero:""
                    }
              ];

  /**
     * @author Bryan Zamora
     * @description Consulta los tipos de identificacion
     * 
     */
  getTipoIdentificacion(){
    this._generalService.getTipoIdentificacion().subscribe(
        Response=>{
          this.tipoIdentificacion=Response.data;
        },
        error=>{
          console.log(error.error.message);
        }
    ); 
  }

    /**
     * @author Bryan Zamora
     * @description Consulta los generos
     */
    getGenero(){
      this._generalService.getGenero().subscribe(
          Response=>{
            this.genero=Response.data;

            this.genero.forEach(element => {
              if(element.nombre=='M'){
                element.descripcionGenero="Masculino";
              }else{
                element.descripcionGenero="Femenino";
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
     * @description Consulta el pais
     */
     pais=[];
    getPais(){
      this._generalService.getPais().subscribe(
          Response=>{
            this.pais=Response.data;
          },
          error=>{
            console.log(error.error.message);
          }
      ); 
    }

     /**
     * @author Bryan Zamora
     * @description Consulta la provincia segun el pais
     */
    provincia=[];
    getProvincia(){
      this._generalService.getProvincia(this.data.secuenciaPais).subscribe(
          Response=>{
            this.provincia=Response.data;
            this.getCiudad();
          },
          error=>{
            console.log(error.error.message);
          }
      ); 
    }

     /**
     * @author Bryan Zamora
     * @description Consulta las ciudades segun el pais y la provincia
     */
    ciudad=[];
    getCiudad(){
      this._generalService.getCiudad(this.data.secuenciaPais,this.data.secuenciaProvincia).subscribe(
          Response=>{
            this.ciudad=Response.data;
          },
          error=>{
            console.log(error.error.message);
          }
      ); 
    }
}
