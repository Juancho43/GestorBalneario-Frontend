import {Component, computed, inject} from '@angular/core';
import {ClientListManager} from '../../../core/services/Managers/client-list-manager';
import {ClientCard} from '../../clients/client-card/client-card';
import {ClientEntity} from '../../../core/model/clientEntity';
import {Dialog} from '@angular/cdk/dialog';
import {ClientDetails} from '../../clients/client-details/client-details';

@Component({
  selector: 'app-client-viewer',
  imports: [
    ClientCard
  ],
  templateUrl: './client-viewer.html',
  styleUrl: './client-viewer.scss',
})
export class ClientViewer {
  private manager = inject(ClientListManager);
  private dialog = inject(Dialog);
  protected clientList = computed(()=>this.manager.getList());

  protected openClientDetail(client: ClientEntity) {
    this.manager.currentClient.set(client);
    this.dialog.open(ClientDetails);
  }
}
