import { Component } from '@angular/core';
import { Router } from '@angular/router';


const EmployeeData: any[] = [
  {CompanyName:'BE', Position: 'RTU', TotalYear: 9, LastCTC: 2022}
]; 

@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.scss']
})
export class EmployeelistComponent {

  constructor(private route:Router){}

  displayedColumns: string[] = ['CompanyName', 'Position', 'TotalYear', 'LastCTC', 'Action'];
  dataSource = EmployeeData;

  addEmployee(){
    this.route.navigate(['/add-employee']);
  }

}
