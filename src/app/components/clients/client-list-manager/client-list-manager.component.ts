import {AfterViewInit, Component, computed, inject, input, OnDestroy, output} from '@angular/core';
import {ClientList} from "../client-list/client-list";
import {ClientSearcher} from "../client-searcher/client-searcher";
import {ClientEntity} from '../../../core/model/clientEntity';
import {ClientManager} from '../../../core/services/Managers/client-manager.service';
import {Paginator} from '../../layout/paginator/paginator';
import {SearchBarData} from '../../../core/Interfaces/SearchInterfaces';
import {FABButton} from '../../layout/fab-button/fab-button';
import {emptySearchQuery} from '../../../core/services/other/const';

@Component({
  selector: 'app-client-list-manager',
  imports: [
    ClientList,
    ClientSearcher,
    Paginator,
    FABButton,
  ],
  templateUrl: './client-list-manager.component.html',
  styleUrl: './client-list-manager.component.scss',
})
export class ClientListManagerComponent implements OnDestroy {
  private manager = inject(ClientManager);
  readonly actions = input<boolean>(false)
  protected list = computed(()=>this.manager.clientsToDisplay())
  protected query = computed(()=>this.manager.searchQuery().pagination)
  selectedClient = output<ClientEntity>()
  edit = output<ClientEntity>()
  delete = output<ClientEntity>()
  create = output();
  ngOnDestroy(): void {
    this.manager.searchQuery.set(emptySearchQuery);
  }
  protected selectClient($event: ClientEntity) {
    this.manager.currentClient.set($event);
    this.selectedClient.emit($event);
  }
  protected deleteClient($event: ClientEntity) {
    this.delete.emit($event);
  }
  protected editClient($event: ClientEntity) {
    this.edit.emit($event);
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
