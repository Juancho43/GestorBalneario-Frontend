import {Component, input, output, signal} from '@angular/core';

@Component({
  selector: 'app-paginator',
  imports: [],
  templateUrl: './paginator.html',
  styleUrl: './paginator.scss',
})
export class Paginator {
 pageChange = output<number>();

  totalPages = signal<number>(1);
  onPrev(): void {
    this.pageChange.emit(-1)
  }

  onNext(): void {
    this.pageChange.emit(1)
  }
}
