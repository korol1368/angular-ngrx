import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss'],
})
export class CreateArticleComponent implements OnInit {
  initialValues = {
    title: 'Foo',
    description: 'Bar',
    body: 'Baz',
    tagList: ['123'],
  };

  constructor() {}

  ngOnInit(): void {}

  onSubmit(res: any) {
    console.log('Submit in parent', res);
  }
}
