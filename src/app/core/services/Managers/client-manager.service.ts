import {computed, effect, inject, Injectable, signal} from '@angular/core';
import {rxResource} from '@angular/core/rxjs-interop';
import {GetClientsHttp} from '../ClientHttp/get-clients-http';
import {CreateClientHttp} from '../ClientHttp/create-client-http';
import {EditClientHttp} from '../ClientHttp/edit-client-http';
import {DeleteClientHttp} from '../ClientHttp/delete-client-http';
import {ClientEntity} from '../../model/clientEntity';
import {ClientSearchHttp} from '../ClientHttp/client-search-http';
import {SearchQuery} from '../../Interfaces/SearchInterfaces';
import {ClientDetailHttp} from '../ClientHttp/client-detail-http';
import {ClientDetailsDTO} from '../../Interfaces/Details/ClientDetailsDTO';

@Injectable({
  providedIn: 'root',
})
export class ClientManager {
  private searchHttp = inject(ClientSearchHttp);
  private clientsHttp = inject(GetClientsHttp);
  private create = inject(CreateClientHttp);
  private update = inject(EditClientHttp);
  private delete = inject(DeleteClientHttp);
  private getDetailsHttp = inject(ClientDetailHttp);
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

  currentClientDetails = signal<ClientDetailsDTO | undefined>(undefined)
  currentClient = signal<ClientEntity| null>(null);
  selectedClientId = signal<null | string>(null);


  constructor() {
    effect(() => {
      this.selectedClientId()
      this.getClientDetails();
    });
  }

  getClientDetails(){
    if(this.selectedClientId()){
      const query = {
        id: this.selectedClientId()!,
        page: 0,
        limit: 10,
      };
      this.getDetailsHttp.get(query.id,query.page,query.limit).subscribe({
        next : (r) =>{
          if(r.data){
            this.currentClientDetails.set(r.data)
          }
        }
      })
    }
  }


  addClient(client: ClientEntity){
    this.create.create(client).subscribe(r=>{
      this.currentClient.set(r.data!);

    });
  }

  updateClient(client: ClientEntity){
    this.update.update(client).subscribe(r => {
      this.currentClient.set(r.data!);
      // this.clientsResource.reload();
    })
  }
  deleteClient(client: ClientEntity){
    this.delete.delete(client.id!).subscribe(
      r =>{
        // this.clientsResource.reload()
      }
    );
  }

}
