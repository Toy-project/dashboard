import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';

import { MemberService } from './member.service';
import { Message } from '../shared/message/message';

import { MemberLevelComponent } from './member-level/member-level.component';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {

  private loadingFixed: boolean = true;
  private memberList: Array<any> = [];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private memberService: MemberService,
    private message: Message
  ) { }

  ngOnInit() {
    this.memberService.loginConfirm();
    this.getMemberList(20);
  }

  // get all member
  private getMemberList(limit: number): void {
    if (this.memberService.user.logined) {
      this.memberService.getDatabaseUserList(limit).onSnapshot((res) => {
        this.memberList = res.docs;
      });
    } else {
      // todo
    }
  }

  // change level event
  private changeLevel(key: string): void {
    if (!this.memberService.user.emailVerified) {
      // alert
      this.snackBar.open(this.message.requiredLogin, 'CLOSE', {duration: 3000});
    } else {
      // open dialog
      let dialogRef = this.dialog.open(MemberLevelComponent, {
        minWidth: 300,
        maxWidth: 500,
        disableClose: true,
        data: {key: key}
      });
    }
  }

}
