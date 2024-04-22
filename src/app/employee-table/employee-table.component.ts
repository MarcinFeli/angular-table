import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EmployeeNetland } from '../employee-netland.interface';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss']
})
export class EmployeeTableComponent {
  @Input() employees: EmployeeNetland[] = [];
  @Output() editEmployee = new EventEmitter<EmployeeNetland>();
  @Output() deleteEmployee = new EventEmitter<number>();
  @Output() addNewEmployee = new EventEmitter<void>();
  
  showAddForm: boolean = false;
  isHoveredIndex: number | null = null;
  selectedEmployee: EmployeeNetland | null = null;


  onEdit(employee: EmployeeNetland) {
    this.selectedEmployee = employee;
    this.showAddForm = true;
  }

  onDelete(index: number) {
    this.deleteEmployee.emit(index);
  }

  addEmployee(employee: EmployeeNetland) {
    if (this.selectedEmployee) {
      const index = this.employees.indexOf(this.selectedEmployee);
      if (index !== -1) {
        this.employees[index] = employee;
      }
      this.selectedEmployee = null;
    } else {
      this.employees.push(employee);
    }
    this.showAddForm = false;
  }

  onAddNewEmployee() {
    this.showAddForm = true;
    this.selectedEmployee = null;
  }

  onCancelAdd() {
    this.showAddForm = false;
    this.selectedEmployee = null;
  }

  onRowHover(index: number) {
    this.isHoveredIndex = index;
  }

  onRowLeave() {
    this.isHoveredIndex = null;
  }
}
