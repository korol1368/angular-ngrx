import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';
import {BackendErrorsInterface} from '../../../shared/types/backendErrors.interface';
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from '../../store/selectors';
import {currentUserSelector} from '../../../auth/store/selectors';
import {filter} from 'rxjs/operators';
import {CurrentUserInputInterface} from '../../../shared/types/currentUserInput.interface';
import {updateCurrentUserAction} from '../../../auth/store/actions/updateCurrentUser.action';
import {logoutAction} from '../../../auth/store/actions/sync.action';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  currentUser!: CurrentUserInterface;
  currentUserSubscription!: Subscription;
  isSubmitting$!: Observable<boolean>;
  backendErrors!: BackendErrorsInterface | null;
  backendErrorsSubscription!: Subscription;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
    this.backendErrorsSubscription.unsubscribe();
  }

  initializeValues(): void {
    // @ts-ignore
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrorsSubscription = this.store
      // @ts-ignore
      .pipe(select(validationErrorsSelector))
      .subscribe((result) => {
        if (result) {
          this.backendErrors = result;
        }
      });
  }

  initializeListeners(): void {
    this.currentUserSubscription = this.store
      // @ts-ignore
      .pipe(select(currentUserSelector), filter(Boolean))
      // @ts-ignore
      .subscribe((currentUser: CurrentUserInterface) => {
        this.currentUser = currentUser;
        this.initializeForm();
      });
  }

  initializeForm(): void {
    this.form = this.fb.group({
      image: this.currentUser.image,
      username: this.currentUser.username,
      bio: this.currentUser.bio,
      email: this.currentUser.email,
      password: '',
    });
  }

  submit(): void {
    const currentUserInput: CurrentUserInputInterface = {
      ...this.currentUser,
      ...this.form.value,
    };
    this.store.dispatch(updateCurrentUserAction({currentUserInput}));
  }

  logout(): void {
    this.store.dispatch(logoutAction());
  }
}
