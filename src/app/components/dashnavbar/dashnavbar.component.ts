import { Component, OnInit } from '@angular/core';
import { API } from "../../services/api.service";
import { Location } from '@angular/common';
import { Router } from "@angular/router";

@Component({
  selector: 'dashnavbar',
  templateUrl: './dashnavbar.component.html',
  styleUrls: ['./dashnavbar.component.css']
})
export class DashnavbarComponent implements OnInit {
  filter: any = '';
  showSearch: boolean = true;
  constructor(private api: API, private router: Router, private location: Location) { }

  ngOnInit() {
  }

  logout() {
    this.api.destroyUserCredentials();
    this.router.navigateByUrl('login');
  }

}
