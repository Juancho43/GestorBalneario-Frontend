import {Component, computed, inject, signal} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';
import {FilterOption, Filters} from '../../../core/Interfaces/SearchInterfaces';

@Component({
  selector: 'app-shadow-filter',
  imports: [
    MatIcon
  ],
  templateUrl: './shadow-filter.html',
  styleUrl: './shadow-filter.scss',
})
export class ShadowFilter {
  private dialogRef = inject(MatDialogRef<ShadowFilter>);
  protected typeOptions: FilterOption[] = [
    { label: 'Carpa', value: 'carpa' },
    { label: 'Sombrilla', value: 'sombrilla' },
    { label: 'Todas', value: 'All' }
  ];
  protected stateOptions: FilterOption[] = [
    { label: 'Disponible', value: 'AvailableState'},
    { label: 'Ocupada', value: 'OccupiedState' },
    { label: 'Todas', value: 'All' }
  ];
  protected directionOptions: FilterOption[] = [
    { label: 'Ascendente', value: 'asc' },
    { label: 'Descendente', value: 'desc' }
  ];
  protected type = signal<string>('All');
  protected state = signal<string>('All');
  protected orderDirection = signal<'asc' | 'desc'>('asc');
  protected appliedFilters = computed<Filters>(() => ({
    state: this.state(),
    orderDirection: this.orderDirection(),
    type: this.type(),
  }));
  protected close (){
    this.dialogRef.close(this.appliedFilters());
  };

  protected clearFilters(): void {
    this.state.set('All');
    this.orderDirection.set('asc');
    this.type.set('All')
  }

  protected applyFilters(): void {
    this.close();
  }
}
