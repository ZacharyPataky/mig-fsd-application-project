import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EmployeeList } from 'src/app/models/employee-list.model';
import { Employee } from 'src/app/models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl: string = 'http://localhost:8000/api/employees/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe
  ) { }

  ///////////////////////////////////////////////////////////////////////////////
  // API Calls

  /**
   *  Gets all employees
   *
   * @returns An observable that emits an array of all employees in the database
   */
  getAllEmployees(): Observable<EmployeeList> {
    return this.http.get<EmployeeList>(this.baseUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
 * Get a single employee by ID
 *
 * @param id A number used to reference an employee from the database
 * @returns An Observable that emits the retrieved Employee object.
 */
  getEmployee(id: number): Observable<Employee> {
    const url = `${this.baseUrl}${id}/`;

    return this.http.get<Employee>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Adds a new employee
   *
   * @param employee An Employee object that is passed to the back-end via the Request Body
   * @returns An Observable that emits the newly created Employee object.
   */
  addEmployee(employee: Employee): Observable<Employee> {
    const url = `${this.baseUrl}create/`;
    employee.date_of_joining = this.convertDate(employee.date_of_joining);

    return this.http.post<Employee>(url, employee, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Update a single employee by ID
   *
   * @param id A number used to reference an employee from the database
   * @param employee The updated employee information; includes all Employee fields
   * @returns An Observable that emits the updated Employee object.
   */
  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    const url = `${this.baseUrl}update/${id}/`;
    employee.date_of_joining = this.convertDate(employee.date_of_joining);

    return this.http.put<Employee>(url, employee, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Deletes an existing employee by ID
   *
   * @param id A number used to reference an employee from the database
   * @returns An Observable that emits the HTTP response from the server
   */
  deleteEmployee(id: number): Observable<{}> {
    const url = `${this.baseUrl}delete/${id}/`;

    return this.http.delete(url, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  ///////////////////////////////////////////////////////////////////////////////
  // Helper Methods

  /**
   * Handles an error response from an HTTP request
   *
   * @param error The error response from the HTTP request
   * @returns An Observable with an empty result
   */
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  /**
   * The normal Material Datepickers sends time in a long format
   * This doesn't match our desired YYYY-MM-DD format with Django
   * This converts the datepicker's value to YYYY-MM-DD
   */
  convertDate(joinDate: any): any {
    const formattedDate = this.datePipe.transform(joinDate, 'yyyy-MM-dd');
    console.warn(formattedDate);
    return formattedDate;
  }

}
