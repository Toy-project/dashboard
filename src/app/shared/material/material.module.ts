import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatRadioModule,
  MatSlideToggleModule,
  MatCheckboxModule,
  MatSelectModule,
  MatMenuModule,
  MatListModule,
  MatSidenavModule
} from '@angular/material';

import 'hammerjs';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatSelectModule,
    MatMenuModule,
    MatListModule,
    MatSidenavModule
  ],
  declarations: []
})
export class MaterialModule { }
