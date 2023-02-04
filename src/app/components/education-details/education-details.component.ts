import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-education-details',
  templateUrl: './education-details.component.html',
  styleUrls: ['./education-details.component.scss']
})
export class EducationDetailsComponent {

  constructor(private fb : FormBuilder){}
  
  @Input() educationalDetailsForm!: FormGroup;

  displayedColumns: string[] = ['educationName','universityName', 'result','yearOfPassing','action'];
  dataSource :any[] = [];


  get educations() : FormArray {
    return this.educationalDetailsForm.get("educations") as FormArray
  }

  newEducation(){
    return this.fb.group({
      educationName: ['', Validators.required],
      universityName: ['', Validators.required],
      result:['', Validators.required],
      yearOfPassing:['', Validators.required]
    })
  }

  addEducation() {
    this.educations.push(this.newEducation());
    this.dataSource = [...this.educations.controls];
    console.log(this.educationalDetailsForm.value)
 }

 removeEducation(element:any){
  const index = this.educations.controls.findIndex(ele=>ele === element)
  this.educations.removeAt(index);
  this.dataSource = [...this.educations.controls];
 }
  

}
