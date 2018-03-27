import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { LayoutHeaderComponent } from './layout-header/layout-header.component';
import { LayoutNavComponent } from './layout-nav/layout-nav.component';
import { LayoutFooterComponent } from './layout-footer/layout-footer.component';
import { LoadingComponent } from '../shared/loading/loading.component';
import { ProjectListComponent } from '../project/project-list/project-list.component';
import { ProjectNoneComponent } from '../project/project-none/project-none.component';
import { AccessComponent } from '../shared/access/access.component';

import { MemberLoginComponent } from '../member/member-login/member-login.component';
import { MemberSignupComponent } from '../member/member-signup/member-signup.component';
import { MemberPasswordComponent } from '../member/member-password/member-password.component';
import { MemberLevelComponent } from '../member/member-level/member-level.component';
import { ContactDetailComponent } from '../contact/contact-detail/contact-detail.component';
import { ContactReplyComponent } from '../contact/contact-reply/contact-reply.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    LayoutHeaderComponent,
    LayoutNavComponent,
    LayoutFooterComponent,
    LoadingComponent,
    ProjectListComponent,
    ProjectNoneComponent,
    AccessComponent
  ],
  entryComponents: [
    MemberLoginComponent,
    MemberSignupComponent,
    MemberPasswordComponent,
    MemberLevelComponent,
    ContactDetailComponent,
    ContactReplyComponent
  ],
  declarations: [
    LayoutHeaderComponent,
    LayoutNavComponent,
    LayoutFooterComponent,
    LoadingComponent,
    ProjectListComponent,
    ProjectNoneComponent,
    AccessComponent,
    MemberLoginComponent,
    MemberSignupComponent,
    MemberPasswordComponent,
    MemberLevelComponent,
    ContactDetailComponent,
    ContactReplyComponent,
    LayoutHeaderComponent,
    LayoutFooterComponent,
    LayoutNavComponent
  ]
})
export class LayoutModule { }
