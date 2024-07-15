import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submittedForms: any[] = [];
  editingIndex: number | null = null;

  @ViewChild('loginform') loginform!: NgForm;

  ngOnInit() {
    const storedForms = localStorage.getItem('submittedForms');
    if (storedForms) {
      this.submittedForms = JSON.parse(storedForms);
    }
  }

  onSubmit(form: NgForm): void {
    const formValue = form.value;
    if (this.editingIndex !== null) {
      this.submittedForms[this.editingIndex] = formValue;
      this.editingIndex = null;
      alert('Form updated successfully!');
    } else {
      this.submittedForms.push(formValue);
      alert('Form submitted successfully!');
    }
    localStorage.setItem('submittedForms', JSON.stringify(this.submittedForms));
    form.resetForm();
  }

  onDelete(index: number): void {
    this.submittedForms.splice(index, 1);
    localStorage.setItem('submittedForms', JSON.stringify(this.submittedForms));
    alert('Form deleted successfully!');
  }

  onEdit(index: number): void {
    this.editingIndex = index;
    const formValue = this.submittedForms[index];
    this.loginform.setValue(formValue);
  }
}
