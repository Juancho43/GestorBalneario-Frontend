import {Component, computed, inject} from '@angular/core';
import {SeasonList} from '../season-list/season-list';
import {SeasonSearcher} from '../season-searcher/season-searcher';
import {SeasonManager} from '../../../core/services/Managers/season-manager';
import {Paginator} from '../../layout/paginator/paginator';
import {SearchBarData} from '../../../core/Interfaces/SearchInterfaces';

@Component({
  selector: 'app-season-list-manager',
  imports: [
    SeasonList,
    SeasonSearcher,
    Paginator,
  ],
  templateUrl: './season-list-manager.html',
  styleUrl: './season-list-manager.scss',
})
export class SeasonListManager {
  private manager = inject(SeasonManager);
  seasonList =  computed(()=>this.manager.seasonsToDisplay());

  protected query = computed(()=>this.manager.searchQuery().pagination)
  protected handleSearch($event: SearchBarData) {
    this.manager.searchQuery.update((p) => ({
      ...p,
      search: $event
    }))
  }

  protected handlePage($event: number) {
    this.manager.searchQuery.update((p) => ({
      ...p,
      pagination: {
        page: $event,
        limit: 10
      }
    }))

  }

}
