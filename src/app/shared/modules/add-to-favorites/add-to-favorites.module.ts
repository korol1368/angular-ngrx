import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddToFavoritesComponent} from './components/add-to-favorites/add-to-favorites.component';
import {AddToFavoritesService} from './services/add-to-favorites.service';
import {EffectsModule} from '@ngrx/effects';
import {AddToFavoritesEffect} from './store/effects/addToFavorites.effect';

@NgModule({
  declarations: [AddToFavoritesComponent],
  imports: [CommonModule, EffectsModule.forFeature([AddToFavoritesEffect])],
  exports: [AddToFavoritesComponent],
  providers: [AddToFavoritesService],
})
export class AddToFavoritesModule {}
