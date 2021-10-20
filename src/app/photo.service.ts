import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Comment } from './Comment';
import { Photo } from './Photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient, private router: Router) { }

  savePhoto(albumId: string, fileId: string) {

    var photo: Photo = {
      id: "",
      albumId: albumId,
      photoUrl: environment.apiBaseUrl + "file/show/" + fileId,
      createdBy: "User",
      dateCreated: "string",
    };
    var headers = this.getHeaders();
    return this.http.post(environment.apiBaseUrl + "photo", photo, { headers })
      .subscribe(
        photoData => {
          var photo: Photo = <Photo>(photoData);
          // var photoId = photo.id;
          // console.log("photo", photo)
          this.router.navigate(['album/', albumId]);
        }
      )
  }

  makeProfilePhoto(photoUrl: string) {
    var headers = this.getHeaders();
    var params = new HttpParams().set('profilePhotoUrl', photoUrl);
    console.log(photoUrl);
    return this.http.put(environment.apiBaseUrl + "user/me/profilePhoto", params, { headers });
  }

  getAllPhotos() {
    var headers = this.getHeaders();
    return this.http.get(environment.apiBaseUrl + "photo", { headers });
  }

  getHeaders() {
    var headers = {
      'idToken': localStorage.getItem('userIdToken')
    }
    return headers;
  }

  getPhoto(photoId: string) {
    var headers = this.getHeaders();
    return this.http.get(environment.apiBaseUrl + "photo/" + photoId, { headers });
  }

  getComments(photoId: string) {
    var headers = this.getHeaders();
    return this.http.get(environment.apiBaseUrl + "photo/" + photoId + "/comments", { headers });
  }

  saveComment(photoId: string, newComment: string) {
    var comment: Comment = {
      id: "",
      photoId: photoId,
      message: newComment,
      createdBy: "string",
      dateCreated: "string",
    };

    var headers = this.getHeaders();
    return this.http.post(environment.apiBaseUrl + "photo/comments", comment, { headers })
  }


}
