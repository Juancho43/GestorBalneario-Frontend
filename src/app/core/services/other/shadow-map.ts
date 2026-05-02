import {computed, inject, Injectable} from '@angular/core';
import {ShadowMapHttp} from '../ShadowHttp/shadow-map-http';
import {rxResource} from '@angular/core/rxjs-interop';
import {ShadowEntity} from '../../model/shadowEntity';
import {ReservationEntity} from '../../model/reservationEntity';

@Injectable({
  providedIn: 'root',
})
export class ShadowMap {
  private shadowMap = inject(ShadowMapHttp);
  private mapResource= rxResource({
    stream:()=> this.shadowMap.get()
  })
  /*
  * A list of the current shadows. It is updated when a shadow is added, updated or deleted.
  * */
  shadows = computed(() =>{
    let list: ShadowEntity[] = [];
    if(this.mapResource.value()){
      this.mapResource.value()?.data!.map.forEach(row =>
        list.push(row.shadow)
      )
    }
    return list
  } );
  reservations = computed(() =>{
    let list: ReservationEntity[] = [];
    if (this.mapResource.value()){
      this.mapResource.value()?.data!.map.forEach(row =>{
        list.push(row.reservation!)
      })
    }
    return list
  })
}
