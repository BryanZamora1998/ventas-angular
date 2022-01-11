import { CommonModule } from '@angular/common';
import { Sweetalert2Component } from './sweetalert2/sweetalert2.component';
import { PaginadorComponent } from './paginador/paginador.component';
import { NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TablePaginationComponent } from './table-pagination/table-pagination.component';
import { UsuariosCAComponent } from './usuarios-ca/usuarios-ca.component';
import { FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: 
  [Sweetalert2Component,
    PaginadorComponent, 
    TablePaginationComponent, 
    UsuariosCAComponent
  ],
  imports: [
    CommonModule,
    NgbPaginationModule,    
    NgbModule,
    FormsModule,
    MatPaginatorModule,
    MatTableModule
  ],
  entryComponents:[
    Sweetalert2Component,
    PaginadorComponent,
    TablePaginationComponent,
    UsuariosCAComponent
  ],
  exports:[
    Sweetalert2Component,
    PaginadorComponent,
    TablePaginationComponent,
    UsuariosCAComponent
  ]
})
export class ShareModule { }
