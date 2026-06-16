import {Component, computed, inject, OnDestroy, output} from '@angular/core';
import {ShadowSearcher} from '../shadow-searcher/shadow-searcher';
import {ShadowList} from '../shadow-list/shadow-list';
import {ShadowManager} from '../../../core/services/Managers/shadow-manager.service';
import {ShadowEntity} from '../../../core/model/shadowEntity';
import {SearchBarData} from '../../../core/Interfaces/SearchInterfaces';
import {Paginator} from '../../layout/paginator/paginator';
import {emptySearchQuery} from '../../../core/services/other/const';

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
export class ShadowListManager implements OnDestroy{
  private manager = inject(ShadowManager)
  protected query = computed(()=>this.manager.searchQuery().pagination)
  protected shadows = computed(()=>this.manager.shadowsToDisplay())
  selectedShadow = output<ShadowEntity>();
  ngOnDestroy(): void {
    this.manager.searchQuery.set(emptySearchQuery);
  }

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
