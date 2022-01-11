import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Sweetalert2Component } from 'src/app/share/sweetalert2/sweetalert2.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import { ModulosService } from 'src/app/service/modulos.service';
declare let $: any;

@Component({
  selector: 'app-modulos-design',
  templateUrl: './modulos.component.html',
  styleUrls: ['./modulos.component.css'],
  providers:[ModulosService]
})
export class ModulosComponent implements OnInit {
  
  public mostrarTabla:boolean=false;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _modulosService:ModulosService,
              private sweetalert2Component:Sweetalert2Component) { }
  
  ngOnInit(): void {
    this.consularModulosPorUsuario();
    $(document).ready(function(){
      $('.card').hover(
        function () {
          $(this).css({"border": "1px solid blue","color":"blue"});
         $(".card-body .card-title").addClass("card-title-hover");
       }, 

       function () {
        $(this).css({"border":"1px solid #dfdfdf","color":"#dfdfdf"});
        $(".card-body .card-title").removeClass("card-title-hover");
       }
      );
    });
  }

    /**
   * @author Bryan Zamora
   * @description Consulta los modulos disponibles del usuario
   */
  data:any;
  consularModulosPorUsuario(){
    this._modulosService.getConsultarModulosPorUsuario().subscribe(
      Response=>{
          this.data=Response['data'];
      },
      Error=>{
        console.log(Error);
        this.sweetalert2Component.showModalError(Error.error.message);
      }
    );
  }
}
