import {Component, input, output, signal} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {CdkConnectedOverlay, CdkOverlayOrigin, ConnectedPosition} from '@angular/cdk/overlay';

export interface CustomMenuOption {
  icon?:string;
  label: string;
  value: string;
}
@Component({
  selector: 'app-custom-menu',
  imports: [
    MatIcon,
    CdkConnectedOverlay,
    CdkOverlayOrigin
  ],
  templateUrl: './custom-menu.html',
  styleUrl: './custom-menu.scss',
})
export class CustomMenu {
  options = input<CustomMenuOption[]>([]);
  isOpen= signal(false)
  selectedOption = output<string>()
  menuPositions: ConnectedPosition[] = [
    {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
      offsetX: 8,
      offsetY: 0
    },
    {
      originX: 'end',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom',
      offsetX: 8,
      offsetY: 0
    }
  ];


  closeMenu(): void {
    this.isOpen.set(false);
  }

  selectOption(option: string): void {
    this.selectedOption.emit(option);
    this.closeMenu();
  }
}
