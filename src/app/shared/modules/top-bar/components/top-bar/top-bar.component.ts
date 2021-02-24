import {Component, OnDestroy, OnInit} from '@angular/core';
import {CurrentUserInterface} from '../../../../types/currentUser.interface';
import {select, Store} from '@ngrx/store';
import {
  currentUserSelector,
  isAnonymousSelector,
  isLoggedInSelector,
} from '../../../../../auth/store/selectors';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit, OnDestroy {
  isLoggedIn!: boolean;
  isLoggedInSubscription!: Subscription;
  isAnonymous!: boolean;
  isAnonymousSubscription!: Subscription;
  currentUser!: CurrentUserInterface;
  currentUserSubscription!: Subscription;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isLoggedInSubscription = this.store
      // @ts-ignore
      .pipe(select(isLoggedInSelector))
      .subscribe((result) => {
        if (result) {
          this.isLoggedIn = result;
        }
      });

    this.isAnonymousSubscription = this.store
      // @ts-ignore
      .pipe(select(isAnonymousSelector))
      .subscribe((result) => {
        if (result) {
          this.isAnonymous = result;
        }
      });

    this.currentUserSubscription = this.store
      // @ts-ignore
      .pipe(select(currentUserSelector))
      .subscribe((result) => {
        if (result !== null) {
          this.currentUser = result;
        }
      });
  }

  ngOnDestroy(): void {
    this.isLoggedInSubscription.unsubscribe();
    this.isAnonymousSubscription.unsubscribe();
    this.currentUserSubscription.unsubscribe();
  }
}
