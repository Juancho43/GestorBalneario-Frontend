import {Component, inject} from '@angular/core';
import {ClientManager} from '../../../core/services/Managers/client-manager.service';
import {ClientEntity} from '../../../core/model/clientEntity';
import {Dialog} from '@angular/cdk/dialog';
import {ClientDetails} from '../../clients/client-details/client-details';
import {ClientListManagerComponent} from '../../clients/client-list-manager/client-list-manager.component';

@Component({
  selector: 'app-client-viewer',
  imports: [
    ClientListManagerComponent
  ],
  templateUrl: './client-viewer.html',
  styleUrl: './client-viewer.scss',
})
export class ClientViewer {
  private manager = inject(ClientManager);
  private dialog = inject(Dialog);

  protected openClientDetail(client: ClientEntity) {
    this.manager.currentClient.set(client);
    this.dialog.open(ClientDetails);
  }
}
