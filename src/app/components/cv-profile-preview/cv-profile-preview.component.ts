import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cv-profile-preview',
  templateUrl: './cv-profile-preview.component.html',
  styleUrls: ['./cv-profile-preview.component.scss']
})
export class CvProfilePreviewComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

}
