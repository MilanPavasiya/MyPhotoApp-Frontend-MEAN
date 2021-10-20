import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from '../album.service';
import { FileService } from '../file.service';
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-upload-picture',
  templateUrl: './upload-picture.component.html',
  styleUrls: ['./upload-picture.component.css']
})
export class UploadPictureComponent implements OnInit {

  albumId: string;
  photoName: string;

  constructor(private route: ActivatedRoute, private fileService: FileService, private photoService: PhotoService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.albumId = param.get('albumId');
      console.log('Got albumId: ', this.albumId);
    })
  }

  uploadPhoto(event: any) {

    var file = event.files[0];

    console.log("File: ", file.name);

    this.fileService.uploadFile(file).subscribe(
      fileResponse => {

        // var fileId = fileResponse["fileId"];
        // console.log("File data from service: ", fileResponse["fileId"]);
        // this.saveAlbum(fileId);

        var fileId = file.name;
        console.log("File data from service: ", fileResponse["fileId"]);
        this.savePhoto(fileId);
      }
    )
  }

  savePhoto(fileId: string) {
    this.photoService.savePhoto(this.albumId, fileId);
  }

}
