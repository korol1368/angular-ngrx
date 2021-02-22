import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {BackendErrorsInterface} from '../../../shared/types/backendErrors.interface';
import {select, Store} from '@ngrx/store';
import {ArticleInputInterface} from '../../../shared/types/articleInput.interface';
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from '../../store/selectors';
import {createArticleAction} from '../../store/actions/createArticle.action';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss'],
})
export class CreateArticleComponent implements OnInit {
  initialValues: ArticleInputInterface = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  };
  isSubmitting!: boolean;
  backendErrors!: BackendErrorsInterface | null;
  constructor(private store: Store) {}

  ngOnInit(): void {
    // @ts-ignore
    this.store.pipe(select(isSubmittingSelector)).subscribe((result) => {
      if (result) {
        this.isSubmitting = result;
      }
    });
    // @ts-ignore
    this.store.pipe(select(validationErrorsSelector)).subscribe((result) => {
      if (result) {
        this.backendErrors = result;
      }
    });
  }

  onSubmit(articleInput: ArticleInputInterface) {
    this.store.dispatch(createArticleAction({articleInput}));
  }
}
