import {Component, Input, OnInit} from '@angular/core';
import {ArticleInputInterface} from '../../../../types/articleInput.interface';
import {BackendErrorsInterface} from '../../../../types/backendErrors.interface';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss'],
})
export class ArticleFormComponent implements OnInit {
  @Input('initialValues') initialValuesProps!: ArticleInputInterface;
  @Input('isSubmitting') isSubmittingProps!: boolean;
  @Input('errors') errorsProps!: BackendErrorsInterface | null;

  constructor() {}

  ngOnInit(): void {}
}
