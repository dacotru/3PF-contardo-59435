import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatSidenavModule } from '@angular/material/sidenav'; 
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { AlumnosModule } from './alumnos/alumnos.module';
import { SharedModule } from '../../shared/shared.module';
import { CursosModule } from './cursos/cursos.module'; 
import { HomeModule } from './home/home.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    ToolbarComponent,
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    AlumnosModule,
    SharedModule,
    CursosModule,
    HomeModule,
    RouterModule,
    DashboardRoutingModule,
  ],
  exports: [
    ToolbarComponent,
    SidebarComponent,
  ]
})
export class DashboardModule { }
