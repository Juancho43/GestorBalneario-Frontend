import {Component, output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {SearchBar} from '../../layout/search-bar/search-bar';

@Component({
  selector: 'app-client-searcher',
  imports: [
    MatIcon,
    FormsModule,
    SearchBar
  ],
  templateUrl: './client-searcher.html',
  styleUrl: './client-searcher.scss',
})
export class ClientSearcher {
  requestSearch = output<any>();
  protected searchTerm: string = '';

  protected submitHandler() {
    this.requestSearch.emit({query:this.searchTerm, limit:10,page:0});
  }
}
