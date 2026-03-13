import {inject, Injectable, linkedSignal, signal} from '@angular/core';
import {rxResource} from '@angular/core/rxjs-interop';
import {GetClientsHttp, GetClientsQuery} from '../ClientHttp/get-clients-http';
import {CreateClientHttp} from '../ClientHttp/create-client-http';
import {EditClientHttp} from '../ClientHttp/edit-client-http';
import {DeleteClientHttp} from '../ClientHttp/delete-client-http';
import {ClientEntity} from '../../model/clientEntity';

@Injectable({
  providedIn: 'root',
})
export class ClientListManager {
  private clientsHttp = inject(GetClientsHttp);
  private create = inject(CreateClientHttp);
  private update = inject(EditClientHttp);
  private delete = inject(DeleteClientHttp);
  private query = signal<GetClientsQuery>({ query:'',page:1,pageSize:10});
  private clientsResource= rxResource({
    params: ()=>this.query(),
    stream:({params})=> this.clientsHttp.get(params)
  })

  /*
  * A list of the current clients. It is updated when a shadow is added, updated or deleted.
  * */
  private clients = linkedSignal(()=>
    this.clientsResource.isLoading() || this.clientsResource.error() ? [] : this.clientsResource.value()!
  )
  getList(){
    return this.clients();
  }

  getById(id: string){
    return this.clients().find(client => client.id === id);
  }

  addClient(client: ClientEntity){
    this.create.create(client).subscribe(r=>{
      this.clients.set([...this.clients(),r])
    });
  }

  updateClient(client: ClientEntity){
    this.update.update(client).subscribe(r => {
      this.clients.set(this.clients().map(c => c.id === r.id ? r : c))
    })
  }
  deleteClient(client: ClientEntity){
    this.delete.delete(client.id!).subscribe(()=>{
      this.clients.set(this.clients().filter(c => c.id !== client.id))
    });
  }

}
