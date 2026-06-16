import {Component, computed, inject, output, signal} from '@angular/core';
import {FilterButton} from '../../layout/filter-button/filter-button';
import {FormsModule} from '@angular/forms';
import {SearchBar} from '../../layout/search-bar/search-bar';
import {MatIcon} from '@angular/material/icon';
import {DialogHelper} from '../../../core/utils/other/dialog-helper';
import {InvoiceFilters} from '../invoice-filters/invoice-filters';
import {Filters, SearchBarData} from '../../../core/Interfaces/SearchInterfaces';

@Component({
  selector: 'app-invoice-searcher',
  imports: [
    FilterButton,
    FormsModule,
    SearchBar,
    MatIcon
  ],
  templateUrl: './invoice-searcher.html',
  styleUrl: './invoice-searcher.scss',
})
export class InvoiceSearcher {
  private dialog = inject(DialogHelper);
  filters = signal<Filters | null>(null);
  searchTerm = signal<string>('');
  searchQuery = computed<SearchBarData>(()=>({
    filters: this.filters()!,
    query : this.searchTerm(),
  }));
  finalQuery = output<SearchBarData>();

  protected handleFilter() {
    const ref = this.dialog.openDialog(InvoiceFilters,this.dialog.getConfig());
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
