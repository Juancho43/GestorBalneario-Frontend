import {computed, inject, Injectable, linkedSignal} from '@angular/core';
import {SeasonEntity} from '../../model/SeasonEntity';
import {GetCurrentSeason} from '../SeasonHttp/get-current-season';
import {rxResource} from '@angular/core/rxjs-interop';
import {SetActiveSeasonHttp} from '../SeasonHttp/set-active-season-http';

@Injectable({
  providedIn: 'root',
})
export class SeasonManager {
  private getSeason = inject(GetCurrentSeason);
  private setActiveHttp = inject(SetActiveSeasonHttp);
  seasonResource = rxResource({
    stream: () => this.getSeason.get()
  })
  season = computed(()=>this.seasonResource.value()!);
  currentSeason = linkedSignal<SeasonEntity>(()=>this.season())

  setActive(season: SeasonEntity) {
    this.setActiveHttp.execute(season).subscribe();
  }
}
