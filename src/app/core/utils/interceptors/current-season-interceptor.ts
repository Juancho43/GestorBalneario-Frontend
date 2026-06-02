import {HttpInterceptorFn} from '@angular/common/http';
import {SeasonManager} from '../../services/Managers/season-manager';
import {inject} from '@angular/core';
import {USE_SEASON_HEADER} from './UseSeasonHeader';

export const currentSeasonInterceptor: HttpInterceptorFn = (req, next) => {
  if(req.context.get(USE_SEASON_HEADER)) {
    const targerMethods = ['POST', 'PUT', 'DELETE'];
    const seasonManager = inject(SeasonManager);
    const season = seasonManager.currentSeason;
    if (targerMethods.includes(req.method)) {
      const seasonReq = req.clone({
        setHeaders: {
          'x-season' : (season()).id!,
        }
      })
      console.log(`Adding season header to request: ${seasonReq.url} with season id: ${(season()).id}`);
      return next(seasonReq);
    }
  }
  return next(req);
};
