import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store, select} from '@ngrx/store';
import {
  isSubmittingSelector,
  validationErrorsSelector,
  isLoadingSelector,
  articleSelector,
} from '../../store/selectors';
import {getArticleAction} from '../../store/actions/getArticle.action';
import {ActivatedRoute} from '@angular/router';
import {filter, map} from 'rxjs/operators';
import {ArticleInterface} from 'src/app/shared/types/article.interface';
import {updateArticleAction} from '../../store/actions/updateArticle.action';
import {ArticleInputInterface} from '../../../shared/types/articleInput.interface';
import {BackendErrorsInterface} from '../../../shared/types/backendErrors.interface';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss'],
})
export class EditArticleComponent implements OnInit {
  initialValues$!: Observable<ArticleInputInterface>;
  isSubmitting!: boolean;
  isLoading$!: Observable<boolean>;
  backendErrors$!: Observable<BackendErrorsInterface | null>;
  slug!: string | null;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initialValues();
    this.fetchData();
  }

  initialValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    // @ts-ignore
    this.store.pipe(select(isSubmittingSelector)).subscribe((result) => {
      if (result) {
        this.isSubmitting = result;
      }
    });
    // @ts-ignore
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    // @ts-ignore
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
    this.initialValues$ = this.store.pipe(
      // @ts-ignore
      select(articleSelector),
      filter(Boolean),
      map((article: ArticleInterface) => {
        return {
          title: article.title,
          description: article.description,
          body: article.body,
          tagList: article.tagList,
        };
      })
    );
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
