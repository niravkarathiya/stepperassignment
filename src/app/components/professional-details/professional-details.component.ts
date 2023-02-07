import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CvProfilePreviewComponent } from '../cv-profile-preview/cv-profile-preview.component';

@Component({
  selector: 'app-professional-details',
  templateUrl: './professional-details.component.html',
  styleUrls: ['./professional-details.component.scss']
})
export class ProfessionalDetailsComponent implements OnInit {
  @Input() proffesionalDetailsForm!: FormGroup;
  fileName = '';
  cvPath = '';

  years = ['0 year', '1 year', '2 year', '3 year', '4 year', '5 year', '6 year', '7 year']
  months = ['0 Months', '1 Months', '2 Months', '3 Months', '4 Months', '5 Months', '6 Months', '7 Months', '8 Months', '9 Months', '10 Months', '11 Months', '12 Months'];
  skillsList = ['Angular', 'Android', 'React', 'NodeJS'];

  constructor(private dialog: MatDialog) { }
  ngOnInit() {
    this.fileName = this.proffesionalDetailsForm.controls['resume']?.value.fileName;
    this.cvPath = this.proffesionalDetailsForm.controls['resume']?.value.path;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
      if (reader.result) {
        this.proffesionalDetailsForm.patchValue({
          resume: {
            'path': reader.result?.toString(),
            'fileName': file.name
          }
        })
        this.cvPath = reader.result?.toString()
      }
    });
    if (file) {
      this.fileName = file.name;
    }
  }

  removeResume() {
    this.proffesionalDetailsForm.patchValue({
      resume: ''
    })
    this.fileName = '';
  }

  viewResume() {
    this.dialog.open(CvProfilePreviewComponent, {
      data: {
        file: this.cvPath
      }
    });
  }
}
