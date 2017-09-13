import { Component, OnInit } from '@angular/core';
import { API } from "../../services/api.service";
import { Router } from "@angular/router";
import { Location } from '@angular/common';

@Component({
  selector: 'customer',
  templateUrl: './profiles.component.html'
})

export class ProfilesComponent implements OnInit {
  profiles: any[];
  filter: any = '';
  showSearch: boolean = true;
  constructor(private api: API,
    private location: Location,
    private router: Router) {
    this.profiles = [];
  }

  ngOnInit() {
    this.getProfiles();
  }

  viewProfile(profile: any) {
    this.router.navigate(['dashboard', profile._id]);
  }

  getProfiles() {
    this.api.getProfiles().subscribe((res: any[]) => {
      this.profiles = res;
    }, (error: Error) => console.error(error));
  }

  logout() {
    this.api.destroyUserCredentials();
    this.goBack();
  }

  goBack() {
    this.router.navigateByUrl('login');
  }

}

