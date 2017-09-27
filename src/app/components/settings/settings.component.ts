import { Component, OnInit } from '@angular/core';
import { UserAccount } from "../../interfaces/account";
import { Upload } from "../../interfaces/upload";
import { UploadService } from "../../services/upload.service";
import { ActivatedRoute, Router } from "@angular/router";
import { API } from "../../services/api.service";
import { DashboardComponent } from "../dashboard/dashboard.component";

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers: [DashboardComponent]
})
export class SettingsComponent implements OnInit {
  titles: any[];
  files: FileList;
  upload: Upload;
  file: File;
  id: any;
  profile: UserAccount;
  response: string;
  errors:any[];
  imageUrl: string;

  constructor(private uploadService: UploadService,
    private router: Router,
    private api: API,
    private route: ActivatedRoute, private dash: DashboardComponent) { }

  ngOnInit() {
    this.id = JSON.parse(localStorage.getItem('user')).id;
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
    console.log(this.files);
  }

  update(profile: UserAccount) {
    this.api.updateProfile(this.profile, this.id).subscribe(res => {
      this.response = res;
    });
  }

  removeAccount(id: any) {
    this.api.deleteAccount(id).then((res) => {
      if (res.success) {
        this.api.destroyUserCredentials();
        this.router.navigate(['/login']);
      }
      else {
        this.response = res.message;
      }

    })
  }

  uploadAvatar() {
    const _files = this.files;
    const file: File = _files[0];
    this.dash.checkFileValidity(_files, this.errors).then((res) => {
      console.log(res);
      if (res == true) {
        this.upload = new Upload(file);
        this.uploadService.uploadFile(this.upload, this.id, true);
      }
    });
  }

}
