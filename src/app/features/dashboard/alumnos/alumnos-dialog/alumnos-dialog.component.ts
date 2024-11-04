import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { generateRandomString } from '../../../../shared/utils';
import { Alumno } from '../models';
import { AlumnoService } from '../../../../core/services/alumnos.service';

interface UserDialogData {
  editingUser?: Alumno;
}

@Component({
  selector: 'app-alumnos-dialog',
  templateUrl: './alumnos-dialog.component.html',
  styles: ``,
})
export class AlumnosDialogComponent {
  alumnoForm: FormGroup;
  isSaving = false;

  constructor(
    private matDialogRef: MatDialogRef<AlumnosDialogComponent>,
    private formBuilder: FormBuilder,
    private alumnoService: AlumnoService,
    @Inject(MAT_DIALOG_DATA) public data?: UserDialogData
  ) {
    this.alumnoForm = this.formBuilder.group({
      firstName: [null, [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z]*$/)]],
      lastName: [null, [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z]*$/)]],
      email: [null, [Validators.required, Validators.email]],
    });
    this.patchFormValue();
  }

  private get isEditing() {
    return !!this.data?.editingUser;
  }

  patchFormValue() {
    if (this.data?.editingUser) {
      this.alumnoForm.patchValue(this.data.editingUser);
    }
  }

  onSave(): void {
    if (this.isSaving) return;

    if (this.alumnoForm.invalid) {
      this.alumnoForm.markAllAsTouched();
    } else {
      this.isSaving = true;

      const newAlumno: Alumno = {
        ...this.alumnoForm.value,
        id: this.isEditing ? this.data!.editingUser!.id : generateRandomString(4),
        createdAt: this.isEditing ? this.data!.editingUser!.createdAt : new Date(),
      };

      this.alumnoService.addAlumno(newAlumno).subscribe((result) => {
        this.isSaving = false;

        if (result) {
          this.matDialogRef.close(result);
        } else {
          alert('El alumno ya existe.');
        }
      });
    }
  }
}

