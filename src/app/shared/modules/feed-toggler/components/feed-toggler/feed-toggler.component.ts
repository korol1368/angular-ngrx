import {Component, Input, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {isLoggedInSelector} from '../../../../../auth/store/selectors';

@Component({
  selector: 'app-feed-toggler',
  templateUrl: './feed-toggler.component.html',
  styleUrls: ['./feed-toggler.component.scss'],
})
export class FeedTogglerComponent implements OnInit {
  @Input('tagName') tagNameProps!: string | null;
  isLoggedIn$!: Observable<boolean>;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues();
  }

  initializeValues(): void {
    // @ts-ignore
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
  }
}
