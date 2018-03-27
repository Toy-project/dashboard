import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { LayoutModule } from '../layout/layout.module';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';

@NgModule({
  imports: [
    CommonModule,
    AboutRoutingModule
  ],
  declarations: [
    AboutComponent
  ]
})
export class AboutModule { }
