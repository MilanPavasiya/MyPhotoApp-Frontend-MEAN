import { HttpClient, HttpParams } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Album } from './Album';
import { FileService } from './file.service';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private http: HttpClient, private fileService: FileService, private router: Router) { }

  saveAlbum(albumId: string, fileId: string) {

    var album: Album = {
      id: "",
      albumId: albumId,
      coverPhotoUrl: environment.apiBaseUrl + "file/show/" + fileId,
      createdBy: "User",
      dateCreated: "string",
    };
    var headers = this.getHeaders();
    return this.http.post(environment.apiBaseUrl + "album", album, { headers })
      .subscribe(
        albumData => {
          var album: Album = <Album>(albumData);
          var albumId = album.albumId;
          console.log("albumId", album)
          this.router.navigate(['albums']);
        }
      )
  }

  getAllAlbums() {
    var headers = this.getHeaders();
    return this.http.get(environment.apiBaseUrl + "album", { headers });
  }

  getAllPhotos(albumId: string) {
    var headers = this.getHeaders();
    return this.http.get(environment.apiBaseUrl + "album/" + albumId + "/photos", { headers });
  }

  getHeaders() {
    var headers = {
      'idToken': localStorage.getItem('userIdToken')
    }
    return headers;
  }

  makeAlbumCoverPhoto(coverPhotoUrl: string, albumId: string) {
    var headers = this.getHeaders();
    var params = new HttpParams().set('coverPhotoUrl', coverPhotoUrl);
    console.log(coverPhotoUrl);
    return this.http.put(environment.apiBaseUrl + "album/" + albumId + "/coverPhoto", params, { headers });
  }
}
