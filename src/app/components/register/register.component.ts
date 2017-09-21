import { Component, OnInit } from '@angular/core';
import { API } from "../../services/api.service";
import { UserAccount } from '../../interfaces/account'
import { Http, Response } from "@angular/http";
import { Route, Router } from '@angular/router';
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  profile: UserAccount;
  errorInfo:string='';
  _file:File;
  
  ngOnInit() {
    this.profile = {
      username: '',
      password: '',
      about: '',
      fullname: '',
      avatar_url: '',
      dob: new Date().setFullYear(1980, 1, 1).toString(),
      career: '',
      promo_code: String(Math.floor(Math.random() * (9999999 - 1000000) + 1000000)),
      nationality: 'Kenyan',
      physique: {
        weight: 0,
        height: 0,
        complexion: 'black'
      },
      gender: '',
      location: '',
      contact: {
        mobile: '',
        email: ''
      },
      interests: {
        sex: '',
        others: []
      },
      relationships: {
        status: 'Single',
        goal: '',
        family: {
          has_kids: false,
          no_of_kids: 0
        }
      },
      lifestyle: {
        smokes: false,
        drinks: false
      },
      health: {
        hiv_status: {
          status: '',
          last_tested: new Date().setFullYear(2017, 1, 1).toString()
        },
        disability: {
          disability_type: 'None',
          is_disabled: false
        }
      },
      social: {
        fb: '',
        instagram: ''
      },
      photos: []
    }
  }

  constructor(private api: API, private route: Router) {}

  register(profile: any) {
    this.api.register(profile).then((info) => {
      this.route.navigate(['/login']);
    }).catch(err => this.errorInfo = err.message);
  }
}
