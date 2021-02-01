import {Component, OnInit} from '@angular/core';
import {CurrentUserInterface} from '../../../../types/currentUser.interface';
import {select, Store} from '@ngrx/store';
import {
  currentUserSelector,
  isAnonymousSelector,
  isLoggedInSelector,
} from '../../../../../auth/store/selectors';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  isLoggedIn!: boolean;
  isAnonymous!: boolean;
  currentUser!: CurrentUserInterface;

  constructor(private store: Store) {}

  ngOnInit(): void {
    // @ts-ignore
    this.store.pipe(select(isLoggedInSelector)).subscribe((result) => {
      if (result) {
        this.isLoggedIn = result;
      }
    });

    // @ts-ignore
    this.store.pipe(select(isAnonymousSelector)).subscribe((result) => {
      if (result) {
        this.isAnonymous = result;
      }
    });

    // @ts-ignore
    this.store.pipe(select(currentUserSelector)).subscribe((result) => {
      if (result !== null) {
        this.currentUser = result;
      }
    });
  }
}
