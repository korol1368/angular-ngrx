import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Store, select} from '@ngrx/store';
import {
  isSubmittingSelector,
  validationErrorsSelector,
  isLoadingSelector,
  articleSelector,
} from '../../store/selectors';
import {getArticleAction} from '../../store/actions/getArticle.action';
import {ActivatedRoute} from '@angular/router';
import {updateArticleAction} from '../../store/actions/updateArticle.action';
import {ArticleInputInterface} from '../../../shared/types/articleInput.interface';
import {BackendErrorsInterface} from '../../../shared/types/backendErrors.interface';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss'],
})
export class EditArticleComponent implements OnInit, OnDestroy {
  initialValues!: ArticleInputInterface;
  initialValuesSubscription!: Subscription;
  isSubmitting!: boolean;
  isSubmittingSubscription!: Subscription;
  isLoading$!: Observable<boolean>;
  backendErrors$!: Observable<BackendErrorsInterface | null>;
  slug!: string | null;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
  }

  ngOnDestroy(): void {
    this.isSubmittingSubscription.unsubscribe();
    this.initialValuesSubscription.unsubscribe();
  }

  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.isSubmittingSubscription = this.store
      // @ts-ignore
      .pipe(select(isSubmittingSelector))
      .subscribe((result) => {
        if (result) {
          this.isSubmitting = result;
        }
      });
    // @ts-ignore
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    // @ts-ignore
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
    this.initialValuesSubscription = this.store
      // @ts-ignore
      .pipe(select(articleSelector))
      .subscribe((result) => {
        if (result) {
          this.initialValues = {
            title: result.title,
            description: result.description,
            body: result.body,
            tagList: result.tagList,
          };
        }
      });
  }

  fetchData(): void {
    if (this.slug) {
      this.store.dispatch(getArticleAction({slug: this.slug}));
    }
  }

  onSubmit(articleInput: ArticleInputInterface): void {
    if (this.slug) {
      this.store.dispatch(updateArticleAction({slug: this.slug, articleInput}));
    }
  }
}
