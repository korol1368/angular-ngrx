import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
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
export class CreateArticleComponent implements OnInit, OnDestroy {
  initialValues: ArticleInputInterface = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  };
  isSubmitting!: boolean;
  backendErrors!: BackendErrorsInterface | null;
  backendErrorsSubscription!: Subscription;
  isSubmittingSubscription!: Subscription;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isSubmittingSubscription = this.store
      // @ts-ignore
      .pipe(select(isSubmittingSelector))
      .subscribe((result) => {
        if (result) {
          this.isSubmitting = result;
        }
      });
    this.backendErrorsSubscription = this.store
      // @ts-ignore
      .pipe(select(validationErrorsSelector))
      .subscribe((result) => {
        if (result) {
          this.backendErrors = result;
        }
      });
  }

  ngOnDestroy(): void {
    this.backendErrorsSubscription.unsubscribe();
    this.isSubmittingSubscription.unsubscribe();
  }

  onSubmit(articleInput: ArticleInputInterface) {
    this.store.dispatch(createArticleAction({articleInput}));
  }
}
