import {Component, computed, inject, signal} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';
import {FilterOption, Filters} from '../../../core/Interfaces/SearchInterfaces';

@Component({
  selector: 'app-invoice-filters',
  imports: [
    MatIcon
  ],
  templateUrl: './invoice-filters.html',
  styleUrl: './invoice-filters.scss',
})
export class InvoiceFilters {
  private dialogRef = inject(MatDialogRef<InvoiceFilters>);

  protected stateOptions: FilterOption[] = [
    { label: 'Creadas', value: 'IssuedState' },
    { label: 'Pagadas', value: 'PaidState' },
    { label: 'Todas', value: 'All' }
  ];
  protected orderOptions: FilterOption[] = [
    {label: 'Cliente', value: 'name'},
    {label: 'Estado', value: 'state' },
    {label: 'Fecha de creación', value: 'i.created_at'}
  ]
  protected directionOptions: FilterOption[] = [
    { label: 'Ascendente', value: 'asc' },
    { label: 'Descendente', value: 'desc' }
  ];
  protected orderBy = signal<string>('i.created_at');
  protected state = signal<string>('All');
  protected orderDirection = signal<'asc' | 'desc'>('asc');
  protected appliedFilters = computed<Filters>(() => ({
    state: this.state(),
    orderDirection: this.orderDirection(),
    orderBy : this.orderBy()
  }));

  protected close (){
    this.dialogRef.close(this.appliedFilters());
  };

  protected clearFilters(): void {
    this.state.set('All');
    this.orderDirection.set('asc');
    this.orderBy.set('i.created_at');
  }

  protected applyFilters(): void {
    this.close();
  }
}
