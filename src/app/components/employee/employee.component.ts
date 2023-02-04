import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {

  employeeDetailsForm!: FormGroup;

  @ViewChild('stepper') stepper: MatStepper;


get personalDetails():FormGroup{
  return this.employeeDetailsForm.get('personalDetails') as FormGroup;
}
get bankDetails():FormGroup{
  return this.employeeDetailsForm.get('bankDetails') as FormGroup;
}
get educationalDetails():FormGroup{
  return this.employeeDetailsForm.get('educationalDetails') as FormGroup;
}
get experienceDetails():FormGroup{
  return this.employeeDetailsForm.get('experienceDetails') as FormGroup;
}
get currentOrgDetails():FormGroup{
  return this.employeeDetailsForm.get('currentOrgDetails') as FormGroup;
}

get proffesionalDetails():FormGroup{
  return this.employeeDetailsForm.get('proffesionalDetails') as FormGroup;
}

  constructor(private fb:FormBuilder){
    this.createForms();
  }


  createForms(){
    this.employeeDetailsForm = this.fb.group({

      //personal details
      personalDetails : this.getPersonalDetailForm(),

      //bank details
      bankDetails : this.getBankDetailForm(),

      //proffesional details
      proffesionalDetails: this.getProffesionalDetailForm(),

      //educational details
      educationalDetails : this.getEducationDetailForm(),

      //exeperience details
      experienceDetails : this.getExperienceDetailForm(),

      //currentOrganizationdetails
      currentOrgDetails : this.getCurrentOrgDetailForm()

    });
  }

  //Create Personal details form
  getPersonalDetailForm(){
    return this.fb.group({
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.email,Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/)]],
      dob: ['',Validators.required],
      profile : [''],
      presentAddress : ['', Validators.required],
      permanentAddress : ['', Validators.required],
    });
  }

  //Create Bank details form
  getBankDetailForm(){
    return this.fb.group({
      bankName:['', Validators.required],
      accountName:['', Validators.required],
      accountNubmer: ['', Validators.required],
      IFSC:['', Validators.required],
      adhar:['',Validators.required],
      PAN:['', Validators.required]
    });
  }

  //Create Proffesional details form
  getProffesionalDetailForm(){
    return this.fb.group({
      designation:['',Validators.required],
      department:['',Validators.required],
      year:['',Validators.required],
      month:['',Validators.required],
      currentLocation:['',Validators.required],
      skills:[[],Validators.required],
      resume:['',Validators.required]
    });
  }

  //Create Education details form
  getEducationDetailForm(){
    return this.fb.group({
      educations: this.fb.array([])
    });
  }

  //Create Experience details form
  getExperienceDetailForm(){
    return this.fb.group({
      experiences: this.fb.array([])
    });
  }

  //Create Current Organization details form
  getCurrentOrgDetailForm(){
    return this.fb.group({
      joiningDate: ['', Validators.required],
      nextAppraisalDate:['', Validators.required],
      currentCTC:['', Validators.required]
    });
  }

  goBack(stepper:MatStepper){
    stepper.previous();
  }

  goForward(stepper:MatStepper){
    stepper.next()
  }

  saveData(){
    console.log(this.employeeDetailsForm);
  }

}
