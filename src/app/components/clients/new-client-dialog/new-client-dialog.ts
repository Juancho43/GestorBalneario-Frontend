import {Component, computed, inject} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {ClientManager} from '../../../core/services/Managers/client-manager.service';
import {ClientEntity} from '../../../core/model/clientEntity';
import {ClientForm} from '../client-form/client-form';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-new-client-dialog',
  imports: [ClientForm,MatIcon],
  templateUrl: './new-client-dialog.html',
  styleUrl: './new-client-dialog.scss',
})
export class NewClientDialog {
  private ref = inject(MatDialogRef);
  private manager = inject(ClientManager);
  protected client = computed(()=>this.manager.currentClientDetails()?.client)

  protected handleSubmit($event: ClientEntity) {
    this.manager.addClient($event);
    this.close();
  }

  protected close() {
    this.ref.close();
  }
}
