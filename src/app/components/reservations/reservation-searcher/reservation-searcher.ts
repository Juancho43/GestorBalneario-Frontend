import {Component, computed, inject, linkedSignal, output, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {FilterButton} from '../../layout/filter-button/filter-button';
import {ReservationFilters} from '../reservation-filters/reservation-filters';
import {SearchBar} from '../../layout/search-bar/search-bar';
import {DialogHelper} from '../../../core/utils/other/dialog-helper';
import {Filters, SearchBarData} from '../../../core/Interfaces/SearchInterfaces';
import {emptySearchQuery} from '../../../core/services/other/const';

@Component({
  selector: 'app-reservation-searcher',
  imports: [
    FormsModule,
    MatIcon,
    FilterButton,
    SearchBar
  ],
  templateUrl: './reservation-searcher.html',
  styleUrl: './reservation-searcher.scss',
})
export class ReservationSearcher {
  private dialog = inject(DialogHelper);
  protected filters = linkedSignal<Filters>(()=> emptySearchQuery.search.filters);
  protected searchTerm = signal<string>('');
  protected searchQuery = computed<SearchBarData>(()=>({
    filters: this.filters()!,
    query : this.searchTerm(),
  }));
  finalQuery = output<SearchBarData>();

  protected handleFilter() {
    const ref = this.dialog.openDialog(ReservationFilters,this.dialog.getConfig());
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
