import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SnackBarServicesService } from 'src/app/services/snack-bar-services.service';
import { CvProfilePreviewComponent } from '../cv-profile-preview/cv-profile-preview.component';
import { PreviewProfileComponent } from '../preview-profile/preview-profile.component';

@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.scss']
})
export class EmployeelistComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  allEmployee: any[] = [];
  employeeData = [];
  localImagePath = 'assets/profile-default.jpg';
  dataSource: MatTableDataSource<any>;



  constructor(private route: Router, public dialog: MatDialog, private snabarService: SnackBarServicesService) {
    this.getEmployeeData();
    this.dataSource = new MatTableDataSource(this.allEmployee);
  }

  displayedColumns: string[] = ['profile', 'name', 'department', 'designation', 'email', 'phone', 'resume', 'action'];

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //fetch employee data from localstorage
  getEmployeeData() {
    this.allEmployee = JSON.parse(localStorage.getItem('employee') || '[]');
  }

  //redirect to add-employee page
  addEmployee() {
    this.route.navigate(['/add-employee']);
  }

  // redirect to add-employee page with id
  edit(id: number) {
    this.route.navigate(
      ['/add-employee'],
      { queryParams: { id: id } }
    );
  }

  // remove employee
  remove(id: number) {
    const index = this.allEmployee.findIndex((emp: any) => emp.id === id);
    if (index > -1) {
      this.allEmployee.splice(index, 1);
      localStorage.setItem('employee', JSON.stringify(this.allEmployee));
      this.getEmployeeData();
      this.snabarService.openSnackBar('Employee Added Successfully !');
    }
  }

  //open profile preview page
  profilePreview(img: string) {
    this.dialog.open(PreviewProfileComponent, {
      data: {
        img: img
      }
    });
  }

  //open resume preview page
  resumePreview(file: string) {
    this.dialog.open(CvProfilePreviewComponent, {
      data: {
        file: file
      }
    });
  }

}
