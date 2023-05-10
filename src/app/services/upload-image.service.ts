import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';
import firebase from 'firebase/compat';
import { finalize, from, map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  private basePath = '/images';
  file: File | undefined;
  url = '';


  constructor(private storage: Storage, private fs: AngularFirestore, private afStorage: AngularFireStorage) { }

  handleFiles(event: any) {
    this.file = event.target.files[0];
  }


  //method to upload file at firebase storage

  async uploadFile() {
    if (this.file) {
      const filePath = `${this.basePath}/${this.file.name}`;    //path at which image will be stored in the firebase storage
      const snap = await this.afStorage.upload(filePath, this.file);    //upload task
      this.getUrl(snap);
    } else { alert('Please select an image'); }
  }




  //method to retrieve download url
  private async getUrl(snap: firebase.storage.UploadTaskSnapshot) {
    const url = await snap.ref.getDownloadURL();
    this.url = url;  //store the URL
    console.log(this.url);
  }






  /*uploadImage(image: File, path: string): Observable<string> {
    const storageRef = ref(this.storage, path);
    const uploadTask = from(uploadBytes(storageRef, image));
    return uploadTask.pipe(switchMap((result) => getDownloadURL(result.ref)));
  }*/




}
