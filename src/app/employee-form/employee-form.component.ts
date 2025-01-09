import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../employee.service';
import { Router,ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  employee: Employee = {
    id: 0,
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    position: ''
  }

  isEditing: boolean = false;
  errorMessage: string = '';
  constructor(private employeeService: EmployeeService, 
    private router: Router,
    private route: ActivatedRoute) { }

    ngOnInit(): void {
      
      this.route.paramMap.subscribe((result)=>{
      const id = result.get('id');
      
      if(id)
        {
         //editing existing employee
         this.isEditing = true;

         //console.log('editing employee with id:', id);
        
         this.employeeService.getEmployeeById(Number(id)).subscribe(
          {
            next: (result) => this.employee = result,
            error: (error) => {
              this.errorMessage =`Error: ${error.status} - ${error.message}`
              console.error('There was an error!',  this.errorMessage );
            }
           
          })
          console.log("errorMessage", this.errorMessage);
        }
      });
       
      
    }

  onSubmit(): void {
    console.log(this.employee);

    if(this.isEditing)
    {
      this.employeeService.editEmployee(this.employee)
      .subscribe({
        next: (response) => {
        console.log('employee updated', response);
        this.router.navigate(['/employees'])
        },
        error: (error) => { 
          this.errorMessage =`Error occured during edit: ${error.status} - ${error.message}`;
          console.error('There was an error!', error);
        }
      });
      return;
    }
    else
    {
      //Create new employee
      this.employeeService.createEmployee(this.employee)
    // .subscribe((result:any) => console.log('employee added', result));    
    .subscribe({
      next: (response) => {
      console.log('employee added', response);
      this.router.navigate(['/employees'])
      },
      error: (error) => { 
        this.errorMessage =`Error Ocuured during create operation: ${error.status} - ${error.message}`;
        console.error('There was an error!', error);
      }
    });
    }
  }
}
