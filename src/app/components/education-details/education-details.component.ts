import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-education-details',
  templateUrl: './education-details.component.html',
  styleUrls: ['./education-details.component.scss']
})
export class EducationDetailsComponent {
  @Input() educationalDetailsForm!: FormGroup;

  @Input() set educationDetails(value: any) {
    if (value) {
      value.map((item: any) => {
        this.educations.push(this.newEducation(item));
        this.educations.disable();
      });
      this.dataSource = [...this.educations.controls];
    }
  }

  displayedColumns: string[] = ['educationName', 'universityName', 'result', 'yearOfPassing', 'action'];
  dataSource: any[] = [];
  educationData: any = [];
  addNewEducation = true;

  get educations(): FormArray {
    return this.educationalDetailsForm.get("educations") as FormArray
  }

  constructor(private fb: FormBuilder) {
  }

  newEducation(data?: any) {
    return this.fb.group({
      id: [data?.id || Math.floor(1000 + Math.random() * 9000)],
      educationName: [data?.educationName || '', Validators.required],
      universityName: [data?.universityName || '', Validators.required],
      result: [data?.result || '', Validators.required],
      yearOfPassing: [data?.yearOfPassing || '', Validators.required]
    })
  }

  addEducation() {
    this.addNewEducation = false;
    this.educations.push(this.newEducation());
    this.dataSource = [...this.educations.controls];
  }

  removeEducation(element: any) {
    const index = this.educations.controls.findIndex(ele => ele === element);
    this.educations.removeAt(index);
    this.dataSource = [...this.educations.controls];
    this.addNewEducation = true;
  }

  saveEducation(element: FormGroup) {
    if (element.status === 'INVALID') {
      element.markAllAsTouched();
      return;
    }
    this.addNewEducation = true;

    const index = this.educationData.findIndex((obj: any) => obj.id === element.value.id)
    if (index > -1) {
      this.educationData[index] = element.value;
    } else {
      this.educationData.push(element.value);
    }
    element.disable();
  }

  editEducation(element: FormGroup) {

    element.enable();
  }

  resetForm(element: FormGroup) {
    const index = this.educations.controls.findIndex(ele => ele === element);
    this.educations.controls[index].reset();
  }

}
