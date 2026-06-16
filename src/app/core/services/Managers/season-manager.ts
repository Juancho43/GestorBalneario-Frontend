import {computed, inject, Injectable, linkedSignal, signal} from '@angular/core';
import {SeasonEntity} from '../../model/SeasonEntity';
import {GetCurrentSeason} from '../SeasonHttp/get-current-season';
import {rxResource} from '@angular/core/rxjs-interop';
import {SetActiveSeasonHttp} from '../SeasonHttp/set-active-season-http';
import {CreateSeasonHttp} from '../SeasonHttp/create-season-http';
import {GetSeasonsHttp} from '../SeasonHttp/get-seasons-http';
import {EditSeasonHttp} from '../SeasonHttp/edit-client-http';
import {DeleteSeasonHttp} from '../SeasonHttp/delete-season-http.service';
import {SeasonSearch} from '../SeasonHttp/season-search';
import {SearchQuery} from '../../Interfaces/SearchInterfaces';
import {SeasonDetailsDTO} from '../../Interfaces/Details/SeasonDetailsDTO';
import {emptySearchQuery} from '../other/const';

@Injectable({
  providedIn: 'root',
})
export class SeasonManager {
  private searchHttp = inject(SeasonSearch);
  private createHttp = inject(CreateSeasonHttp);
  private getSeason = inject(GetCurrentSeason);
  private getSeasonsHttp = inject(GetSeasonsHttp);
  private editSeasonHttp = inject(EditSeasonHttp);
  private deleteSeasonHttp = inject(DeleteSeasonHttp);
  private setActiveHttp = inject(SetActiveSeasonHttp);
  private seasonResource = rxResource({
    stream: () => this.getSeason.get()
  })
  season = computed(()=> {
    return  this.seasonResource.isLoading() && this.seasonResource.error() ? undefined : this.seasonResource.value()?.data!;
  });
  currentSeason = linkedSignal(()=>this.season())
  private seasonsResource = rxResource({
    stream: () => this.getSeasonsHttp.get()
  });
  seasons = computed(()=> {
    return this.seasonsResource.isLoading() && this.seasonsResource.error() ? [] : this.seasonsResource.value()!.data!;
  });
  searchQuery = signal<SearchQuery>(emptySearchQuery)
  private searchResource= rxResource({
    params: () => this.searchQuery(),
    stream: ({params}) => this.searchHttp.execute(params)
  })
  seasonsToDisplay = computed(()=>
    this.searchResource.isLoading() &&  this.searchResource.error() ? [] : this.searchResource.value()?.data!
  )
  selectedSeasonId = signal<null | string>(null);
  currentSeasonDetails = signal<SeasonDetailsDTO | undefined>(undefined)

  getList(){
    return this.seasons();
  }
  createSeason(season: SeasonEntity){
    this.createHttp.execute(season).subscribe(
      r => this.searchResource.reload()
    );
  }
  cloneSeason(season: SeasonEntity){
    this.createHttp.clone({newSeason:season,oldSeasonId:this.currentSeason()!.id!}).subscribe(
      r => this.searchResource.reload()
    );
  }
  updateSeason(season: SeasonEntity){
    this.editSeasonHttp.update(season).subscribe(
      r=> this.searchResource.reload()
    );
  }
  deleteSeason(season: SeasonEntity){
    this.deleteSeasonHttp.delete(season.id!).subscribe(
      r => this.searchResource.reload()
    );
  }
  setActive(season: SeasonEntity) {
    this.setActiveHttp.execute(season).subscribe();
  }
}
