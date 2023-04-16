import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee-service/employee.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpdateEmployeeComponent } from '../dialogs/update-employee/update-employee.component';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss']
})
export class EmployeeTableComponent implements OnInit {

  // MatTable Data
  displayedColumns: string[] = [
    'id',
    'employee_name',
    'date_of_joining',
    'sex',
    'actions'
  ];
  dataSource = new MatTableDataSource();

  // Form Data
  newEmployeeForm: FormGroup = this.fb.group({
    employee_name: ['', Validators.required],
    date_of_joining: ['', Validators.required],
    sex: ['', Validators.required]
  })

  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  ///////////////////////////////////////////////////////////////////////////////
  // Employee CRUD

  /**
   * Gets all of the employees and adds them to the <mat-table>
   */
  getEmployees(): void {
    this.employeeService.getAllEmployees()
      .subscribe(
        next => {
          this.dataSource.data = next.employees;
        },
        error => {
          console.log(error);
          this.openSnackbar('Failed to retrieve all employees');
        }
      );
  }

  /**
   * Adds a new employee to the database
   * Does so by sending the completed [newEmployeeForm] to the BE via API
   * We then refresh the table by calling [getEmployees()]
   */
  addEmployee(): void {
    const newEmployee: Employee = this.newEmployeeForm.value;
    this.employeeService.addEmployee(newEmployee)
      .subscribe(
        next => {
          this.getEmployees();
          this.resetNewEmployeeForm()
          this.openSnackbar('Added the new employee');
        },
        error => {
          console.log(error);
          this.openSnackbar('Failed to add the employee');
        }
      );
  }

  /**
   * Updates an employee
   * Opens a dialog window, passing along the target employee's data
   * We input the new information and close the dialog box
   * We then refresh the table by calling [getEmployees()]
   */
  updateEmployee(employee: Employee): void {
    const dialogRef = this.dialog.open(UpdateEmployeeComponent, {
      width: '500px',
      data: employee
    });

    dialogRef.afterClosed()
      .subscribe(
        next => {
          this.getEmployees();
          this.openSnackbar('Updated the employee');
        },
        error => {
          console.log(error);
          this.openSnackbar('Failed to update the employee');
        }
      );
  }

  /**
   * Deletes an employee from the database
   * Does so by sending the employee's ID to the BE via API
   * We then refresh the table by calling [getEmployees()]
   */
  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id)
      .subscribe(
        next => {
          this.getEmployees();
          this.openSnackbar('Deleted the employee with ID: ' + id);
        },
        error => {
          console.log(error);
          this.openSnackbar('Failed to delete the employee with ID: ' + id);
        }
      );
  }

  ///////////////////////////////////////////////////////////////////////////////
  // Helper Methods

  /**
   * Resets the [newEmployeeForm] form so users can add another employee
   * Marks the input elements as clean so there are no warnings
   */
  resetNewEmployeeForm(): void {
    this.newEmployeeForm.reset();
  }

  openSnackbar(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 5000
    });
  }

}
