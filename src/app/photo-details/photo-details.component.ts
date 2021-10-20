import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../Photo';
import { Comment } from '../Comment'
import { PhotoService } from '../photo.service';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit {

  photoId: string;
  photo: Photo;
  allComments: Comment[];
  newComment: string;

  constructor(private route: ActivatedRoute, private photoService: PhotoService, private albumService: AlbumService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.photoId = param.get('photoId');
      console.log('Got photoId: ', this.photoId);
      this.loadPhoto(this.photoId);
      this.loadComments(this.photoId);


    });
  }

  loadPhoto(photoId: string) {
    this.photoService.getPhoto(photoId).subscribe(
      photo => {
        this.photo = <Photo>photo;
        console.log("Loaded Photo details: ", this.photo.photoUrl);
      }
    )
  }

  loadComments(photoId: string) {
    this.photoService.getComments(photoId).subscribe(
      comments => {
        this.allComments = (<Comment[]>comments).reverse();
        console.log("Loaded comments: ", this.allComments)
      }
    )
  }

  makeProfilePhoto() {
    console.log("Photo Url : " + this.photo[0].photoUrl);
    this.photoService.makeProfilePhoto(this.photo[0].photoUrl).subscribe(
      response => {
        console.log("Profile Photo updated ", response);
      }
    )
  }

  makeCoverPhoto() {

    console.log("Album Url : " + this.photo[0].albumId); //
    this.albumService.makeAlbumCoverPhoto(this.photo[0].photoUrl, this.photo[0].albumId).subscribe(
      response => {
        console.log("Cover Photo updated", response);
      }
    )
  }

  saveComment() {
    this.photoService.saveComment(this.photoId, this.newComment)
      .subscribe(
        response => {
          console.log("Comment posted");
          this.loadComments(this.photoId);
          this.newComment = "";
        }
      );
  }

  toggleComments() {

    this.allComments.reverse();

  }

}
