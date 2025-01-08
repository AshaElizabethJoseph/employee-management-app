import { Component,OnInit  } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../employee.service';  
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'employee-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.css'
})
export class EmployeeTableComponent {

  employees: Employee[] = [];
  constructor(private employeeService: EmployeeService,
     private router: Router ) { }
  ngOnInit()
  {
    this.employeeService
     .getEmoloyees()
     .subscribe((data: Employee[]) => {
      this.employees = data;
      console.log(this.employees);
    });
  }

  deleteEmployee(id: number): void {
    this.employeeService
      .deleteEmployee(id)
      .subscribe({
        next: (response) => {
          console.log('Employee deleted');
          this.employees = this.employees.filter(employee => employee.id !== id);
        },
        error: (error) => {
          console.error('There was an error!', error);
        }
       });
 }

 editEmployee(id: number): void {
    this.router.navigate([`edit/${id}`]);
  } 


}
