import { Component, OnInit, Input } from '@angular/core';
import { API } from "../../services/api.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import { UserAccount } from "../../interfaces/account";
import { Upload } from "../../interfaces/upload";
import * as _ from 'lodash';
import { UploadService } from "../../services/upload.service";

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    profile: UserAccount = null;
    age: number = 0;
    showSearch: boolean = false;
    files: FileList;
    upload: Upload;
    userId:string;
    photos:any[] = [];
    constructor(private api: API,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location, 
    private uploadService:UploadService) { }

    ngOnInit(): void {
        // this.route.paramMap
        //     .switchMap((params: ParamMap) => this.api.getProfile(params.get('id')))
        //     .subscribe(user => this.profile = user);
        this.userId = this.route.snapshot.params['id'];
        this.api.getProfile(this.userId)
            .subscribe((user) => {
                this.profile = user;
                this.age = this.api.CalculateAge(this.profile.dob);
                this.photos = this.profile.photos;
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
            this.upload = new Upload(filesToUpload[idx]);
            this.uploadService.uploadFile(this.upload, this.userId);
        });
    }
}