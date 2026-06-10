import {Component, computed, inject, signal} from '@angular/core';
import {ClientForm} from '../client-form/client-form';
import {ClientEntity} from '../../../core/model/clientEntity';
import {ClientManager} from '../../../core/services/Managers/client-manager.service';
import {DialogRef} from '@angular/cdk/dialog';
import {ClientListManagerComponent} from '../client-list-manager/client-list-manager.component';
import {MatDialogRef} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-client-searcher-dialog',
  imports: [
    ClientForm,
    ClientListManagerComponent,
    MatIcon
  ],
  templateUrl: './client-manager-dialog.component.html',
  styleUrl: './client-manager-dialog.component.scss',
})
export class ClientManagerDialog {
  private ref = inject(MatDialogRef);
  private manager = inject(ClientManager);

  readonly mode = signal<'search'|'create'>('search')

  protected createClient($event: ClientEntity) {
    this.manager.addClient($event);
    this.closeDialog();
  }
  protected selectClient($event: ClientEntity) {
    this.manager.currentClient.set($event);
    this.closeDialog();
  }
  protected closeDialog() {
    this.ref.close();
  }

}
