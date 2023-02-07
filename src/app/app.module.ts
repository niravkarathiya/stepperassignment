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
import { EmployeelistComponent } from './components/employeelist/employeelist.component';
import { PreviewProfileComponent } from './components/preview-profile/preview-profile.component';
import { CvProfilePreviewComponent } from './components/cv-profile-preview/cv-profile-preview.component';
import { MaterialModule } from './shared/material-module/material-module.module';



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
    PreviewProfileComponent,
    CvProfilePreviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
