import { Component, OnInit, OnChanges } from '@angular/core';
import { API } from "../../services/api.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { Location } from '@angular/common';
import { UserAccount } from "../../interfaces/account";
import { Upload } from "../../interfaces/upload";
import { Observable } from 'rxjs/Observable';
import { UploadService } from "../../services/upload.service";
import { GalleryImage } from "../../interfaces/gallery-image";
import { FirebaseListObservable } from "angularfire2/database";
import * as _ from 'lodash';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnChanges {
    profile: UserAccount;
    age: number = 0;
    showSearch: boolean = false;
    files: FileList;
    file: File;
    upload: Upload;
    userId: string;
    photos: FirebaseListObservable<GalleryImage[]>;
    valid: boolean = false;
    info: any[];
    uploading: boolean = false;
    imageUrl:string;

    constructor(private api: API,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        private uploadService: UploadService) { }

    ngOnInit(): void {
        this.info = [];
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
        this.router.navigate(['/login']);
    }

    handleFiles(event) {
        this.files = event.target.files;
        const idx = _.range(this.files.length);
        this.checkFileValidity(this.files);
    }

    uploadAvatar() {
        const files = this.files;
        const file: File = files[0];
        this.checkFileValidity(files).then((res) => {
            console.log(res);
            if (res == true) {
                this.upload = new Upload(file);
                this.uploadService.uploadFile(this.upload, this.userId, true);
            }
        });
    }
    
    viewImage(url:string){
        this.imageUrl = url;
    }

    checkFileValidity(files: FileList): Promise<boolean> {
        const len = _.range(files.length);
        return new Promise(resolve => {
            _.each(files, (f) => {
                if (!(f.type === "image/jpeg" || f.type === "image/png") && (f.size / 1024 / 1024) > 4) {
                    this.info.push[`${f.name} is not valid: ${f.type} and ${f.size / 1024 / 1024} MB.`];
                }
            });
            if (this.info.length > 0) {
                this.valid = false;
                resolve(false);
            }
            else {
                this.valid = true;
                resolve(true);
            }
        });
    }

    uploadPhotos(isAvatar: boolean) {
        const filesToUpload = this.files;
        const filesIdx = _.range(filesToUpload.length);
        _.each(filesIdx, (idx) => {
            this.checkFileValidity(filesToUpload).then((res) => {
                if (res == true) {
                    this.upload = new Upload(filesToUpload[idx]);
                    this.uploadService.uploadFile(this.upload, this.userId, isAvatar);
                    this.info = [];
                    this.info.push['All files are valid for upload.'];
                }
            });
        });
    }
}