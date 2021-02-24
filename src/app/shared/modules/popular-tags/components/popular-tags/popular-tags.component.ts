import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getPopularTagsAction} from '../../store/actions/getPopularTags.action';
import {Observable} from 'rxjs';
import {PopularTagType} from '../../../../types/popularTag.type';
import {
  errorSelector,
  isLoadingSelector,
  popularTagsSelector,
} from '../../store/selectors';

@Component({
  selector: 'app-popular-tags',
  templateUrl: './popular-tags.component.html',
  styleUrls: ['./popular-tags.component.scss'],
})
export class PopularTagsComponent implements OnInit {
  popularTags$!: Observable<PopularTagType[] | null>;
  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
  }

  initializeValues(): void {
    // @ts-ignore
    this.popularTags$ = this.store.pipe(select(popularTagsSelector));
    // @ts-ignore
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    // @ts-ignore
    this.error$ = this.store.pipe(select(errorSelector));
  }

  fetchData(): void {
    this.store.dispatch(getPopularTagsAction());
  }
}
