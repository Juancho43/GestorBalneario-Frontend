import {Component, output} from '@angular/core';
import {CdkDrag, CdkDragEnd, CdkDropList} from '@angular/cdk/drag-drop';
import {ShadowEntity} from '../../../core/model/shadowEntity';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-shadow-list',
  imports: [
    CdkDropList,
    CdkDrag,
    MatIcon
  ],
  templateUrl: './shadow-type-list.component.html',
  styleUrl: './shadow-type-list.component.scss',
})
export class ShadowTypeList {
  protected shadowTypes: ShadowEntity[] = [
    {identifier:'...',name: 'Carpa', state:'available', coords: {x: 0, y: 0}, type: 'carpa'},
    {identifier:'...',name: 'Sombrilla', state:"available", coords: {x: 0, y: 0}, type : 'sombrilla'},
  ];
  onDropped = output<{event: CdkDragEnd, shadow: ShadowEntity}>();
  protected dropped(event: CdkDragEnd, shadow: ShadowEntity) {
    this.onDropped.emit({event, shadow});
  }
}
