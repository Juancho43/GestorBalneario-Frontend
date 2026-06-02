import {Component, computed, inject, output} from '@angular/core';
import {ShadowSearcher} from '../shadow-searcher/shadow-searcher';
import {ShadowList} from '../shadow-list/shadow-list';
import {ShadowManager} from '../../../core/services/Managers/shadow-manager.service';
import {ShadowEntity} from '../../../core/model/shadowEntity';
import {SearchBarData} from '../../../core/Interfaces/SearchInterfaces';
import {Paginator} from '../../layout/paginator/paginator';

@Component({
  selector: 'app-shadow-list-manager',
  imports: [
    ShadowSearcher,
    ShadowList,
    Paginator
  ],
  templateUrl: './shadow-list-manager.html',
  styleUrl: './shadow-list-manager.scss',
})
export class ShadowListManager {
  private manager = inject(ShadowManager)
  protected query = computed(()=>this.manager.searchQuery().pagination)
  protected shadows = computed(()=>this.manager.shadowsToDisplay())
  selectedShadow = output<ShadowEntity>();

  protected handleSearch($event: SearchBarData) {
    this.manager.searchQuery.update((p) => ({
      ...p,
      search: $event
    }))
  }

  protected handlePage($event:number) {
    this.manager.searchQuery.update((p) => ({
      ...p,
      pagination:{
        page: $event,
        limit:10
      }
    }))
  }
}
