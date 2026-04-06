import {Component, output} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-client-searcher',
  imports: [
    FormsModule
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
