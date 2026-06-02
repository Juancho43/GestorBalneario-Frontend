import {Component, computed, inject, signal} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';
import {FilterOption, Filters} from '../../../core/Interfaces/SearchInterfaces';

@Component({
  selector: 'app-client-filter',
  imports: [
    MatIcon
  ],
  templateUrl: './client-filter.html',
  styleUrl: './client-filter.scss',
})
export class ClientFilter {
  private dialogRef = inject(MatDialogRef<ClientFilter>);

  protected orderOptions: FilterOption[] = [
    {label: 'Nombre', value: 'name'},
    {label: 'Email', value: 'email' },
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
