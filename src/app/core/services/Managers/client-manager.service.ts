import {computed, inject, Injectable, linkedSignal, signal} from '@angular/core';
import {rxResource} from '@angular/core/rxjs-interop';
import {GetClientsHttp, PaginatedQuery} from '../ClientHttp/get-clients-http';
import {CreateClientHttp} from '../ClientHttp/create-client-http';
import {EditClientHttp} from '../ClientHttp/edit-client-http';
import {DeleteClientHttp} from '../ClientHttp/delete-client-http';
import {ClientEntity} from '../../model/clientEntity';
import {ClientSearchHttp} from '../ClientHttp/client-search-http';
import {SearchQuery} from '../../Interfaces/SearchInterfaces';

@Injectable({
  providedIn: 'root',
})
export class ClientManager {
  private searchHttp = inject(ClientSearchHttp);
  private clientsHttp = inject(GetClientsHttp);
  private create = inject(CreateClientHttp);
  private update = inject(EditClientHttp);
  private delete = inject(DeleteClientHttp);
  private query = signal<PaginatedQuery>({ query:'',page:1,pageSize:10});
   clientsResource= rxResource({
    params: ()=>this.query(),
    stream:({params})=> this.clientsHttp.get(params)
  })
  searchQuery = signal<SearchQuery>({
    pagination: {
      limit: 10,
      page:0,
    },
    search:{
      query: '',
      filters:{
        orderDirection:'asc',
        orderBy:'name'
      }
    }
  })
  searchResource = rxResource({
    params: () => this.searchQuery(),
    stream:({params}) => this.searchHttp.execute(params)
  })
  clientsToDisplay = computed(()=>{
    return this.searchResource.isLoading() || this.searchResource.error() ? [] : this.searchResource.value()?.data!
  })
  currentClient = signal<ClientEntity| null>(null);
  /*
  * A list of the current clients. It is updated when a shadow is added, updated or deleted.
  * */
   clients = linkedSignal(()=>
    this.clientsResource.isLoading() || this.clientsResource.error() ? [] : this.clientsResource.value()!.data!
  )
  getList(){
    return this.clients();
  }
  addClient(client: ClientEntity){
    this.create.create(client).subscribe(r=>{
      this.currentClient.set(r.data!);

    });
  }

  updateClient(client: ClientEntity){
    this.update.update(client).subscribe(r => {
      this.currentClient.set(r.data!);
      this.clientsResource.reload();
    })
  }
  deleteClient(client: ClientEntity){
    this.delete.delete(client.id!).subscribe(
      r =>{
        this.clientsResource.reload()
      }
    );
  }

}
