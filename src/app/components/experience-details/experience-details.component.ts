import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

const ExperienceData: any[] = [
  { CompanyName: 'BE', Position: 'RTU', TotalYear: 9, LastCTC: 2022 }
];

@Component({
  selector: 'app-experience-details',
  templateUrl: './experience-details.component.html',
  styleUrls: ['./experience-details.component.scss']
})

export class ExperienceDetailsComponent {

  constructor(private fb: FormBuilder) { }
  @Input() experienceDetailsForm: FormGroup;

  get experiences(): FormArray {
    return this.experienceDetailsForm.get("experiences") as FormArray
  }

  displayedColumns: string[] = ['companyName', 'position', 'totalYear', 'lastCTC', 'action'];
  dataSource :any[] = [];

  newEXperience() {
    return this.fb.group({
      companyName: ['', Validators.required],
      position: ['', Validators.required],
      totalYear: ['', Validators.required],
      lastCTC: ['', Validators.required],
    })
  }


  addExperience() {
    this.experiences.push(this.newEXperience());
    this.dataSource = [...this.experiences.controls];
  }

  removeExperience(element: any) {
    const index = this.experiences.controls.findIndex(ele => ele === element)
    this.experiences.removeAt(index);
    this.dataSource = [...this.experiences.controls];
  }

}
