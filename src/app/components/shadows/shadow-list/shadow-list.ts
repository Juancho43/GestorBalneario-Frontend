import {Component,output} from '@angular/core';
import {CdkDrag, CdkDragEnd, CdkDropList} from '@angular/cdk/drag-drop';
import {ShadowEntity} from '../../../core/model/shadowEntity';

@Component({
  selector: 'app-shadow-list',
  imports: [
    CdkDropList,
    CdkDrag
  ],
  templateUrl: './shadow-list.html',
  styleUrl: './shadow-list.scss',
})
export class ShadowList {
  onDropped = output<{event: CdkDragEnd, shadow: ShadowEntity}>();
  paleta: ShadowEntity[] = [
    {identifier:'...',name: 'Carpa Estándar', coords: {x: 0, y: 0}, type: 'rect'},
    {identifier:'...',name: 'Sombrilla VIP', coords: {x: 0, y: 0}, type : 'circle'},
  ];

  dropped(event: CdkDragEnd, shadow: ShadowEntity) {
    this.onDropped.emit({event, shadow});
  }
}
