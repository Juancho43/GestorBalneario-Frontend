import {Component, computed, inject, input, signal} from '@angular/core';
import {ClientSearcher} from '../client-searcher/client-searcher';
import {ClientList} from '../client-list/client-list';
import {ClientForm} from '../client-form/client-form';
import {ClientEntity} from '../../../core/model/clientEntity';
import {ClientListManager} from '../../../core/services/Managers/client-list-manager';

@Component({
  selector: 'app-client-searcher-dialog',
  imports: [
    ClientSearcher,
    ClientList,
    ClientForm
  ],
  templateUrl: './client-manager-dialog.component.html',
  styleUrl: './client-manager-dialog.component.scss',
})
export class ClientManagerDialog {
  private clientManager = inject(ClientListManager);
  readonly mode = signal<'search'|'create'>('search')
  protected list = computed(()=>this.clientManager.getList());
  protected createClient($event: ClientEntity) {
    this.clientManager.addClient($event);
  }
}
