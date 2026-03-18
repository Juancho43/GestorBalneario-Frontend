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
    {identifier:'...',name: 'Carpa Estándar', state:'available', coords: {x: 0, y: 0}, type: 'carpa'},
    {identifier:'...',name: 'Sombrilla VIP',state:"available", coords: {x: 0, y: 0}, type : 'sombrilla'},
  ];

  dropped(event: CdkDragEnd, shadow: ShadowEntity) {
    this.onDropped.emit({event, shadow});
  }
}
