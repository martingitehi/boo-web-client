import { Injectable } from "@angular/core";
import { Upload } from "../interfaces/upload";
import * as firebase from 'firebase';

@Injectable()
export class UploadService {
    private basePath = '/uploads';

    constructor() { }

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
                this.saveFile(upload);
            }
        );
    }
    private saveFile(upload: Upload) {
        console.log(upload);
    }
}