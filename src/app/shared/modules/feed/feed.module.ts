import {NgModule} from '@angular/core';
import {FeedComponent} from './components/feed/feed.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [FeedComponent],
  imports: [CommonModule],
  exports: [FeedComponent],
})
export class FeedModule {}
