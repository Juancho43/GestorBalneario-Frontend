import {Component, computed, inject, signal} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatDialogRef} from '@angular/material/dialog';
import {FilterOption, Filters} from '../../../core/Interfaces/SearchInterfaces';

@Component({
  selector: 'app-season-filter',
  imports: [
    MatIcon
  ],
  templateUrl: './season-filter.html',
  styleUrl: './season-filter.scss',
})
export class SeasonFilter {
  private dialogRef = inject(MatDialogRef<SeasonFilter>);

  protected orderOptions: FilterOption[] = [
    {label: 'Nombre', value: 'name'},
    {label: 'Fecha de creación', value: 'created_at'}
  ]
  protected directionOptions: FilterOption[] = [
    { label: 'Ascendente', value: 'asc' },
    { label: 'Descendente', value: 'desc' }
  ];
  protected orderBy = signal<string>('created_at');
  protected orderDirection = signal<'asc' | 'desc'>('asc');

  protected appliedFilters = computed<Filters>(() => ({
    orderDirection: this.orderDirection(),
    orderBy: this.orderBy(),
  }));

  protected close (){
    this.dialogRef.close(this.appliedFilters());
  };

  protected clearFilters(): void {
    this.orderDirection.set('asc');
    this.orderBy.set('created_at');
  }

  protected applyFilters(): void {
    this.close();
  }
}
