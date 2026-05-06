import {Component, computed, inject} from '@angular/core';
import {GetShadowHistoryHttp} from '../../../core/services/ShadowHttp/get-shadow-history-http';
import {rxResource} from '@angular/core/rxjs-interop';
import {ShadowManager} from '../../../core/services/Managers/shadow-manager.service';
import {ReservationCard} from '../../reservations/reservation-card/reservation-card';

@Component({
  selector: 'app-shadow-detail',
  imports: [
    ReservationCard
  ],
  templateUrl: './shadow-detail.html',
  styleUrl: './shadow-detail.scss',
})
export class ShadowDetail {
  private getHistory = inject(GetShadowHistoryHttp);
  private manager = inject(ShadowManager);

  shadowResource = rxResource({
    params:()=> {return{id:this.manager.currentShadow().id!}},
    stream:({params}) => this.getHistory.get(params.id)
  })
  detail = computed(()=>this.shadowResource.value()?.data!);

}
