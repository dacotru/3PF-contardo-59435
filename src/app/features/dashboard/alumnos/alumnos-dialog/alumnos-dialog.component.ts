import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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

      const alumnoData = this.alumnoForm.value;
      
      if (this.isEditing) {
        this.alumnoService.updateAlumnoById(this.data!.editingUser!.id, alumnoData).subscribe({
          next: (result) => {
            this.isSaving = false;
            this.matDialogRef.close(result);
          },
          error: () => {
            this.isSaving = false;
            alert('Hubo un error al actualizar el alumno.');
          }
        });
      } else {
        this.alumnoService.addAlumno(alumnoData).subscribe({
          next: (result) => {
            this.isSaving = false;
            this.matDialogRef.close(result);
          },
          error: () => {
            this.isSaving = false;
            alert('Hubo un error al agregar el alumno.');
          }
        });
      }
    }
  }
}
