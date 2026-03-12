import {inject, Injectable, linkedSignal} from '@angular/core';
import {ShadowEntity} from '../model/shadowEntity';
import {CreateShadowHttp} from './ShadowHttp/create-shadow-http';
import {UpdateShadowHttp} from './ShadowHttp/update-shadow-http';
import {DeleteShadowHttp} from './ShadowHttp/delete-shadow-http';
import {GetCurrentShadowsHttp} from './ShadowHttp/get-current-shadows-http';
import {rxResource} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ShadowListManager {
  private shadowsHttp = inject(GetCurrentShadowsHttp);
  private create = inject(CreateShadowHttp);
  private update = inject(UpdateShadowHttp);
  private delete = inject(DeleteShadowHttp);
  private shadowsResource= rxResource({
    stream:()=> this.shadowsHttp.getCurrent()
  })
  private shadows = linkedSignal(()=>
  this.shadowsResource.isLoading() || this.shadowsResource.error() ? [] : this.shadowsResource.value()!)

  getByIdentifier(identifier: string){
    return this.shadows().find(shadow => shadow.identifier === identifier);
  }
  getByCoords(coords: {x: number, y: number}){
    return this.shadows().find(shadow => shadow.coords.x === coords.x && shadow.coords.y === coords.y);
  }
  addShadow(shadow:ShadowEntity) {
    this.create.create(shadow).subscribe(r=>{
      this.shadows.set([...this.shadows(),r])
    });
  }
  updateShadow(updatedShadow: ShadowEntity) {
    this.update.update(updatedShadow).subscribe();
  }
  deleteShadow(id: string) {
    this.delete.delete(id).subscribe(r => {
      console.log('god');
      this.shadows.set(this.shadows().filter(s => s.identifier !== id));
    });
  }
  getList(){
    console.log("get list", this.shadows());
    return this.shadows();
  }
}
