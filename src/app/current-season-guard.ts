import { CanActivateFn } from '@angular/router';
import {SeasonManager} from './core/services/Managers/season-manager';
import {inject} from '@angular/core';

export const currentSeasonGuard: CanActivateFn = (route, state) => {
  const currentSeason = inject(SeasonManager);
  return (currentSeason.currentSeason()).isActive;
};
