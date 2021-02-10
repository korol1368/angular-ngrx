import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EffectsModule} from '@ngrx/effects';
import {GetArticleEffect} from './store/effects/getArticle.effect';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store/reducers';
import {RouterModule} from '@angular/router';
import {ErrorMessageModule} from '../shared/modules/error-message/error-message.module';
import {LoadingModule} from '../shared/modules/loading/loading.module';
import {ArticleService as SharedArticleService} from '../shared/services/article.service';
import { ArticleComponent } from './components/article/article.component';

@NgModule({
  declarations: [ArticleComponent],
  imports: [
    CommonModule,
    EffectsModule.forFeature([GetArticleEffect]),
    StoreModule.forFeature('article', reducers),
    RouterModule,
    ErrorMessageModule,
    LoadingModule,
  ],
  exports: [],
  providers: [SharedArticleService],
})
export class ArticleModule {}
