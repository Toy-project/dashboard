import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Message } from '../../shared/message/message';

@Component({
  selector: 'app-member-password-confirm',
  templateUrl: './member-password-confirm.component.html',
  styleUrls: ['./member-password-confirm.component.scss']
})
export class MemberPasswordConfirmComponent implements OnInit {

  public confirmForm: FormGroup;
  public password: AbstractControl;

  constructor(
    public fb: FormBuilder,
    public message: Message,
    public dialogRef: MatDialogRef<MemberPasswordConfirmComponent>
  ) {
    this.createConfirmPasswordForm();
  }

  ngOnInit() {
  }

  // create confirm form
  public createConfirmPasswordForm() {
    this.confirmForm = this.fb.group({
      password: ['', Validators.compose([Validators.required])]
    });
    this.password = this.confirmForm.controls['password'];
  }

  // dialog close event
  public onClose(password: string = null): void {
    this.dialogRef.close(password);
  }

  // confirmForm submit event
  public onSubmit(value): any {
    // if not valid
    if (this.confirmForm.invalid) {
      return false;  
    }

    // close
    this.onClose(value.password);
  }

}
