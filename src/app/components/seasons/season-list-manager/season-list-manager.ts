import {Component, computed, inject, output} from '@angular/core';
import {SeasonList} from '../season-list/season-list';
import {SeasonSearcher} from '../season-searcher/season-searcher';
import {SeasonManager} from '../../../core/services/Managers/season-manager';
import {Paginator} from '../../layout/paginator/paginator';
import {SearchBarData} from '../../../core/Interfaces/SearchInterfaces';
import {SeasonEntity} from '../../../core/model/SeasonEntity';
import {FABButton} from '../../layout/fab-button/fab-button';

@Component({
  selector: 'app-season-list-manager',
  imports: [
    SeasonList,
    SeasonSearcher,
    Paginator,
    FABButton,
  ],
  templateUrl: './season-list-manager.html',
  styleUrl: './season-list-manager.scss',
})
export class SeasonListManager {
  private manager = inject(SeasonManager);
  protected seasonList =  computed(()=>this.manager.seasonsToDisplay());
  protected query = computed(()=>this.manager.searchQuery().pagination);
  selected= output<SeasonEntity>();
  edit = output<SeasonEntity>();
  delete = output<SeasonEntity>();
  create = output();
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

  protected select($event: SeasonEntity) {
    this.selected.emit($event);
  }

  protected editSeason($event: SeasonEntity) {
    this.edit.emit($event);
  }

  protected deleteSeason($event: SeasonEntity) {
    this.delete.emit($event);
  }
}
