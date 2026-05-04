import {Component, computed, inject, signal} from '@angular/core';
import {ClientSearcher} from '../client-searcher/client-searcher';
import {ClientList} from '../client-list/client-list';
import {ClientForm} from '../client-form/client-form';
import {ClientEntity} from '../../../core/model/clientEntity';
import {ClientManager} from '../../../core/services/Managers/client-manager.service';
import {DialogRef} from '@angular/cdk/dialog';
import {ClientSearchHttp} from '../../../core/services/ClientHttp/client-search-http';
import {rxResource} from '@angular/core/rxjs-interop';
import {ClientListManagerComponent} from '../client-list-manager/client-list-manager.component';

@Component({
  selector: 'app-client-searcher-dialog',
  imports: [
    ClientForm,
    ClientListManagerComponent
  ],
  templateUrl: './client-manager-dialog.component.html',
  styleUrl: './client-manager-dialog.component.scss',
})
export class ClientManagerDialog {
  private searched = signal(false);
  private clientManager = inject(ClientManager);
  private searcherHttp = inject(ClientSearchHttp);
  private query = signal<{query:string,limit:number, page:number}>({query:'',limit:10,page:0})
  protected searchResource = rxResource({
    params : () => {return {query:this.query()}},
    stream: ({params}) => this.searcherHttp.execute(params.query.query, params.query.page, params.query.limit)
  })
  protected searchResults = computed(()=> this.searchResource.value()?.data!)
  private ref = inject(DialogRef<ClientManagerDialog>);
  readonly mode = signal<'search'|'create'>('search')
  protected list = computed(()=> {
    if(this.searched()){
      return this.searchResults() || []
    }else{
      return this.clientManager.getList()
    }
  })
  protected createClient($event: ClientEntity) {

    this.clientManager.addClient($event);
    this.closeDialog();
  }
  protected selectClient($event: ClientEntity) {
    this.clientManager.currentClient.set($event);
    this.closeDialog();
  }
  private closeDialog() {
    this.ref.close();
  }

}
