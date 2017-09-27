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
  profiles: UserAccount[] = [];
  profile:any;
  filter = '';
  showSearch: boolean = true;
  constructor(private api: API,
    private location: Location,
    private router: Router) {
  }

  ngOnInit() {
    this.profile = JSON.parse(localStorage.getItem('user'));
    this.getProfiles();
  }

  ngOnChanges() {
    this.getProfiles();
  }

  getAge(profile: UserAccount): number {
    return this.api.CalculateAge(profile.dob);
  }

  viewProfile(profile: any) {
    this.router.navigate(['dashboard', profile._id]);
  }

  getProfiles() {
    this.api.getProfiles().subscribe(res => this.profiles = res);
  }

  logout() {
    this.api.destroyUserCredentials();
    this.goBack();
  }

  goBack() {
    this.router.navigate(['/login']);
  }

}

