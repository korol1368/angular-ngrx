import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {UpdateArticleEffect} from './store/effects/updateArticle.effect';
import {GetArticleEffect} from './store/effects/getArticle.effect';
import {ArticleService as SharedArticleService} from 'src/app/shared/services/article.service';
import {LoadingModule} from '../shared/modules/loading/loading.module';
import {EditArticleService} from './services/edit-article.service';
import {ArticleFormModule} from '../shared/modules/article-form/article-form.module';
import {reducers} from './store/reducers';
import {EditArticleComponent} from './components/edit-article/edit-article.component';

const routes = [
  {
    path: 'articles/:slug/edit',
    component: EditArticleComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ArticleFormModule,
    EffectsModule.forFeature([UpdateArticleEffect, GetArticleEffect]),
    StoreModule.forFeature('editArticle', reducers),
    LoadingModule,
  ],
  declarations: [EditArticleComponent],
  providers: [EditArticleService, SharedArticleService],
})
export class EditArticleModule {}
