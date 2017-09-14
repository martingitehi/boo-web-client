import { Component, OnInit, Input } from '@angular/core';
import { API } from "../../services/api.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import { UserAccount } from "../../interfaces/account";
import { Upload } from "../../interfaces/upload";
import * as _ from 'lodash';
@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    profile: UserAccount;
    age: number = 0;
    showSearch: boolean = false;
    files: FileList;
    upload: Upload;

    constructor(private api: API,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location) { }

    ngOnInit(): void {
        // this.route.paramMap
        //     .switchMap((params: ParamMap) => this.api.getProfile(params.get('id')))
        //     .subscribe(user => this.profile = user);
        this.api.getProfile(this.route.snapshot.params['id'])
            .subscribe((user) => {
                this.profile = user;
                this.age = Math.floor(((Date.now() - Date.parse(this.profile.dob)) / (1000 * 3600 * 24)) / 365);
            });
    }

    goBack() {
        this.router.navigateByUrl('login');
    }

    handleFiles(event){
        this.files = event.target.files;
    }

    uploadPhotos() {
        const filesToUpload = this.files;
        const filesIdx = _.range(filesToUpload.length);
        _.each(filesIdx, (idx) => {
            console.log(filesToUpload[idx]);
        });
    }
}