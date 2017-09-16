import { Component, OnInit } from '@angular/core';
import { API } from "../../services/api.service";
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'dashnavbar',
  templateUrl: './dashnavbar.component.html',
  styleUrls: ['./dashnavbar.component.css']
})
export class DashnavbarComponent {
  filter: any = '';
  showSearch: boolean = true;
  notifications:number=8;
  id:any;
  constructor(private api: API, private router: Router, private route:ActivatedRoute,
    private location: Location) { 
      this.id = this.route.snapshot.params['id'];
      console.log(this.id);
  }

  logout() {
    this.api.destroyUserCredentials();
    this.router.navigate(['login']);
  }

}
