import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MemberService } from '../../member/member.service';
import { ProjectService } from '../project.service';
import { Message } from '../../shared/message/message';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent implements OnInit {

  public access: boolean;
  public accessFailedMessage: string;

  public createLoading: boolean = false;
  public createForm: FormGroup;
  public title: AbstractControl;
  public subTitle: AbstractControl;
  public thumbnail: AbstractControl;
  public explain: AbstractControl;
  public startDate: AbstractControl;
  public endDate: AbstractControl;
  public url: AbstractControl;
  public color: AbstractControl;
  public type: AbstractControl;
  public git: AbstractControl;
  public language: AbstractControl;
  public status: AbstractControl;
  public photo: AbstractControl;
  public email: AbstractControl;
  public thumbnailFile: any;
  public thumbnailFileSize: number = 1 * 1024 * 1024;
  public photoFile: Array<any> = [];
  public photoFileSize: number = 2 * 1024 * 1024;

  constructor(
    public router: Router,
    public snackBar: MatSnackBar,
    public fb: FormBuilder,
    public memberService: MemberService,
    public projectService: ProjectService,
    public message: Message
  ) {
    this.createPorjectForm();
  }

  ngOnInit() {
    this.memberService.loginConfirm();
    this.access = this.memberService.user.logined ? this.memberService.user.emailVerified ? true : false : false;
    this.accessFailedMessage = this.memberService.user.logined ? this.memberService.user.emailVerified ? '' : this.message.NotemailVerified : this.message.requiredLogin;
  }

  // create project form
  public createPorjectForm(): void {
    this.createForm = this.fb.group({
      title: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      subTitle: ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
      thumbnail: ['', Validators.compose([])],
      explain: ['', Validators.compose([Validators.required, Validators.maxLength(2000)])],
      startDate: ['', Validators.compose([Validators.required])],
      endDate: ['', Validators.compose([Validators.required])],
      type: ['', Validators.compose([Validators.required])],
      git: ['', Validators.compose([Validators.required, Validators.pattern(/^(https?|ftps?|sftp):\/\/([a-z0-9-]+\.)+[a-z0-9]{2,4}.*$/)])],
      language: ['', Validators.compose([Validators.required])],
      status: ['', Validators.compose([Validators.required])],
      url: ['', Validators.compose([Validators.pattern(/^(https?|ftps?|sftp):\/\/([a-z0-9-]+\.)+[a-z0-9]{2,4}.*$/)])],
      color: ['', Validators.compose([])],
      photo: [[], Validators.compose([])],
      email: [this.memberService.user.email, Validators.compose([])],
      view: [0, Validators.compose([])],
      like: [0, Validators.compose([])],
      share: [0, Validators.compose([])],
      createdAt: ['', Validators.compose([])],
      lastUpdatedAt: ['', Validators.compose([])],
    });
    this.title = this.createForm.controls['title'];
    this.subTitle = this.createForm.controls['subTitle'];
    this.thumbnail = this.createForm.controls['thumbnail'];
    this.explain = this.createForm.controls['explain'];
    this.startDate = this.createForm.controls['startDate'];
    this.endDate = this.createForm.controls['endDate'];
    this.type = this.createForm.controls['type'];
    this.git = this.createForm.controls['git'];
    this.language = this.createForm.controls['language'];
    this.status = this.createForm.controls['status'];
    this.url = this.createForm.controls['url'];
    this.color = this.createForm.controls['color'];
    this.photo = this.createForm.controls['photo'];
  }

  // image thumbnail preview event
  public onChangeThumbnailFile(img, fileData): void {
    // type
    const type = fileData.files.length ? fileData.files[0].type.split('/')[1] : null;
    const size = fileData.files ? fileData.files[0].size : Infinity;
    // validator
    if (type === 'png' || type === 'gif' || type === 'jpg' || type === 'jpeg' || fileData.files[0].size <= this.thumbnailFileSize) {
      this.thumbnailFile = fileData.files[0];
      const fileReader = new FileReader();

      // file reader load event
      fileReader.addEventListener('load', () => {
        img.src = fileReader.result;
      }, false);

      if (this.thumbnailFile) {
        fileReader.readAsDataURL(this.thumbnailFile);
      }
    } else if (fileData.files.length) {
      // failed validator
      this.snackBar.open(this.message.validatorFile, 'CLOSE', {duration: 3000});
    } else {
      // todo
    }
  }

  // image photo event
  public onChangePhotoFile(fileData): void {
    if ((fileData.files.length + this.photoFile.length) > 5) {
      // failed validator
      this.snackBar.open(this.message.validatorFileLength, 'CLOSE', {duration: 3000});
    } else {
      for (let i = 0; i < fileData.files.length; i++) {
        // type
        const type = fileData.files[i].type.split('/')[1];
        // validator
        if (type === 'png' || type === 'gif' || type === 'jpg' || type === 'jpeg' || fileData.files[i].size <= this.photoFileSize) {
          this.photoFile.push(fileData.files[i]);
        } else {
          // failed validator
          this.snackBar.open(this.message.validatorFile, 'CLOSE', {duration: 3000});
        }
      }
    }
  }

  // delete upload photo event
  public onDeletePhotoFile(file): void {
    this.photoFile.splice(this.photoFile.indexOf(file), 1);
  }

  // create project event
  public createProject(value): void {
    // create date
    const createDate = new Date().getTime();
    // loading start
    this.createLoading = true;
    // validator
    if (this.createForm.valid && this.thumbnail) {
      // value set
      value.startDate = value.startDate.getTime();
      value.endDate = value.endDate.getTime();
      value.createdAt = createDate;
      value.lastUpdatedAt = createDate;
      // upload thumbnail
      this.projectService.uploadFile(createDate, 'thumbnail', this.thumbnailFile)
      .then((thumbnailSrc) => {
        // success upload thumbnail
        value.thumbnail = thumbnailSrc;
        // if file exists
        if (this.photoFile.length > 0) {
          Promise.all(
            // photo map
            this.photoFile.map((photo) => {
              // upload date
              let uploadDate: number = new Date().getTime();
              // upload
              return this.projectService.uploadFile(createDate, `photo-${uploadDate}`, photo)
              .then((photoSrc) => {
                value.photo.push(photoSrc);
              })
            })
          )
          .then(() => {
            this.projectService.createProject(value)
            .then(() => {
              // form reset
              this.router.navigate(['/project']);
            })
          })
        } else {
          this.projectService.createProject(value)
          .then(() => {
            // form reset
            this.router.navigate(['/project']);
          })
        }
      })
      .catch((err) => {
        // failed upload thumbnail
        this.snackBar.open(this.message.validatorFile, 'CLOSE', {duration: 3000});
        // loading end
        this.createLoading = !this.createLoading;
      })
    } else {
      // failed validator
      this.snackBar.open(this.message.validatorForm, 'CLOSE', {duration: 3000});
      // loading end
      this.createLoading = !this.createLoading;
    }
  }

}
