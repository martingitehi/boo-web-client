import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { UploadService } from "../../services/upload.service";

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.css']
})
export class ImageViewComponent implements OnInit {
  private imageUrl:string;
  private userId:any;
  constructor(private route:ActivatedRoute, private uploadService:UploadService) { }

  ngOnInit() {
    this.userId = '';
    this.getImageUrl(this.route.snapshot.params['id'], this.userId);
  }

  
  getImageUrl(key:string, userId:any){
    this.uploadService.getImage(key, userId).then(res=> this.imageUrl = res);
}

}
