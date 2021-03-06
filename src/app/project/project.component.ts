import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { ProjectService } from './project.service';
import { MemberService } from '../member/member.service';
import { Message } from '../shared/message/message';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  public projectList: Array<any> = [];
  public projectLoading: boolean = true;

  constructor(
    public router: Router,
    public snackBar: MatSnackBar,
    public memberService: MemberService,
    public projectService: ProjectService,
    public message: Message
  ) { }

  ngOnInit() {
    this.memberService.loginConfirm();
    this.getProjectList('createdAt', 12);
  }

  // get project list
  public getProjectList(field: string, limit: number): void {
    this.projectService.getProjectSortLimit(field, limit).onSnapshot((res) => {
      this.projectList = res.docs;
      this.projectLoading = false;
    });
  }

  // go upload page
  public goProjectUpload(): any {
    if (!this.memberService.user.logined) {
      // alert
      this.snackBar.open(this.message.requiredLogin, 'CLOSE', {duration: 3000});
      return false;
    } else if (!this.memberService.user.emailVerified) {
      // alert
      this.snackBar.open(this.message.NotemailVerified, 'CLOSE', {duration: 3000});
      return false;
    } else {
      this.router.navigate(['/project', 'upload']);
    }
  }

}
