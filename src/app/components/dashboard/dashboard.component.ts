import { Component, OnInit, OnChanges } from '@angular/core';
import { API } from "../../services/api.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { Location } from '@angular/common';
import { UserAccount } from "../../interfaces/account";
import { Upload } from "../../interfaces/upload";
import * as _ from 'lodash';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import { UploadService } from "../../services/upload.service";
import { GalleryImage } from "../../interfaces/gallery-image";

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnChanges {
    profile: any;
    age: number = 0;
    showSearch: boolean = false;
    files: FileList;
    upload: Upload;
    userId: string;
    photos: Observable<GalleryImage[]>;

    constructor(private api: API,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        private uploadService: UploadService) { }

    ngOnInit(): void {
        // this.route.paramMap
        //     .switchMap((params: ParamMap) => this.api.getProfile(params.get('id')))
        //     .subscribe(user => this.profile = user);
        this.userId = this.route.snapshot.params['id'];
        this.api.getProfile(this.userId)
            .subscribe((user) => {
                this.profile = user;
                this.age = this.api.CalculateAge(this.profile.dob);
                this.photos = this.api.getImages(this.userId);
            });
    }

    ngOnChanges() {
        this.photos = this.api.getImages(this.userId);
    }

    goBack() {
        this.router.navigateByUrl('login');
    }

    handleFiles(event) {
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