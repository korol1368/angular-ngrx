import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AuthModule} from './auth/auth.module';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {environment} from 'src/environments/environment';
import {TopBarModule} from './shared/modules/top-bar/top-bar.module';
import {PersistanceService} from './shared/services/persistance.service';
import {AuthInterceptor} from './shared/services/authinterceptor.service';
import {GlobalFeedModule} from './globalFeed/global-feed.module';
import {routerReducer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {YourFeedModule} from './your-feed/your-feed.module';
import {TagFeedModule} from './tag-feed/tag-feed.module';
import {ArticleModule} from './article/article.module';
import {CreateArticleModule} from './create-article/create-article.module';
import {EditArticleModule} from './edit-article/edit-article.module';
import {SettingsModule} from './settings/settings.module';
import {UserProfileModule} from './user-profile/user-profile.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot({router: routerReducer}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    StoreRouterConnectingModule.forRoot(),
    TopBarModule,
    GlobalFeedModule,
    YourFeedModule,
    TagFeedModule,
    CreateArticleModule,
    ArticleModule,
    EditArticleModule,
    SettingsModule,
    UserProfileModule,
  ],
  providers: [
    PersistanceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
