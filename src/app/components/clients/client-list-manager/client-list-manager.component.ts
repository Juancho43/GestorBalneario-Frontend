import {Component, computed, inject, input, output, signal} from '@angular/core';
import {ClientList} from "../client-list/client-list";
import {ClientSearcher} from "../client-searcher/client-searcher";
import {rxResource} from '@angular/core/rxjs-interop';
import {ClientEntity} from '../../../core/model/clientEntity';
import {ClientSearchHttp} from '../../../core/services/ClientHttp/client-search-http';
import {ClientManager} from '../../../core/services/Managers/client-manager.service';
import {Paginator} from '../../paginator/paginator';
import {GetClientsHttp, PaginatedQuery} from '../../../core/services/ClientHttp/get-clients-http';

@Component({
  selector: 'app-client-list-manager',
  imports: [
    ClientList,
    ClientSearcher,
    Paginator
  ],
  templateUrl: './client-list-manager.component.html',
  styleUrl: './client-list-manager.component.scss',
})
export class ClientListManagerComponent {
  private searcherHttp = inject(ClientSearchHttp);
  private clientManager = inject(ClientManager);
  readonly actions = input<boolean>(false)
  private searched = signal(false);
  private query = signal<PaginatedQuery>({query:'',pageSize:10,page:0})

  private searchResource = rxResource({
    params : () => {return {query:this.query()}},
    stream: ({params}) => this.searcherHttp.execute(params.query.query, params.query.page, params.query.pageSize)
  })


  protected searchResults = computed(()=> this.searchResource.value()?.data!)
  protected list = computed(()=> {
    if(this.searched()){
      return this.searchResults() || []
    }else{
      return this.clientManager.getList() || []
    }
  })

  selectedClient = output<ClientEntity>()
  edit = output<ClientEntity>()
  delete = output<ClientEntity>()
  protected selectClient($event: ClientEntity) {
    this.clientManager.currentClient.set($event);
    this.selectedClient.emit($event);
  }
  protected deleteClient($event: ClientEntity) {
    this.delete.emit($event);
  }
  protected editClient($event: ClientEntity) {
    this.edit.emit($event);
  }
  changePage($event: number){
    this.query.update(prev => ({...prev, page: prev.page - $event}))
  }
  protected searchHandler($event: any) {
    this.searched.set(true);
    this.query.set({query:$event.query, pageSize:$event.limit, page:0})
  }
}
