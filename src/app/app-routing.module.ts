import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumDetailsComponent } from './album-details/album-details.component';
import { CreateAlbumComponent } from './create-album/create-album.component';
import { LoginComponent } from './login/login.component';
import { MyAlbumsComponent } from './my-albums/my-albums.component';
import { PhotoDetailsComponent } from './photo-details/photo-details.component';
import { ProfileComponent } from './profile/profile.component';
import { UploadPictureComponent } from './upload-picture/upload-picture.component';
import { RecentAlbumsComponent } from './recent-albums/recent-albums.component';
import { UserService } from './user.service';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent, canActivate: [UserService] },
  { path: 'albums/recent', component: RecentAlbumsComponent, canActivate: [UserService] },
  { path: 'albums', component: MyAlbumsComponent, canActivate: [UserService] },
  { path: 'login', component: LoginComponent },
  { path: 'create', component: CreateAlbumComponent, canActivate: [UserService] },
  { path: 'album/:albumId', component: AlbumDetailsComponent, canActivate: [UserService] },
  { path: 'upload/:albumId', component: UploadPictureComponent, canActivate: [UserService] },
  { path: 'photo/:photoId', component: PhotoDetailsComponent, canActivate: [UserService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
