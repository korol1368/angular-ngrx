import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getFeedAction} from '../../store/actions/getFeed.action';
import {Observable, Subscription} from 'rxjs';
import {GetFeedResponseInterface} from '../../types/getFeedResponse.interface';
import {
  errorSelector,
  feedFeatureSelector,
  feedSelector,
  isLoadingSelector,
} from '../../store/selectors';
import {environment} from '../../../../../../environments/environment';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {stringify, parseUrl} from 'query-string';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit, OnDestroy, OnChanges {
  @Input('apiUrl') apiUrlProps!: string;

  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  feed!: GetFeedResponseInterface | null;
  feedSubscription!: Subscription;
  limit = environment.limit;
  baseUrl!: string;
  queryParamsSubscription!: Subscription;
  currentPage!: number;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const isApiUrlChanged =
      !changes.apiUrlProps.firstChange &&
      changes.apiUrlProps.currentValue !== changes.apiUrlProps.previousValue;
    if (isApiUrlChanged) {
      this.fetchFeed();
    }
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe();
    this.feedSubscription.unsubscribe();
  }

  initializeListeners(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params: Params) => {
        this.currentPage = Number(params.page || '1');
        this.fetchFeed();
      }
    );
  }

  initializeValues(): void {
    // @ts-ignore
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    // @ts-ignore
    this.error$ = this.store.pipe(select(errorSelector));
    this.feedSubscription = this.store
      // @ts-ignore
      .pipe(select(feedSelector))
      .subscribe((result) => {
        if (result) {
          this.feed = result;
        }
      });
    this.baseUrl = this.router.url.split('?')[0];
  }

  fetchFeed(): void {
    const offset = this.currentPage * this.limit - this.limit;
    const parsedUrl = parseUrl(this.apiUrlProps);
    const stringifiedParams = stringify({
      limit: this.limit,
      offset,
      ...parsedUrl.query,
    });
    const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
    this.store.dispatch(getFeedAction({url: apiUrlWithParams}));
  }
}
