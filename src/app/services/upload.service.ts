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

    constructor(private ngFire: AngularFireModule,
        private db: AngularFireDatabase,
        private api: API) { }

    uploadFile(upload: Upload, userId: string, isAvatar: boolean): any {
        const ref = firebase.storage().ref();
        const fileUpload = ref
            .child(`${this.basePath}/${userId}/${upload.file.name}`)
            .put(upload.file);

        fileUpload.on(firebase.storage.TaskEvent.STATE_CHANGED,
            //get a snapshot of the progress
            (snapshot) => {
                upload.progress = (fileUpload.snapshot.bytesTransferred / fileUpload.snapshot.totalBytes) * 100;
            },
            //log any errors
            (error) => {
                console.error(error);
            },
            //after successful upload, do something with the callback info
            (): any => {
                upload.url = fileUpload.snapshot.downloadURL;
                upload.name = upload.file.name;
                this.uploadToFirebase(upload, userId);
                if (isAvatar) {
                    this.uploadAvatar(userId, upload.url);
                }
            }
        );
    }

    private uploadToFirebase(upload: Upload, userId: string) {
        this.db.list(`uploads/${userId}`).push(upload);
    }

    uploadAvatar(userId: string, upload: string): any {
        this.api.uploadAvatar(userId, upload).then(res => { return res });
    }

    getImage(key: string, userId: any) {
        return firebase.database()
            .ref(`uploads/${userId}` + key)
            .once('value')
            .then((snap) => snap.val());
    }
}