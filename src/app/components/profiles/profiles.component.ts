import { Component, OnInit, OnChanges } from '@angular/core';
import { API } from "../../services/api.service";
import { Router } from "@angular/router";
import { Location } from '@angular/common';
import * as _ from 'lodash';
import { Observable } from "rxjs/Observable";
import { UserAccount } from "../../interfaces/account";

@Component({
  selector: 'customer',
  templateUrl: './profiles.component.html'
})

export class ProfilesComponent implements OnInit, OnChanges {
  profiles: Observable<UserAccount[]>;
  filter: any = '';
  showSearch: boolean = true;
  constructor(private api: API,
    private location: Location,
    private router: Router) {
  }

  ngOnInit() {
    this.getProfiles();
  }

  ngOnChanges() {
    this.getProfiles();
  }

  viewProfile(profile: any) {
    this.router.navigate(['dashboard', profile._id]);
  }

  async getProfiles() {
    this.profiles = await this.api.getProfiles();
  }

  logout() {
    this.api.destroyUserCredentials();
    this.goBack();
  }

  goBack() {
    this.router.navigateByUrl('login');
  }

}

