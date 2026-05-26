import {Component, output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {FilterButton} from '../../layout/filter-button/filter-button';
import {SearchBar} from '../../layout/search-bar/search-bar';
export interface serviceSearch{
  name: string
  type: string
}
@Component({
  selector: 'app-service-searcher',
  imports: [
    MatIcon,
    FormsModule,
    FilterButton,
    SearchBar,
  ],
  templateUrl: './service-searcher.html',
  styleUrl: './service-searcher.scss',
})
export class ServiceSearcher {
  requestSearch = output<any>();
  protected searchTerm: string = '';

  protected submitHandler() {
    this.requestSearch.emit({query: this.searchTerm, limit: 10, page: 0});

  }

  protected handleFilter() {

  }
}
