import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BackendErrorsInterface} from '../../../shared/types/backendErrors.interface';
import {select, Store} from '@ngrx/store';
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from '../../store/selectors';
import {LoginRequestInterface} from '../../types/loginRequest.interface';
import {loginAction} from '../../store/actions/login.action';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  isSubmitting!: boolean;
  backendErrors!: BackendErrorsInterface | null;
  backendErrorsSubscription!: Subscription;
  isSubmittingSubscription!: Subscription;
  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
  }

  ngOnDestroy(): void {
    this.backendErrorsSubscription.unsubscribe();
    this.isSubmittingSubscription.unsubscribe();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      email: '',
      password: '',
    });
  }

  initializeValues(): void {
    // @ts-ignore
    this.store.pipe(select(isSubmittingSelector)).subscribe((result) => {
      this.isSubmitting = result;
    });
    // @ts-ignore
    this.store.pipe(select(validationErrorsSelector)).subscribe((result) => {
      this.backendErrors = result;
    });
  }

  onSubmit(): void {
    const request: LoginRequestInterface = {
      user: this.form.value,
    };
    this.store.dispatch(loginAction({request}));
  }
}
