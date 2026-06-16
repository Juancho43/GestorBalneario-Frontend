import {Component, computed, inject, signal} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatDialogRef} from '@angular/material/dialog';
import {FilterOption, Filters} from '../../../core/Interfaces/SearchInterfaces';

@Component({
  selector: 'app-service-filters',
    imports: [
        MatIcon
    ],
  templateUrl: './service-filters.html',
  styleUrl: './service-filters.scss',
})
export class ServiceFilters {
  private dialogRef = inject(MatDialogRef<ServiceFilters>);
  protected typeOptions : FilterOption[] = [
    {label: 'Reserva', value:'Reservation'},
    {label: 'Descuento', value:'Discount'},
    {label: 'Recargo', value:'Recharge'},
    {label: 'Todos', value: 'All'},
  ]
  protected orderOptions: FilterOption[] = [
    {label: 'Nombre', value: 'description'},
    {label: 'Costo', value: 'price' },
    {label: 'Fecha de creación', value: 'created_at'}
  ]
  protected directionOptions: FilterOption[] = [
    { label: 'Ascendente', value: 'asc' },
    { label: 'Descendente', value: 'desc' }
  ];
  protected orderBy = signal<string>('created_at');
  protected orderDirection = signal<'asc' | 'desc'>('asc');
  protected type = signal<string>('All');
  protected appliedFilters = computed<Filters>(() => ({
    orderDirection: this.orderDirection(),
    orderBy: this.orderBy(),
    type: this.type(),
  }));

  protected close (){
    this.dialogRef.close(this.appliedFilters());
  };

  protected clearFilters(): void {
    this.orderDirection.set('asc');
    this.orderBy.set('created_at');
    this.type.set('All');
  }

  protected applyFilters(): void {
    this.close();
  }
}
