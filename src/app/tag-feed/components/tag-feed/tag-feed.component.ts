import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-tag-feed',
  templateUrl: './tag-feed.component.html',
  styleUrls: ['./tag-feed.component.scss'],
})
export class TagFeedComponent implements OnInit, OnDestroy {
  apiUrl!: string;
  tagName!: string | null;
  paramsSubscription!: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.tagName = params.slug;
      this.apiUrl = `/articles?tags=${this.tagName}`;
    });
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }
}
