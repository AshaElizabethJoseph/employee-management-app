import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent {

  employee: Employee = {
    id: 0,
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    position: ''
  }
  errorMessage: string = '';
  constructor(private employeeService: EmployeeService, private router: Router) { }

  onSubmit(): void {
    console.log(this.employee);
    this.employeeService.createEmployee(this.employee)
    // .subscribe((result:any) => console.log('employee added', result));    
    .subscribe({
      next: (response) => {
      console.log('employee added', response);
      this.router.navigate(['/employees'])
      },
      error: (error) => { 
        this.errorMessage =`Error: ${error.status} - ${error.message}`;
        console.error('There was an error!', error);
      }
    });
  }
}
