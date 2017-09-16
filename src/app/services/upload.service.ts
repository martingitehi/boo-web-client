import { Injectable } from "@angular/core";
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Upload } from "../interfaces/upload";
import * as firebase from 'firebase';
import { API } from "./api.service";

@Injectable()
export class UploadService {
    private basePath = '/uploads';
    private mongoImages:string[] = [];

    constructor(private ngFire: AngularFireModule,
        private db: AngularFireDatabase,
        private api: API) { }

    uploadFile(upload: Upload, userId: string) {
        const ref = firebase.storage().ref();
        const putUpload = ref
            .child(`${this.basePath}/${userId}/${upload.file.name}`)
            .put(upload.file);

        putUpload.on(firebase.storage.TaskEvent.STATE_CHANGED,
            //get a snapshot of the progress
            (snapshot) => {
                upload.progress = (putUpload.snapshot.bytesTransferred / putUpload.snapshot.totalBytes) * 100;
                console.log(upload.progress);
            },
            //log any errors
            (error) => {
                console.log(error);
            },
            //after successful upload, do something with the callback info
            (): any => {
                upload.url = putUpload.snapshot.downloadURL;
                upload.name = upload.file.name;
                this.uploadToFirebase(upload, userId);
                this.mongoImages.push(upload.url);
            }
        );
        putUpload.on(firebase.storage.TaskState.SUCCESS, (cb) => {
            this.uploadToDB(userId);
            console.log('upload complete notifier:' + cb);
        });
    }
    private uploadToFirebase(upload: Upload, userId: string) {
        this.db.list(`uploads/${userId}`).push(upload);
        console.log('To Firebase: ' + upload.url);       
    }

    private uploadToDB(userId:string){
        this.api.uploadImages(userId, this.mongoImages).subscribe(res => {
            console.log(res);
        });
    }
}