import {CanActivateFn} from '@angular/router';
import {SeasonManager} from '../services/Managers/season-manager';
import {inject} from '@angular/core';

export const currentSeasonGuard: CanActivateFn = (route, state) => {
  const currentSeason = inject(SeasonManager);
  const current = currentSeason.currentSeason();
  return current?.isActive ?? false;
};
