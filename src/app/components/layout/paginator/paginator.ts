import {Component, input, output} from '@angular/core';
import {PaginationInfo} from '../../../core/Interfaces/SearchInterfaces';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-paginator',
  imports: [
    MatIcon
  ],
  templateUrl: './paginator.html',
  styleUrl: './paginator.scss',
})
export class Paginator {
  pageChange = output<number>();
  query = input.required<PaginationInfo>()
  onPrev(): void {
     if(this.query().page-1 < 0) return;
    this.pageChange.emit(this.query().page - 1)
  }

  onNext(): void {
    this.pageChange.emit(this.query().page + 1);
  }
}
