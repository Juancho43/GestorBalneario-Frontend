import {Injectable, signal} from '@angular/core';
import {ShadowEntity} from './shadowEntity';

@Injectable({
  providedIn: 'root',
})
export class ShadowListManager {
  private shadows= signal<ShadowEntity[] >([]);

  constructor() {
    localStorage.getItem('shadows') && this.shadows.set(JSON.parse(localStorage.getItem('shadows')!));
  }
  getByIdentifier(identifier: string){
    return this.shadows().find(shadow => shadow.identifier === identifier);
  }
  getByCoords(coords: {x: number, y: number}){
    return this.shadows().find(shadow => shadow.coords.x === coords.x && shadow.coords.y === coords.y);
  }
  addShadow(shadow:ShadowEntity) {
    this.shadows.set([...this.shadows(), shadow]);
    this.persist();
  }
  private persist(){
    localStorage.setItem('shadows', JSON.stringify(this.shadows()));
  }
  updateShadow(updatedShadow: ShadowEntity) {
    const updatedShadows = this.shadows().map(shadow =>
      shadow.coords.y === updatedShadow.coords.y && shadow.coords.x === shadow.coords.x  ? updatedShadow : shadow
    );
    this.shadows.set(updatedShadows);
    this.persist();
  }
  getList(){
    return this.shadows();
  }
}
