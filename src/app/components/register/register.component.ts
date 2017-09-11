import { Component, OnInit } from '@angular/core';
import { API } from "../../services/api.service";
import { UserAccount } from '../../interfaces/account'
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  profile: UserAccount;

  ngOnInit() {
   
  }

  constructor(private api:API) {

  }

  register(profile: any) {
    console.log(profile);
    this.api.register(profile).then((info) => {
      console.log(info);
    })
  }

}
