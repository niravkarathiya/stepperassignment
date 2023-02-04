import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeComponent } from './components/employee/employee.component';
import { PersonalDetailsComponent } from './components/personal-details/personal-details.component';
import { BankDetailsComponent } from './components/bank-details/bank-details.component';
import { ProfessionalDetailsComponent } from './components/professional-details/professional-details.component';
import { EducationDetailsComponent } from './components/education-details/education-details.component';
import { ExperienceDetailsComponent } from './components/experience-details/experience-details.component';
import { CurrentOrganizationDetailsComponent } from './components/current-organization-details/current-organization-details.component';
import {MatStepperModule} from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { EmployeelistComponent } from './components/employeelist/employeelist.component';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    PersonalDetailsComponent,
    BankDetailsComponent,
    ProfessionalDetailsComponent,
    EducationDetailsComponent,
    ExperienceDetailsComponent,
    CurrentOrganizationDetailsComponent,
    EmployeelistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }