import { Component, OnInit, Input } from '@angular/core';
import { API } from "../../services/api.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    profile: any;
    showSearch:boolean=false;
    constructor(private api: API,
        private route: ActivatedRoute,
        private location: Location,
        private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        // this.route.paramMap
        //     .switchMap((params: ParamMap) => this.api.getProfile(params.get('id')))
        //     .subscribe(user => this.profile = user);
        this.api.getProfile(this.route.snapshot.params['id'])
            .subscribe((user) => this.profile = user);
    }

    goBack(): void {
        this.location.go('/');
    }
}