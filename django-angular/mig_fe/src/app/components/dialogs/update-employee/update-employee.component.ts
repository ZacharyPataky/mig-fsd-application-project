import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee-service/employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss']
})
export class UpdateEmployeeComponent {

  // Form Data
  updateEmployeeForm: FormGroup = this.fb.group({
    employee_name: [this.data.employee_name, Validators.required],
    date_of_joining: [this.data.date_of_joining, Validators.required],
    sex: [this.data.sex, Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private dialogRef: MatDialogRef<UpdateEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Employee
  ) { }

  updateEmployeeDialog(): void {
    this.employeeService.updateEmployee(this.data.id, this.updateEmployeeForm.value)
      .subscribe(
        next => {
          this.dialogRef.close();
        }
      );
  }

}
