import { Component, OnInit, VERSION } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  get chapters() {
    console.log(this.createForm.get('chapterList'));
    return this.createForm.get('chapterList') as FormArray;
  }

  // get subChapter() {
  //   return <FormGroup>this.createForm.get('subChapter').controls[].get('subChapter')
  // }

  initChapter() {
    return this.fb.group({
      mainChapterName: this.fb.control(''),
      subChapters: this.fb.array([this.initSubChapter()]),
    });
  }

  initSubChapter() {
    return this.fb.group({
      subChapterName: this.fb.control(''),
    });
  }

  ngOnInit(): void {
    this.createFormHandle();
  }
  name = 'Angular ' + VERSION.major;
  createForm: FormGroup;

  createFormHandle() {
    this.createForm = this.fb.group({
      chapterList: this.fb.array([this.initChapter()]),
    });
  }

  addChapter() {
    this.chapters.push(this.initChapter());
  }

  addSubhapter(i: any) {
    (<FormArray>this.chapters['controls'][i].get('subChapters')).push(
      this.initSubChapter()
    );
  }

  getChapter(form: any) {
    console.log(form);
    return form.controls.chapterList.controls;
  }

  getSubChapter(form: any, i: number) {
    console.log(form.controls[i].controls.subChapters);
    return form.controls[i].controls.subChapters;
  }

  onSubmit(form) {}

  removeChapter(i: any) {
    this.chapters.removeAt(i)
  }

  removeSubChapter(j: any, i: any) {
    console.log('here', j);
    (<FormArray>this.chapters['controls'][j].get('subChapters')).removeAt(i)
  }

  // addMainChapter() {
  //   this.createForm.push(this.fb.array([
  //     {
  //       mainChapter: this.fb.control(''),
  //       subChapter: this.fb.array([this.fb.control('')]),
  //     },
  //   ]))
  // }

  // addSubChapter(number: any) {
  //   this.subChapter.push(this.fb.control(''));
  // }
}
