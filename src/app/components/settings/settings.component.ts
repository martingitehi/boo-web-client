import { Component, OnInit } from '@angular/core';
import { UserAccount } from "../../interfaces/account";
import { Upload } from "../../interfaces/upload";
import { UploadService } from "../../services/upload.service";
import { ActivatedRoute, Router } from "@angular/router";
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
  response:string;

  constructor(private uploadService: UploadService, 
    private router:Router,
    private api: API, 
    private route: ActivatedRoute) { }

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
  }

  update(profile: UserAccount) {
    this.api.updateProfile(this.profile, this.id).subscribe(res => {
      this.response = res;
    });
  }

  deleteAccount(id:any){
    this.api.deleteAccount(id).then((res)=>{
      this.router.navigate(['/login']);
    })
  }

}
