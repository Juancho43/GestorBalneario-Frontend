import {Component, computed, inject, signal} from '@angular/core';
import {ShadowDetail} from "../shadow-detail/shadow-detail";
import {ShadowMap} from "../shadow-map/shadow-map";
import {ShadowListManager} from '../core/services/shadow-list-manager';
import {ShadowEntity} from '../core/services/shadowEntity';

@Component({
  selector: 'app-shadow-reservation-panel',
    imports: [
        ShadowMap
    ],
  templateUrl: './shadow-reservation-panel.html',
  styleUrl: './shadow-reservation-panel.scss',
})
export class ShadowReservationPanel {
  private shadowListManager = inject(ShadowListManager);
  shadows = computed(()=>this.shadowListManager.getList());
  currentShadow = signal<ShadowEntity>({} as ShadowEntity);
  select(event: any) {
    this.currentShadow.set(this.shadowListManager.getByCoords({ x: event.left, y: event.top })!);
  }
}
