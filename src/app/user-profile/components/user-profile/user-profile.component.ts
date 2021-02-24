import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserProfileInterface} from '../../types/userProfile.interface';
import {combineLatest, Observable, Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {getUserProfileAction} from '../../store/actions/getUserProfile.action';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {
  errorSelector,
  isLoadingSelector,
  userProfileSelector,
} from '../../store/selectors';
import {currentUserSelector} from '../../../auth/store/selectors';
import {filter, map} from 'rxjs/operators';
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  userProfile!: UserProfileInterface;
  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  userProfileSubscription!: Subscription;
  slug!: string | null;
  apiUrl!: string;
  isCurrentUserProfile$!: Observable<boolean>;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }

  ngOnDestroy(): void {
    this.userProfileSubscription.unsubscribe();
  }

  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    // @ts-ignore
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    // @ts-ignore
    this.error$ = this.store.pipe(select(errorSelector));
    this.isCurrentUserProfile$ = combineLatest(
      // @ts-ignore
      this.store.pipe(select(currentUserSelector), filter(Boolean)),
      // @ts-ignore
      this.store.pipe(select(userProfileSelector), filter(Boolean))
    ).pipe(
      // @ts-ignore
      map(
        ([currentUser, userProfile]: [
          CurrentUserInterface,
          UserProfileInterface
        ]) => {
          return currentUser.username === userProfile.username;
        }
      )
    );
  }

  getApiUrl(): string {
    const isFavorites = this.router.url.includes('favorites');
    return isFavorites
      ? `/articles?favorited=${this.slug}`
      : `/articles?author=${this.slug}`;
  }

  initializeListeners(): void {
    this.userProfileSubscription = this.store
      // @ts-ignore
      .pipe(select(userProfileSelector))
      // @ts-ignore
      .subscribe((userProfile: UserProfileInterface) => {
        this.userProfile = userProfile;
      });

    this.route.params.subscribe((params: Params) => {
      this.slug = params.slug;
      this.fetchUserProfile();
    });
  }

  fetchUserProfile(): void {
    if (this.slug) {
      this.store.dispatch(getUserProfileAction({slug: this.slug}));
    }
  }
}
