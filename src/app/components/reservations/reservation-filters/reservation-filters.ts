import {Component, computed, inject, output, signal} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatCheckbox} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';
import {OverlayHelper} from '../../../core/utils/overlay-helper';
import {Overlay} from '@angular/cdk/overlay';
import {MatDialogRef} from '@angular/material/dialog';
interface FilterOption {
  label: string;
  value: string;
}
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
  protected dateOptions: FilterOption[] = [
    { label: 'Hoy', value: 'today' },
    { label: 'Semana', value: 'week' },
    { label: 'Quincena', value: 'fortnight' },
    { label: 'Mes', value: 'month' },
    { label: 'Todas', value: 'All' }
  ];
  protected stateOptions: FilterOption[] = [
    { label: 'Creadas', value: 'Created' },
    { label: 'Activas', value: 'Active' },
    { label: 'Completadas', value: 'Completed' },
    { label: 'Canceladas', value: 'Cancelled' },
    { label: 'Todas', value: 'All' }
  ];

  protected directionOptions: FilterOption[] = [
    { label: 'Ascendente', value: 'asc' },
    { label: 'Descendente', value: 'desc' }
  ];

  protected state = signal<string>('All');
  protected orderDirection = signal<'asc' | 'desc'>('asc');
  protected dateRange = signal('All');
  protected appliedFilters = computed(() => ({
    state: this.state(),
    orderDirection: this.orderDirection(),
    dateRange: this.dateRange(),
  }));

  protected close (){
    this.dialogRef.close(this.appliedFilters());
  };

  protected clearFilters(): void {
    this.state.set('All');
    this.orderDirection.set('asc');
    this.dateRange.set('All')
  }

  protected applyFilters(): void {
    this.close();
  }
}
