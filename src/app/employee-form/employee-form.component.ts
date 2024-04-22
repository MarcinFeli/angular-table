import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EmployeeNetland, Position } from '../employee-netland.interface';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent implements OnChanges {
  @Input() isEdited: boolean = true;
  @Input() employeeToEdit: EmployeeNetland | null = null;

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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['employeeToEdit'] && this.employeeToEdit) {
      this.employee = { ...this.employeeToEdit }; // Kopiowanie danych pracownika do formularza
    }
  }

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
  onInputChange(event: any) {
    const pattern = /^[0-9]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9]/g, "");
      this.employee.age = event.target.value;
    }
  }

  onCancel() {
    this.cancelAdd.emit();
  }
}
