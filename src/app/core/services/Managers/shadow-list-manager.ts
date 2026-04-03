import {computed, inject, Injectable, linkedSignal, signal} from '@angular/core';
import {ShadowEntity} from '../../model/shadowEntity';
import {CreateShadowHttp} from '../ShadowHttp/create-shadow-http';
import {UpdateShadowHttp} from '../ShadowHttp/update-shadow-http';
import {DeleteShadowHttp} from '../ShadowHttp/delete-shadow-http';
import {GetCurrentShadowsHttp} from '../ShadowHttp/get-current-shadows-http';
import {rxResource} from '@angular/core/rxjs-interop';
import {GetShadowHttp} from '../ShadowHttp/get-shadow-http';
import {ShadowMapHttp} from '../ShadowHttp/shadow-map-http';

@Injectable({
  providedIn: 'root',
})
export class ShadowListManager {
  private shadowsHttp = inject(GetCurrentShadowsHttp);
  private create = inject(CreateShadowHttp);
  private update = inject(UpdateShadowHttp);
  private delete = inject(DeleteShadowHttp);
  private get = inject(GetShadowHttp)
  private shadowMap = inject(ShadowMapHttp);
  private shadowsResource= rxResource({
    stream:()=> this.shadowMap.get()
  })

  /*
  * A list of the current shadows. It is updated when a shadow is added, updated or deleted.
  * */



  shadows = computed(() =>{
    let list: ShadowEntity[] = [];
    if(this.shadowsResource.value()){
      this.shadowsResource.value()?.map.forEach(row =>
        list.push(row.shadow)
      )
    }
    return list
  } );  currentShadow = signal<ShadowEntity>(this.shadows()[0]);

  /**
   * Gets a shadow by its identifier.
   */
  getByIdentifier(identifier: string){
    return this.shadows().find(shadow => shadow.identifier === identifier);
  }
  /**
   * Gets a shadow by its coords.
   */
  getByCoords(coords: {x: number, y: number}){
    return this.shadows().find(shadow => shadow.coords.x === coords.x && shadow.coords.y === coords.y);
  }

  /**
   * Calls http method to create a new shadow.
   * Add a new shadow to the list.
   **/
  addShadow(shadow:ShadowEntity) {
    this.create.create(shadow).subscribe(r=>{
      this.shadowsResource.reload();
    });
  }

  /**
   * Calls http method to update a shadow.
   * Changes the shadow list with its new state.
   * */
  updateShadow(updatedShadow: ShadowEntity) {
    console.log('actualizando sombra', updatedShadow);
    this.update.update(updatedShadow).subscribe(r =>
    this.shadowsResource.reload()
    );
  }
  /**
   * Calls http method to delete a shadow
   * Removes the shadow from the list.
   *
   * */

  deleteShadow(id: string) {
    console.log('delete', id);
    this.delete.delete(id).subscribe(r => {
      this.shadowsResource.reload();
    });
  }
  /*
  * Get shadow list.
  * */
  getList(){
    return this.shadows();
  }
  setList(shadows: ShadowEntity[]){
    // this.shadows.set(shadows);
  }
}
