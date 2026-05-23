import {Component, input, output, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ServiceTypePipe} from '../../../core/utils/pipes/service-type-pipe';
import {MatIcon} from '@angular/material/icon';
import {CustomMenu} from '../../layout/custom-menu/custom-menu';
export interface serviceSearch{
  name: string
  type: string
}
@Component({
  selector: 'app-service-searcher',
  imports: [
    MatIcon,
    FormsModule,
    CustomMenu,
  ],
  templateUrl: './service-searcher.html',
  styleUrl: './service-searcher.scss',
})
export class ServiceSearcher {
  readonly serviceTypes = input.required<string[]>();
  searchQuery =signal<serviceSearch>({name:'',type:'ALL'})
  search = output<serviceSearch>()
  protected handleSubmit() {
    this.search.emit(this.searchQuery())
  }
}
