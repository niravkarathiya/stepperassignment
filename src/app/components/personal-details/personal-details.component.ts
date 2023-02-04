import { Component, Input, OnInit } from '@angular/core';
import { FormGroup} from '@angular/forms';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit{
  @Input() personalDetailsForm!: FormGroup;

  constructor(){}

  ngOnInit(): void {
    console.log(this.personalDetailsForm)
  }

  copyAddress(){
    this.personalDetailsForm.patchValue({
      permanentAddress : this.personalDetailsForm.controls['presentAddress']?.value
    })
  }

}
