import {computed, effect, inject, Injectable, signal} from '@angular/core';
import {ShadowEntity} from '../../model/shadowEntity';
import {CreateShadowHttp} from '../ShadowHttp/create-shadow-http';
import {UpdateShadowHttp} from '../ShadowHttp/update-shadow-http';
import {DeleteShadowHttp} from '../ShadowHttp/delete-shadow-http';
import {rxResource} from '@angular/core/rxjs-interop';
import {ShadowMapHttp} from '../ShadowHttp/shadow-map-http';
import {SeasonManager} from './season-manager';
import {ShadowSearch} from '../ShadowHttp/shadow-search';
import {SearchQuery} from '../../Interfaces/SearchInterfaces';

@Injectable({
  providedIn: 'root',
})
export class ShadowManager {
  private searchHttp = inject(ShadowSearch);
  private create = inject(CreateShadowHttp);
  private update = inject(UpdateShadowHttp);
  private delete = inject(DeleteShadowHttp);
  private shadowMap = inject(ShadowMapHttp);
  private currentSeason = inject(SeasonManager);
  private season = this.currentSeason.currentSeason;
  shadowsResource= rxResource({
    stream:()=> this.shadowMap.get()
  })
  searchQuery = signal<SearchQuery>({
    pagination: {
      limit: 10,
      page:0,
    },
    search:{
      query: '',
      filters:{
        type: '',
        orderDirection:'asc',
        state:''
      }
    }
  })
  searchResource = rxResource({
    params: () => this.searchQuery(),
    stream:({params}) => this.searchHttp.execute(params)
  })

  shadowsToDisplay = computed(()=>{
    return this.searchResource.isLoading() || this.searchResource.error() ? [] : this.searchResource.value()?.data!
  })

  shadows = computed(() =>{
    let list: ShadowEntity[] = [];
    if(
      !this.shadowsResource.isLoading()
      && !this.shadowsResource.error()
      && this.shadowsResource.value
    ){
      this.shadowsResource.value()?.data!.map.forEach(row =>
        list.push(row.shadow)
      )
    }
    return list
  } );

  constructor() {
    effect(() => {
      this.season()
      this.shadowsResource.reload();
    });
  }
  currentShadow = signal<ShadowEntity>(this.shadows()[0]);

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

  getList(){
    return this.shadows();
  }

}
