import {Component, input, output, signal} from '@angular/core';
import {PaginationInfo} from '../../../core/Interfaces/SearchInterfaces';

@Component({
  selector: 'app-paginator',
  imports: [],
  templateUrl: './paginator.html',
  styleUrl: './paginator.scss',
})
export class Paginator {
  pageChange = output<number>();
  query = input.required<PaginationInfo>()
  totalPages = signal<number>(1);
  onPrev(): void {
     if(this.query().page-1 < 0) return;
    this.pageChange.emit(this.query().page - 1)
  }

  onNext(): void {
    this.pageChange.emit(this.query().page + 1);
  }
}
