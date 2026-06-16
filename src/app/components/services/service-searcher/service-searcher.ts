import {Component, computed, inject, linkedSignal, output, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {FilterButton} from '../../layout/filter-button/filter-button';
import {SearchBar} from '../../layout/search-bar/search-bar';
import {ServiceFilters} from '../service-filters/service-filters';
import {DialogHelper} from '../../../core/utils/other/dialog-helper';
import {Filters, SearchBarData} from '../../../core/Interfaces/SearchInterfaces';
import {emptySearchQuery} from '../../../core/services/other/const';

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
  private dialog = inject(DialogHelper);
  protected filters = linkedSignal<Filters>(()=>emptySearchQuery.search.filters);
  protected searchTerm = signal<string>('');
  protected searchQuery = computed<SearchBarData>(()=>({
    filters: this.filters()!,
    query : this.searchTerm(),
  }));

  finalQuery = output<SearchBarData>();
  protected handleFilter() {
    const ref = this.dialog.openDialog(ServiceFilters,this.dialog.getConfig());
    ref.afterClosed().subscribe(r =>{
      if(r!=undefined){
        this.filters.set(r);
      }
    })
  }

  protected submitHandler() {
    this.finalQuery.emit(this.searchQuery());
  }
}
