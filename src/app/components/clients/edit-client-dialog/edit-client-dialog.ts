import {Component, computed, inject} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {ClientManager} from '../../../core/services/Managers/client-manager.service';
import {ClientEntity} from '../../../core/model/clientEntity';
import {ClientForm} from '../client-form/client-form';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-edit-client-dialog',
  imports: [ClientForm,MatIcon],
  templateUrl: './edit-client-dialog.html',
  styleUrl: './edit-client-dialog.scss',
})
export class EditClientDialog {
  private ref = inject(MatDialogRef);
  private manager = inject(ClientManager);
  protected client = computed(()=>this.manager.currentClientDetails()?.client)

  protected handleSubmit($event: ClientEntity){
    this.manager.updateClient($event);
    this.close();
  }

  protected close() {
    this.ref.close();
  }

}
