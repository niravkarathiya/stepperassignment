import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-preview-profile',
  templateUrl: './preview-profile.component.html',
  styleUrls: ['./preview-profile.component.scss']
})
export class PreviewProfileComponent {

  localImagePath = 'assets/profile-default.jpg';
  imagePath = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    if (data.img) {
      this.imagePath = data.img;
    } else {
      this.imagePath = this.localImagePath;
    }
  }

}
