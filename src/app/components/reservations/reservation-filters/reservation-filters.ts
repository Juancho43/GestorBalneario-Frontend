import {Component, computed, inject, signal} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {FilterOption, Filters} from '../../../core/Interfaces/SearchInterfaces';

@Component({
  selector: 'app-reservation-filters',
  imports: [
    MatIcon,
    FormsModule
  ],
  templateUrl: './reservation-filters.html',
  styleUrl: './reservation-filters.scss',
})
export class ReservationFilters {
  private dialogRef = inject(MatDialogRef<ReservationFilters>);
  protected stateOptions: FilterOption[] = [
    { label: 'Creadas', value: 'CreatedState' },
    { label: 'Activas', value: 'ActiveState' },
    { label: 'Completadas', value: 'CompletedState' },
    { label: 'Canceladas', value: 'CancelledState' },
    { label: 'Todas', value: 'All' }
  ];

  protected directionOptions: FilterOption[] = [
    { label: 'Ascendente', value: 'asc' },
    { label: 'Descendente', value: 'desc' }
  ];

  protected state = signal<string>('All');
  protected orderDirection = signal<'asc' | 'desc'>('asc');
  protected appliedFilters = computed<Filters>(() => ({
    state: this.state(),
    orderDirection: this.orderDirection(),
  }));

  protected close (){
    this.dialogRef.close(this.appliedFilters());
  };

  protected clearFilters(): void {
    this.state.set('All');
    this.orderDirection.set('asc');
  }

  protected applyFilters(): void {
    this.close();
  }
}
