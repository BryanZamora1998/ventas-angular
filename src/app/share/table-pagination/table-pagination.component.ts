import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-table-pagination',
  styleUrls: ['table-pagination.component.css'],
  templateUrl: 'table-pagination.component.html',
})
export class TablePaginationComponent implements AfterViewInit {
  @Input()displayedColumns:any;
  @Input()numeroDatos:any;
  @Input()elementData:any;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: any;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>(this.elementData);
  }
}
