import {Component, computed, inject, output, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {SearchBar} from '../../layout/search-bar/search-bar';
import {ClientFilter} from '../client-filter/client-filter';
import {DialogHelper} from '../../../core/utils/other/dialog-helper';
import {FilterButton} from '../../layout/filter-button/filter-button';
import {Filters, SearchBarData} from '../../../core/Interfaces/SearchInterfaces';

@Component({
  selector: 'app-client-searcher',
  imports: [
    MatIcon,
    FormsModule,
    SearchBar,
    FilterButton
  ],
  templateUrl: './client-searcher.html',
  styleUrl: './client-searcher.scss',
})
export class ClientSearcher {
  private dialog = inject(DialogHelper);
  protected filters = signal<Filters | null>(null);
  protected searchTerm = signal<string>('');
  protected searchQuery = computed<SearchBarData>(()=>({
    filters: this.filters()!,
    query : this.searchTerm(),
  }));
  finalQuery = output<SearchBarData>();
  protected handleFilter() {
    const ref = this.dialog.openDialog(ClientFilter,this.dialog.getConfig());
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
