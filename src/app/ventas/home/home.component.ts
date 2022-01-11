import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
declare let $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public data:any;
  public activeLang =JSON.parse(localStorage.getItem("languaje"));
  constructor( private translate: TranslateService) { }

  ngOnInit(): void {
    this.data=JSON.parse(localStorage.getItem('data'));
    if(this.data.photo!=null)
      this.data.photo="data:image/png;base64,"+this.data.photo;
    else
      this.data.photo="../../../assets/img/user_icon-icons.com_57997.svg";
  }
}
