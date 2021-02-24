import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {ReactiveFormsModule} from '@angular/forms';
import {BackendErrorMessagesModule} from '../shared/modules/backend-error-messages/backend-error-messages.module';
import {SettingsComponent} from './components/settings/settings.component';
import {reducers} from './store/reducers';

const routes = [
  {
    path: 'settings',
    component: SettingsComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('settings', reducers),
    BackendErrorMessagesModule,
    ReactiveFormsModule,
  ],
  declarations: [SettingsComponent],
})
export class SettingsModule {}
