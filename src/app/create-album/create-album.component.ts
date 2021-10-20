import { Component, ElementRef, OnInit, Renderer2, VERSION, ViewChild } from '@angular/core';
import { AlbumService } from '../album.service';
import { FileService } from '../file.service';

@Component({
  selector: 'app-create-album',
  templateUrl: './create-album.component.html',
  styleUrls: ['./create-album.component.css']
})
export class CreateAlbumComponent implements OnInit {

  albumName: string;

  constructor(private fileService: FileService, private albumService: AlbumService) { }

  ngOnInit(): void {
  }

  createAlbum(event: any) {

    var file = event.files[0];

    console.log("File: ", file.name);

    this.fileService.uploadFile(file).subscribe(
      fileResponse => {

        // var fileId = fileResponse["fileId"];
        // console.log("File data from service: ", fileResponse["fileId"]);
        // this.saveAlbum(fileId);

        var fileId = file.name;
        console.log("File data from service: ", fileResponse["fileId"]);
        this.saveAlbum(fileId);
      }
    )
  }

  saveAlbum(fileId: string) {
    this.albumService.saveAlbum(this.albumName, fileId);
  }


}

