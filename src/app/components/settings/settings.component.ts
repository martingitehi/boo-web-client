import { Component, OnInit } from '@angular/core';
import { UserAccount } from "../../interfaces/account";
import { Upload } from "../../interfaces/upload";
import { UploadService } from "../../services/upload.service";
import { ActivatedRoute } from "@angular/router";
import { API } from "../../services/api.service";

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  titles: any[];
  files: FileList;
  upload: Upload;
  file: File;
  id: any;
  profile: UserAccount;
  constructor(private uploadService: UploadService, private api: API, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.api.getProfile(this.id).subscribe((user) => {
      this.profile = user;
    });
    this.titles = [
      'Profile',
      'Billing',
      'Authentication'
    ]
  }

  handleFiles(event) {
    this.files = event.target.files;
    // console.log(this.files);
  }

  update(profile: UserAccount) {
    // this.upload = new Upload(this.files[0]);
    // this.uploadService.uploadFile(this.upload, this.route.snapshot.params['id'], true);
    // this.api.uploadImages(this.id, this.upload.file, true).subscribe(res => {
    // console.log('To MongoDB: ' + res.message);
    // console.log(res.file);
    this.api.updateProfile(this.profile, this.id).subscribe(res => {
      console.log(res);
    });
  }

}
