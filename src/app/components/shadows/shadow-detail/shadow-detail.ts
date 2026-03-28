import {Component, computed, inject} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatChip} from '@angular/material/chips';
import {GetShadowHistoryHttp} from '../../../core/services/ShadowHttp/get-shadow-history-http';
import {rxResource} from '@angular/core/rxjs-interop';
import {ShadowListManager} from '../../../core/services/Managers/shadow-list-manager';
import {ReservationCard} from '../../reservations/reservation-card/reservation-card';

@Component({
  selector: 'app-shadow-detail',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatChip,
    ReservationCard
  ],
  templateUrl: './shadow-detail.html',
  styleUrl: './shadow-detail.scss',
})
export class ShadowDetail {
  private getHistory = inject(GetShadowHistoryHttp);
  private manager = inject(ShadowListManager);

  shadowResource = rxResource({
    params:()=> {return{id:this.manager.currentShadow().id!}},
    stream:({params}) => this.getHistory.get(params.id)
  })
  detail = computed(()=>this.shadowResource.value());

}
