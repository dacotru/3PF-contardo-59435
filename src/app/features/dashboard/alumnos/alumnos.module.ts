import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnosRoutingModule } from './alumnos-routing.module';
import { AlumnosComponent } from './alumnos.component';
import { SharedModule } from '../../../shared/shared.module';
import { ControlErrorComponent } from './control-errors/control-errors.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AlumnosDialogComponent } from './alumnos-dialog/alumnos-dialog.component';
import { AlumnosDetailComponent } from './alumnos-detail/alumnos-detail.component';



@NgModule({
  declarations: [
    AlumnosComponent,
    ControlErrorComponent,
    AlumnosDialogComponent,
    AlumnosDetailComponent
  ],
  imports: [
    CommonModule,
    AlumnosRoutingModule,
    SharedModule,
    ReactiveFormsModule,

  ],
  exports: [
    AlumnosComponent
  ]
})
export class AlumnosModule { }
