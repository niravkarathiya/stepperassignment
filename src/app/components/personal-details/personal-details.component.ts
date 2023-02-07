import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {
  @Input() personalDetailsForm!: FormGroup;
  fileName = '';
  today = new Date();
  profilePath: string;
  copyAddresses = false;
  localImagePath = 'assets/profile-default.jpg';
  constructor() { }

  ngOnInit() {
    this.profilePath = this.personalDetailsForm.controls['profile']?.value.path || this.localImagePath;
    this.fileName = this.personalDetailsForm.controls['profile']?.value.fileName;
    this.checkIfAddressIsSame();
  }

  // copy present address to permanent address
  copyAddress() {
    this.copyAddresses = !this.copyAddresses;
    this.personalDetailsForm.patchValue({
      permanentAddress: this.personalDetailsForm.controls['presentAddress']?.value
    });
  }

  // set image on select 
  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
      if (reader.result) {
        this.personalDetailsForm.patchValue({
          profile: {
            'path': reader.result?.toString(),
            'fileName': file.name
          }
        })
      }
      this.profilePath = (reader.result)?.toString() || this.localImagePath;
    });
    if (file) {
      this.fileName = file.name;
    }
  }

  //remove profile
  removeProfile() {
    this.personalDetailsForm.patchValue({
      profile: ''
    })
    this.fileName = '';
    this.profilePath = this.localImagePath;
  }

  // set flage based on record (edit)
  checkIfAddressIsSame() {
    if (this.personalDetailsForm.controls['isSameAddress']?.value === true) {
      this.copyAddresses = true;
    }
  }

  //on keypress copy present address to permant address
  copyPresentToPermanent() {
    if (this.copyAddresses) {
      this.personalDetailsForm.patchValue({
        permanentAddress: this.personalDetailsForm.controls['presentAddress']?.value
      });
    } else {
      return;
    }
  }

}
