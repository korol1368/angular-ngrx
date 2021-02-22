import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';
import {getArticleAction} from '../../store/actions/getArticle.action';
import {ArticleInterface} from '../../../shared/types/article.interface';
import {combineLatest, Observable, Subscription} from 'rxjs';
import {
  articleSelector,
  errorSelector,
  isLoadingSelector,
} from '../../store/selectors';
import {currentUserSelector} from '../../../auth/store/selectors';
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';
import {map} from 'rxjs/operators';
import {deleteArticleAction} from '../../store/actions/deleteArticle.action';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit, OnDestroy {
  slug!: string;
  article!: ArticleInterface | null;
  articleSubscription!: Subscription;
  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  isAuthor$!: Observable<boolean>;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
    this.fetchData();
  }

  ngOnDestroy(): void {
    this.articleSubscription.unsubscribe();
  }

  initializeValues(): void {
    const response = this.route.snapshot.paramMap.get('slug');
    if (response) {
      this.slug = response;
    }
    // @ts-ignore
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    // @ts-ignore
    this.error$ = this.store.pipe(select(errorSelector));
    this.isAuthor$ = combineLatest(
      // @ts-ignore
      this.store.pipe(select(articleSelector)),
      // @ts-ignore
      this.store.pipe(select(currentUserSelector))
    ).pipe(
      map(
        ([article, currentUser]: [
          ArticleInterface | null,
          CurrentUserInterface | null
        ]) => {
          if (!article || !currentUser) {
            return false;
          }
          return currentUser.username === article.author.username;
        }
      )
    );
  }

  initializeListeners(): void {
    this.articleSubscription = this.store
      // @ts-ignore
      .pipe(select(articleSelector))
      .subscribe((article: ArticleInterface | null) => {
        this.article = article;
      });
  }

  fetchData(): void {
    this.store.dispatch(getArticleAction({slug: this.slug}));
  }

  deleteArticle(): void {
    this.store.dispatch(deleteArticleAction({slug: this.slug}));
  }
}
