import {Component, computed, inject, output, signal} from '@angular/core';
import {SearchBar} from '../../layout/search-bar/search-bar';
import {FilterButton} from '../../layout/filter-button/filter-button';
import {MatIcon} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {ShadowFilter} from '../shadow-filter/shadow-filter';
import {DialogHelper} from '../../../core/utils/other/dialog-helper';
import {Filters, SearchBarData} from '../../../core/Interfaces/SearchInterfaces';

@Component({
  selector: 'app-shadow-searcher',
  imports: [
    SearchBar,
    FilterButton,
    MatIcon,
    FormsModule,
  ],
  templateUrl: './shadow-searcher.html',
  styleUrl: './shadow-searcher.scss',
})
export class ShadowSearcher {
  private dialog = inject(DialogHelper);
  filters = signal<Filters | null>(null);
  searchTerm = signal<string>('');
  searchQuery = computed<SearchBarData>(()=>({
    filters: this.filters()!,
    query : this.searchTerm(),
  }));
  finalQuery = output<SearchBarData>();
  protected handleFilter() {
    const ref = this.dialog.openDialog(ShadowFilter,this.dialog.getConfig());
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
