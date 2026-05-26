import {Component, computed, inject, output, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {FilterButton} from '../../layout/filter-button/filter-button';
import {ReservationFilters} from '../reservation-filters/reservation-filters';
import {SearchBar} from '../../layout/search-bar/search-bar';
import {MatDialog} from '@angular/material/dialog';

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
  private dialog = inject(MatDialog);
  filters = signal<any | null>(null);
  protected searchTerm = ''
  searchQuery = computed(()=>({
    filters: this.filters(),
    query : this.searchTerm,
  }));
  finalQuery = output<any>();
  protected handleFilter() {
    const ref = this.dialog.open(ReservationFilters);
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
