import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [FormsModule],
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
  constructor(private employeeService: EmployeeService) { }

  onSubmit(): void {
    console.log(this.employee);

    this.employeeService.createEmployee(this.employee)
    .subscribe((result:any) => console.log('employee added', result));    
  }
}
