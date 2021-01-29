import {AuthStateInterface} from '../types/authState.interface';
import {AppStateInterface} from '../../shared/types/appState.interface';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export const authFeatureSelector = createFeatureSelector<
  AppStateInterface,
  AuthStateInterface
  >('auth');

export const isSubmittingSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isSubmitting
);
