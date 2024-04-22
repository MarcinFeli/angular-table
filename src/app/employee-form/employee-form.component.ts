import { Component, Output, EventEmitter } from '@angular/core';
import { EmployeeNetland, Position } from '../employee-netland.interface';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent {
  positions = Object.values(Position);
  employee: EmployeeNetland = {
    name: '',
    age: null,
    isFullTime: false,
    position: null,
  };
  @Output() addEmployee = new EventEmitter<EmployeeNetland>();
  @Output() cancelAdd = new EventEmitter<void>();

  formError: string | null = null;
  formErrorVisible: boolean = false;

  onSubmit() {
    if (!this.employee.name || !this.employee.age || !this.employee.position) {
      this.formError = 'Name, age, and position are required.';
      this.formErrorVisible = true;
      setTimeout(() => {
        this.formErrorVisible = false;
      }, 2000);
      return;
    }
    this.addEmployee.emit(this.employee);
    this.employee = { name: '', age: null, isFullTime: false, position: null };
    this.formError = null;
  }

  onCancel() {
    this.cancelAdd.emit();
  }
}
