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
  @Input() set experiencesDetails(value: any) {
    if (value) {
      value.map((item: any) => {
        this.experiences.push(this.newExperience(item));
        this.experiences.disable();
      });
      this.dataSource = [...this.experiences.controls];
    }
  }

  displayedColumns: string[] = ['companyName', 'position', 'totalYear', 'lastCTC', 'action'];
  dataSource: any[] = [];
  experiencesData: any = [];
  addNewExperience = true;

  get experiences(): FormArray {
    return this.experienceDetailsForm.get("experiences") as FormArray
  }

  newExperience(data?: any) {
    return this.fb.group({
      id: [data?.id || Math.floor(1000 + Math.random() * 9000)],
      companyName: [data?.companyName || '', Validators.required],
      position: [data?.position || '', Validators.required],
      totalYear: [data?.totalYear || '', Validators.required],
      lastCTC: [data?.lastCTC || '', Validators.required]
    })
  }

  addExperience() {
    this.addNewExperience = false;
    this.experiences.push(this.newExperience());
    this.dataSource = [...this.experiences.controls];
  }

  removeExperience(element: any) {
    const index = this.experiences.controls.findIndex(ele => ele === element);
    this.experiences.removeAt(index);
    this.dataSource = [...this.experiences.controls];
    this.addNewExperience = true;
  }

  saveExperience(element: FormGroup) {
    if (element.status === 'INVALID') {
      element.markAllAsTouched();
      return;
    }
    this.addNewExperience = true;

    const index = this.experiencesData.findIndex((obj: any) => obj.id === element.value.id)
    if (index > -1) {
      this.experiencesData[index] = element.value;
    } else {
      this.experiencesData.push(element.value);
    }
    element.disable();
  }

  editExperience(element: FormGroup) {
    element.enable();
  }

  resetForm(element: FormGroup) {
    const index = this.experiences.controls.findIndex(ele => ele === element);
    this.experiences.controls[index].reset();
  }

}
