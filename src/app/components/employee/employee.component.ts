import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarServicesService } from 'src/app/services/snack-bar-services.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {


  employeeDetailsForm!: FormGroup;


  @ViewChild('stepper') stepper: MatStepper;
  allEmployee = [];
  employee: any = [];
  employeeId: number;


  get personalDetails(): FormGroup {
    return this.employeeDetailsForm.get('personalDetails') as FormGroup;
  }
  get bankDetails(): FormGroup {
    return this.employeeDetailsForm.get('bankDetails') as FormGroup;
  }
  get educationalDetails(): FormGroup {
    return this.employeeDetailsForm.get('educationalDetails') as FormGroup;
  }
  get experienceDetails(): FormGroup {
    return this.employeeDetailsForm.get('experienceDetails') as FormGroup;
  }
  get currentOrgDetails(): FormGroup {
    return this.employeeDetailsForm.get('currentOrgDetails') as FormGroup;
  }

  get proffesionalDetails(): FormGroup {
    return this.employeeDetailsForm.get('proffesionalDetails') as FormGroup;
  }

  constructor(private fb: FormBuilder, private route: Router, private activatedRoute: ActivatedRoute, private snabarService: SnackBarServicesService) {
    this.employeeId = Number(this.activatedRoute.snapshot.queryParamMap.get('id'));
    this.getEmployeeData();
    this.createForms();
    if (this.employeeId > 0) {
      this.populateForms();
    }

  }


  createForms() {
    this.employeeDetailsForm = this.fb.group({

      //personal details
      personalDetails: this.getPersonalDetailForm(),

      //bank details
      bankDetails: this.getBankDetailForm(),

      //proffesional details
      proffesionalDetails: this.getProffesionalDetailForm(),

      //educational details
      educationalDetails: this.getEducationDetailForm(),

      //exeperience details
      experienceDetails: this.getExperienceDetailForm(),

      //currentOrganizationdetails
      currentOrgDetails: this.getCurrentOrgDetailForm()

    });
  }

  getEmployeeData() {
    this.allEmployee = JSON.parse(localStorage.getItem('employee') || '[]');
    this.employee = this.allEmployee.find((emp: any) => emp.id === this.employeeId) || [];
  }

  //Create Personal details form
  getPersonalDetailForm() {
    return this.fb.group({
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/)]],
      dob: ['', Validators.required],
      profile: [''],
      presentAddress: ['', Validators.required],
      permanentAddress: ['', Validators.required],
      isSameAddress: [false],
    });
  }

  //Create Bank details form
  getBankDetailForm() {
    return this.fb.group({
      bankName: ['', Validators.required],
      accountName: ['', Validators.required],
      accountNubmer: ['', [Validators.required, Validators.pattern(/^[0-9]{9,18}$/)]],
      IFSC: ['', [Validators.required, Validators.pattern(/^[A-Z]{4}0[A-Z0-9]{6}$/)]],
      adhar: ['', [Validators.required, Validators.pattern(/^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/)]],
      PAN: ['', [Validators.required, Validators.pattern(/[A-Z]{5}[0-9]{4}[A-Z]{1}/)]]
    });
  }

  //Create Proffesional details form
  getProffesionalDetailForm() {
    return this.fb.group({
      designation: ['', Validators.required],
      department: ['', Validators.required],
      year: ['', Validators.required],
      month: ['', Validators.required],
      currentLocation: ['', Validators.required],
      skills: [[''], Validators.required],
      resume: ['', Validators.required]
    });
  }

  //Create Education details form
  getEducationDetailForm() {
    return this.fb.group({
      educations: this.fb.array([], Validators.minLength(1))
    });
  }

  //Create Experience details form
  getExperienceDetailForm() {
    return this.fb.group({
      experiences: this.fb.array([])
    });
  }

  //Create Current Organization details form
  getCurrentOrgDetailForm() {
    return this.fb.group({
      joiningDate: ['', Validators.required],
      nextAppraisalDate: ['', Validators.required],
      currentCTC: ['', Validators.required]
    });
  }

  //stepper back 
  goBack(stepper: MatStepper) {
    stepper.previous();
  }

  //stepper next
  goForward(stepper: MatStepper) {
    console.log(this.educationalDetails.controls['educations'])
    switch (stepper.selectedIndex) {
      case 0:
        if (this.personalDetails.invalid) {
          this.personalDetails.markAllAsTouched();
          return;
        }
        break;
      case 1:
        if (this.bankDetails.invalid) {
          this.bankDetails.markAllAsTouched();
          return;
        }
        break;
      case 2:
        if (this.proffesionalDetails.invalid) {
          this.proffesionalDetails.markAllAsTouched();
          return;
        }
        break;
      case 3:
        if (this.educationalDetails.value.educations.length < 1) {
          this.snabarService.openSnackBar('Plese add at least one education');
          return;
        } else {
          this.educationalDetails.markAllAsTouched();
          if (this.educationalDetails.invalid) {
            return;
          }
        }
        break;
      case 4:
        if (this.experienceDetails.value.experiences.length < 1) {
          this.snabarService.openSnackBar('Plese add at least one experience');
          return;
        } else {
          this.experienceDetails.markAllAsTouched();
          if (this.experienceDetails.invalid) {
            return;
          }
        }
        break;
    }
    stepper.next();

  }

  saveData() {
    if (this.currentOrgDetails.invalid) {
      this.currentOrgDetails.markAllAsTouched();
      return;
    }
    let employeeData = JSON.parse(localStorage.getItem('employee') || '[]');
    const index = employeeData.findIndex((emp: any) => emp.id === this.employeeId);
    const employee = {
      'id': Math.floor(1000 + Math.random() * 9000),
      'bankDetails': this.employeeDetailsForm.controls['bankDetails'].value,
      'currentOrgDetails': this.employeeDetailsForm.controls['currentOrgDetails'].value,
      'educationalDetails': this.employeeDetailsForm.controls['educationalDetails'].value.educations,
      'experienceDetails': this.employeeDetailsForm.controls['experienceDetails'].value.experiences,
      'personalDetails': this.employeeDetailsForm.controls['personalDetails'].value,
      'proffesionalDetails': this.employeeDetailsForm.controls['proffesionalDetails'].value,
    }
    if (index > -1) {
      employeeData[index] = employee;
      this.snabarService.openSnackBar('Employee Updated Successfully !');

    } else {
      employeeData.push(employee);
      this.snabarService.openSnackBar('Employee Added Successfully !');
    }
    localStorage.setItem('employee', JSON.stringify(employeeData));
    this.route.navigate(['/']);
  }

  populateForms() {
    this.populatePersonalDetailsForm();
    this.populateBankDetailsForm();
    this.populateProffesionalDetailsForm();
    this.populateCurrentOrgDetailsForm();
  }

  populatePersonalDetailsForm() {
    this.personalDetails.patchValue({
      firstName: this.employee.personalDetails.firstName,
      lastName: this.employee.personalDetails.lastName,
      middleName: this.employee.personalDetails.middleName,
      email: this.employee.personalDetails.email,
      phone: this.employee.personalDetails.phone,
      dob: this.employee.personalDetails.dob,
      profile: this.employee.personalDetails.profile,
      presentAddress: this.employee.personalDetails.presentAddress,
      permanentAddress: this.employee.personalDetails.permanentAddress,
      isSameAddress: this.employee.personalDetails.isSameAddress
    });
  }

  populateBankDetailsForm() {
    this.bankDetails.patchValue({
      IFSC: this.employee.bankDetails.IFSC,
      PAN: this.employee.bankDetails.PAN,
      accountName: this.employee.bankDetails.accountName,
      accountNubmer: this.employee.bankDetails.accountNubmer,
      adhar: this.employee.bankDetails.adhar,
      bankName: this.employee.bankDetails.bankName,
    });
  }

  populateProffesionalDetailsForm() {
    this.proffesionalDetails.patchValue({
      currentLocation: this.employee.proffesionalDetails.currentLocation,
      department: this.employee.proffesionalDetails.department,
      designation: this.employee.proffesionalDetails.designation,
      month: this.employee.proffesionalDetails.month,
      skills: this.employee.proffesionalDetails.skills,
      year: this.employee.proffesionalDetails.year,
      resume: this.employee.proffesionalDetails.resume
    });
  }

  populateCurrentOrgDetailsForm() {
    this.currentOrgDetails.patchValue({
      currentCTC: this.employee.currentOrgDetails.currentCTC,
      joiningDate: new Date(this.employee.currentOrgDetails.joiningDate),
      nextAppraisalDate: new Date(this.employee.currentOrgDetails.nextAppraisalDate),
    });
  }

  backToList() {
    this.route.navigate(['/']);
  }
}
