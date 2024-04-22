import { Component } from '@angular/core';
import { EmployeeNetland, Position } from './employee-netland.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  employees: EmployeeNetland[] = [];
  editedEmployeeIndex: number | null = null;

  addEmployee(employee: EmployeeNetland) {
    this.employees.push(employee);
  }

  editEmployee(employee: EmployeeNetland) {
    this.editedEmployeeIndex = this.employees.indexOf(employee);
  }

  deleteEmployee(index: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employees.splice(index, 1);
    }
  }
  showAddForm: boolean = false;

  cancleAdd() {
    this.showAddForm = false;
  }

  onAddNewEmployee() {
    this.showAddForm = true;
  }
}
